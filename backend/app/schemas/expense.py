from uuid import UUID
from datetime import datetime, date
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel

class SplitItem(BaseModel):
    user_id: UUID
    amount_owed: Decimal

class ExpenseCreate(BaseModel):
    title: str
    amount: Decimal
    category: Optional[str] = "lainnya"
    paid_by: Optional[UUID] = None
    split_type: str = "equal"
    notes: Optional[str] = None
    date: Optional[date] = None
    splits: Optional[List[SplitItem]] = None

class ExpenseSplitResponse(BaseModel):
    id: UUID
    user_id: UUID
    amount_owed: Decimal
    is_settled: bool
    settled_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ExpenseResponse(BaseModel):
    id: UUID
    group_id: UUID
    paid_by: UUID
    title: str
    amount: Decimal
    category: Optional[str] = None
    split_type: str
    notes: Optional[str] = None
    date: date
    created_at: datetime
    splits: List[ExpenseSplitResponse] = []

    class Config:
        from_attributes = True
