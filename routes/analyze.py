import inspect
from fastapi import APIRouter, HTTPException, Depends, Request, status
from fastapi.security import HTTPAuthorizationCredentials
from typing import Optional

from config.settings import settings
from dependencies import get_current_user, security, _check_ai_rate_limit
from models.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    CareerPath,
    RoadmapStep,
    Course,
    Certification,
    User,
)
from services.ai_service import AIService

router = APIRouter(tags=["analyze"])

# Tests expect `ai_service` to be importable and patchable.
ai_service = AIService()


async def _resolve_optional_user(credentials: Optional[HTTPAuthorizationCredentials]):
    result = get_current_user(credentials)
    if inspect.isawaitable(result):
        return await result
    return result


async def _analyze_access_dependency(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> Optional[User]:
    current_user = await _resolve_optional_user(credentials)

    if settings.REQUIRE_AUTH_FOR_AI and current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication is required for AI-powered endpoints.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    client_host = request.client.host if request.client else "unknown"
    client_key = current_user.email if current_user else client_host
    _check_ai_rate_limit(client_key)
    return current_user


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_career_paths(
    request: AnalyzeRequest,
    current_user: Optional[User] = Depends(_analyze_access_dependency),
):
    """
    Analyze skills and expertise to generate career paths, roadmap, and courses.
    Protected by authentication and rate limiting for AI cost control.
    """
    try:
        # Use skills and expertise from request or user profile
        skills = request.skills or (current_user.skills if current_user else "")
        expertise = request.expertise or (current_user.expertise if current_user else "")

        if not skills or not expertise:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Skills and expertise are required. Please provide them in the request "
                    "or update your profile."
                ),
            )

        # Generate analysis using AI service
        analysis = ai_service.generate_career_analysis(skills, expertise)

        # Convert to Pydantic models
        career_paths = [CareerPath(**path) for path in analysis["career_paths"]]
        selected_path = CareerPath(**analysis["selected_path"])
        roadmap = [RoadmapStep(**step) for step in analysis["roadmap"]]
        courses = [Course(**course) for course in analysis["courses"]]
        certifications = [
            Certification(**cert)
            for cert in analysis.get("certifications", [])
        ]

        # Ensure all certifications have proper URLs
        for cert in certifications:
            if not cert.url:
                cert.url = (
                    "https://www.google.com/search?q="
                    f"{cert.name.replace(' ', '+')}+certification+"
                    f"{cert.provider.replace(' ', '+')}"
                )

        return AnalyzeResponse(
            career_paths=career_paths,
            selected_path=selected_path,
            roadmap=roadmap,
            courses=courses,
            certifications=certifications,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error analyzing career paths: {str(e)}"
        )
