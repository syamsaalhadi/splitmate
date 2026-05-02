from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.group import GroupCreate, AddMemberRequest, GroupInviteAction
from app.services.groups import (
    create_group, get_user_groups, get_group_detail, delete_group, 
    add_member, remove_member, get_group_invitations, respond_group_invitation,
    close_group
)

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.patch("/{group_id}/close")
def close(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return close_group(db, group_id, current_user.id)

@router.post("", status_code=status.HTTP_201_CREATED)
def create(payload: GroupCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_group(db, payload, current_user.id)

@router.get("")
def list_groups(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_user_groups(db, current_user.id)

@router.get("/invitations")
def list_invitations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_group_invitations(db, current_user.id)

@router.patch("/invitations/{group_id}")
def respond_invitation(group_id: UUID, payload: GroupInviteAction, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return respond_group_invitation(db, current_user.id, group_id, payload.action)

@router.get("/{group_id}")
def detail(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_group_detail(db, group_id, current_user.id)

@router.delete("/{group_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(group_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    delete_group(db, group_id, current_user.id)

@router.post("/{group_id}/members", status_code=status.HTTP_201_CREATED)
def add(group_id: UUID, payload: AddMemberRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return add_member(db, group_id, payload.email, current_user.id)

@router.delete("/{group_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove(group_id: UUID, user_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    remove_member(db, group_id, user_id, current_user.id)
