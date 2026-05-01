from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.friendship import AddFriendRequest, FriendRequestAction
from app.services.friends import add_friend, get_my_friends, get_friend_requests, respond_friend_request

router = APIRouter(prefix="/friends", tags=["Friends"])

@router.post("", status_code=status.HTTP_201_CREATED)
def add_new_friend(payload: AddFriendRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return add_friend(db, current_user.id, payload.email)

@router.get("")
def list_friends(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_my_friends(db, current_user.id)

@router.get("/requests")
def list_friend_requests(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_friend_requests(db, current_user.id)

@router.patch("/requests/{user_id}")
def respond_request(user_id: UUID, payload: FriendRequestAction, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return respond_friend_request(db, current_user.id, user_id, payload.action)
