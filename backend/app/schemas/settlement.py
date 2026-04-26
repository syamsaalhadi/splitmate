from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel

class SettlementCreate(BaseModel):
    to_user_id: UUID
    amount: Decimal
    group_id: UUID
    notes: Optional[str] = None

class SettlementResponse(BaseModel):
    id: UUID
    group_id: UUID
    from_user: UUID
    to_user: UUID
    amount: Decimal
    notes: Optional[str] = None
    settled_at: datetime

    class Config:
        from_attributes = True
