from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserResponse, UserUpdate
from app.models.user import User
from app.dependencies import get_current_user, get_db
from app.services.activities import get_my_activities

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserResponse)
def update_me(payload: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    current_user.name = payload.name
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/me/activities")
def my_activities(db=Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_my_activities(db, current_user.id)
