from pydantic import BaseModel, EmailStr
from typing import Any, List, Optional
from datetime import datetime

class AnalyzeRequest(BaseModel):
    """Request model for career analysis"""
    skills: Optional[str] = None
    expertise: Optional[str] = None

class Certification(BaseModel):
    """Certification recommendation"""
    name: str
    provider: str
    description: str
    difficulty: str
    duration: str
    url: str

class CareerPath(BaseModel):
    """Career path information"""
    title: str
    description: str
    required_skills: List[str]
    salary_range: str
    growth_prospect: str
    market_demand: Optional[str] = None

class Course(BaseModel):
    """Course recommendation"""
    title: str
    provider: str
    duration: str
    difficulty: Optional[str] = None
    url: Optional[str] = None
    level: Optional[str] = None
    type: Optional[str] = None

class RoadmapStep(BaseModel):
    """Roadmap step information"""
    step: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    phase: Optional[str] = None
    duration: str
    topics: Optional[List[str]] = None
    resources: List[str]

class AnalyzeResponse(BaseModel):
    """Complete analysis response"""
    career_paths: List[CareerPath]
    selected_path: CareerPath
    roadmap: List[RoadmapStep]
    courses: List[Course]
    certifications: List[Certification]

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    service: str
    timestamp: Optional[datetime] = None

class RootResponse(BaseModel):
    """Root endpoint response"""
    message: str

class MockTestRequest(BaseModel):
    """Request model for mock test generation"""
    skills: Optional[str] = None
    expertise: Optional[str] = None
    topic: Optional[str] = None
    role: Optional[str] = None
    difficulty: Optional[str] = None
    question_count: Optional[int] = 5

class MockTestQuestion(BaseModel):
    """Mock test question model"""
    question: str
    answer: Optional[str] = None
    options: Optional[List[str]] = None
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    difficulty: Optional[str] = None

class MockTestResponse(BaseModel):
    """Mock test response model"""
    test_id: str
    questions: List[MockTestQuestion]
    user_id: Optional[str] = None
    created_at: str

# User Authentication Models
class UserCreate(BaseModel):
    """User creation request"""
    email: EmailStr
    password: str
    full_name: str
    skills: Optional[str] = None
    expertise: Optional[str] = None

class UserLogin(BaseModel):
    """User login request"""
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    """User update request"""
    full_name: Optional[str] = None
    skills: Optional[str] = None
    expertise: Optional[str] = None

class User(BaseModel):
    """User response model"""
    id: str
    email: str
    full_name: str
    skills: Optional[str] = None
    expertise: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class Token(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str
    user: User

class TokenData(BaseModel):
    """Token data for validation"""
    email: Optional[str] = None

class ChatMessage(BaseModel):
    """Chat message model"""
    message: str
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    """Chat response model"""
    bot_message: str
    response: Optional[str] = None
    extracted_skills: List[Any]
    updated_skills: str
    user: Optional[User] = None

class UpdateSkillsRequest(BaseModel):
    """Update skills request model"""
    user_id: str
    message: str

class SkillExtraction(BaseModel):
    """Individual skill extraction model"""
    skill: str
    expertise_level: str

class UpdateSkillsResponse(BaseModel):
    """Update skills response model"""
    extracted_skills: List[SkillExtraction]
    updated_skills_list: List[str]
    user: Optional[User] = None
