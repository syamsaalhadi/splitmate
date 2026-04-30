from uuid import UUID
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.expense import ExpenseCreate
from app.services.expenses import create_expense, get_group_expenses, delete_expense

router = APIRouter(tags=["Expenses"])

@router.post("/groups/{group_id}/expenses", status_code=status.HTTP_201_CREATED)
def create(group_id: UUID, payload: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_expense(db, group_id, payload, current_user.id)

@router.get("/groups/{group_id}/expenses")
def list_expenses(
    group_id: UUID,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_group_expenses(db, group_id, current_user.id, limit=limit, offset=offset)

@router.delete("/expenses/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(expense_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    delete_expense(db, expense_id, current_user.id)
