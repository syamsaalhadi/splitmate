from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.services.debts import get_group_debts, get_my_debts

router = APIRouter(tags=["Debts"])

@router.get("/groups/{group_id}/debts")
def group_debts(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_group_debts(db, group_id, current_user.id)

@router.get("/users/me/debts")
def my_debts(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_my_debts(db, current_user.id)
