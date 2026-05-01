from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.settlement import SettlementCreate, SettlementAction
from app.services.settlements import create_settlement, get_group_settlements, get_pending_settlements, respond_settlement

router = APIRouter(tags=["Settlements"])

@router.post("/settlements", status_code=status.HTTP_201_CREATED)
def settle(payload: SettlementCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_settlement(db, payload, current_user.id)

@router.patch("/settlements/{settlement_id}", status_code=status.HTTP_200_OK)
def respond(settlement_id: UUID, payload: SettlementAction, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return respond_settlement(db, settlement_id, current_user.id, payload.action)

@router.get("/groups/{group_id}/settlements")
def group_settlements(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_group_settlements(db, group_id, current_user.id)

@router.get("/groups/{group_id}/settlements/pending")
def pending_settlements(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_pending_settlements(db, group_id, current_user.id)
