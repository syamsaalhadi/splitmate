from uuid import UUID
from datetime import datetime
from typing import Any, Dict
from pydantic import BaseModel

class ClassifyRequest(BaseModel):
    description: str

class PredictRequest(BaseModel):
    user_id: UUID

class AIPredictionResponse(BaseModel):
    id: UUID
    user_id: UUID
    type: str
    input_data: Dict[str, Any]
    result: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True
