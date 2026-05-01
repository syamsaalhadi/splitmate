from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class AddFriendRequest(BaseModel):
    email: str

class FriendResponse(BaseModel):
    id: UUID
    name: str
    email: str
    avatar_url: str | None = None
    friendship_created_at: datetime
    status: str

    class Config:
        from_attributes = True

class FriendRequestAction(BaseModel):
    action: str # "accept" or "reject"
