from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException, status
from app.models.group import Group, GroupMember
from app.models.user import User
from app.models.expense import Expense, ExpenseSplit
from app.schemas.group import GroupCreate, CATEGORY_ICONS

def create_group(db: Session, payload: GroupCreate, user_id: UUID) -> Group:
    group = Group(
        name=payload.name,
        description=payload.description,
        category=payload.category,
        created_by=user_id
    )
    db.add(group)
    db.flush()

    member = GroupMember(group_id=group.id, user_id=user_id, role="admin")
    db.add(member)
    db.commit()
    db.refresh(group)
    return group

def get_user_groups(db: Session, user_id: UUID) -> list:
    memberships = db.query(GroupMember).filter(GroupMember.user_id == user_id).all()
    result = []
    for m in memberships:
        group = m.group
        result.append(_build_group_response(db, group))
    return result

def get_group_detail(db: Session, group_id: UUID, user_id: UUID) -> dict:
    _assert_member(db, group_id, user_id)
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Grup tidak ditemukan")
    return _build_group_response(db, group, include_members=True)

def delete_group(db: Session, group_id: UUID, user_id: UUID):
    _assert_admin(db, group_id, user_id)
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Grup tidak ditemukan")
    db.delete(group)
    db.commit()

def _build_group_response(db: Session, group: Group, include_members: bool = False) -> dict:
    member_count = db.query(func.count(GroupMember.id)).filter(GroupMember.group_id == group.id).scalar()

    total = db.query(func.coalesce(func.sum(Expense.amount), 0)).filter(Expense.group_id == group.id).scalar()

    unsettled = db.query(func.count(ExpenseSplit.id)).join(
        Expense, ExpenseSplit.expense_id == Expense.id
    ).filter(
        Expense.group_id == group.id,
        ExpenseSplit.is_settled == False
    ).scalar()

    data = {
        "id": group.id,
        "name": group.name,
        "description": group.description,
        "category": group.category,
        "icon": CATEGORY_ICONS.get(group.category, "category"),
        "created_by": group.created_by,
        "created_at": group.created_at,
        "member_count": member_count,
        "total_spending": float(total),
        "status": "Belum Lunas" if unsettled > 0 else "Lunas"
    }

    if include_members:
        data["members"] = [
            {
                "id": m.id,
                "user_id": m.user_id,
                "role": m.role,
                "joined_at": m.joined_at,
                "user": {
                    "id": m.user.id,
                    "name": m.user.name,
                    "email": m.user.email,
                    "avatar_url": m.user.avatar_url,
                    "created_at": m.user.created_at
                }
            }
            for m in db.query(GroupMember).filter(GroupMember.group_id == group.id).all()
        ]

    return data

def add_member(db: Session, group_id: UUID, email: str, requester_id: UUID) -> dict:
    _assert_member(db, group_id, requester_id)

    target_user = db.query(User).filter(User.email == email).first()
    if not target_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User dengan email tersebut tidak ditemukan")

    already = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == target_user.id
    ).first()
    if already:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User sudah menjadi anggota grup ini")

    member = GroupMember(group_id=group_id, user_id=target_user.id, role="member")
    db.add(member)
    db.commit()
    db.refresh(member)

    return {
        "id": member.id,
        "user_id": member.user_id,
        "role": member.role,
        "joined_at": member.joined_at,
        "user": {
            "id": target_user.id,
            "name": target_user.name,
            "email": target_user.email,
            "avatar_url": target_user.avatar_url,
            "created_at": target_user.created_at
        }
    }


def remove_member(db: Session, group_id: UUID, target_user_id: UUID, requester_id: UUID):
    _assert_admin(db, group_id, requester_id)

    if target_user_id == requester_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admin tidak bisa mengeluarkan diri sendiri")

    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == target_user_id
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User bukan anggota grup ini")

    db.delete(member)
    db.commit()


def _assert_member(db: Session, group_id: UUID, user_id: UUID):
    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == user_id
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Kamu bukan anggota grup ini")

def _assert_admin(db: Session, group_id: UUID, user_id: UUID):
    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == user_id,
        GroupMember.role == "admin"
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Hanya admin yang bisa melakukan aksi ini")
