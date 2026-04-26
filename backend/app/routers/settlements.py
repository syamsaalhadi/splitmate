from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.settlement import SettlementCreate
from app.services.settlements import create_settlement, get_group_settlements

router = APIRouter(tags=["Settlements"])

@router.post("/settlements", status_code=status.HTTP_201_CREATED)
def settle(payload: SettlementCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_settlement(db, payload, current_user.id)

@router.get("/groups/{group_id}/settlements")
def group_settlements(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_group_settlements(db, group_id, current_user.id)
