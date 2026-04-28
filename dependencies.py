from collections import defaultdict, deque
from time import monotonic
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.schemas import User
from services.auth_service import auth_service
from services.mock_user_service import user_service
from typing import Optional
from config.settings import settings

security = HTTPBearer(auto_error=False)
_ai_request_log = defaultdict(deque)

async def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[User]:
    """Get current authenticated user (optional)"""
    if not credentials:
        return None
    
    token_data = auth_service.verify_token(credentials.credentials)
    if token_data is None:
        return None
    
    user = await user_service.get_user_by_email(token_data.email)
    if user is None:
        return None
    
    return User(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        skills=user.get("skills", ""),
        expertise=user.get("expertise", ""),
        created_at=user["created_at"],
        updated_at=user["updated_at"]
    )

async def get_current_user_required(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Get current authenticated user (required)"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if not credentials:
        raise credentials_exception
    
    token_data = auth_service.verify_token(credentials.credentials)
    if token_data is None:
        raise credentials_exception
    
    user = await user_service.get_user_by_email(token_data.email)
    if user is None:
        raise credentials_exception
    
    return User(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        skills=user.get("skills", ""),
        expertise=user.get("expertise", ""),
        created_at=user["created_at"],
        updated_at=user["updated_at"]
    )

def _check_ai_rate_limit(client_key: str) -> None:
    """Small in-process limiter for AI-backed endpoints."""
    now = monotonic()
    window_start = now - 60
    request_times = _ai_request_log[client_key]

    while request_times and request_times[0] < window_start:
        request_times.popleft()

    if len(request_times) >= settings.AI_RATE_LIMIT_PER_MINUTE:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many AI requests. Please wait a minute and try again.",
        )

    request_times.append(now)

async def enforce_ai_access(
    request: Request,
    current_user: Optional[User] = Depends(get_current_user),
) -> Optional[User]:
    """Require auth when configured and rate-limit expensive AI endpoints."""
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
