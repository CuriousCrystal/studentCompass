import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer
from models.schemas import MockTestRequest, MockTestResponse, MockTestQuestion, User
from services.ai_service import AIService
from dependencies import get_current_user
from typing import Optional

router = APIRouter(prefix="/mock-test", tags=["mock-test"])
# Move AIService initialization inside the function to ensure proper environment loading
# ai_service = AIService()  # This line will be removed
security = HTTPBearer()


def _normalize_question(question, index: int, difficulty: str) -> MockTestQuestion:
    if hasattr(question, "model_dump"):
        data = question.model_dump()
    elif isinstance(question, dict):
        data = question
    else:
        data = {"question": str(question)}

    answer = data.get("answer") or data.get("explanation") or "Review the core concept and apply it to the scenario."
    options = data.get("options") or [
        answer,
        "A partially related but incomplete answer",
        "A common misconception",
        "None of the above",
    ]

    return MockTestQuestion(
        question=data.get("question") or f"Question {index}",
        answer=answer,
        options=options[:4],
        correct_answer=data.get("correct_answer") or "A",
        explanation=data.get("explanation") or answer,
        difficulty=data.get("difficulty") or difficulty,
    )

@router.post("", response_model=MockTestResponse)
async def generate_mock_test(
    request: MockTestRequest, 
    current_user: Optional[User] = Depends(get_current_user)
):
    """
    Generate a mock test based on skills and expertise using Vertex AI
    and save it to Firestore. Requires authentication.
    """
    # Initialize AIService inside the function to ensure environment variables are loaded
    ai_service = AIService()
    
    try:
        # Use skills and expertise from request or user profile
        skills = request.skills or request.role or (current_user.skills if current_user else "")
        expertise = request.expertise or request.difficulty or (current_user.expertise if current_user else "")
        topic = request.topic or request.role or ""
        
        if not skills or not expertise:
            raise HTTPException(
                status_code=400, 
                detail="Skills and expertise are required. Please provide them in the request or update your profile."
            )
        
        # Generate mock test using Vertex AI
        test_data = ai_service.generate_mock_test(
            skills=skills,
            expertise=expertise,
            topic=topic,
            user_id=current_user.id if current_user else ""
        )
        
        # Convert questions to Pydantic models
        question_count = request.question_count or 5
        questions = [
            _normalize_question(q, index + 1, expertise)
            for index, q in enumerate(test_data.get("questions", []))
        ][:question_count]

        while len(questions) < question_count:
            questions.append(
                _normalize_question(
                    {
                        "question": f"What is an important {skills} concept for a {expertise} learner?",
                        "answer": "A strong answer explains the concept clearly and applies it to a practical scenario.",
                    },
                    len(questions) + 1,
                    expertise,
                )
            )
        
        return MockTestResponse(
            test_id=test_data.get("test_id", str(uuid.uuid4())),
            questions=questions,
            user_id=test_data.get("user_id", current_user.id if current_user else None),
            created_at=test_data.get("created_at", test_data.get("generated_at", datetime.now(timezone.utc).isoformat()))
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating mock test: {str(e)}")
