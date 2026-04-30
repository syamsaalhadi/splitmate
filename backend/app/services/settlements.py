from uuid import UUID
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.group import GroupMember
from app.models.expense import Expense, ExpenseSplit
from app.models.settlement import Settlement
from app.models.user import User
from app.schemas.settlement import SettlementCreate


def create_settlement(db: Session, payload: SettlementCreate, current_user_id: UUID) -> dict:
    _assert_member(db, payload.group_id, current_user_id)

    to_user = db.query(User).filter(User.id == payload.to_user_id).first()
    if not to_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User tujuan tidak ditemukan")

    # Validasi to_user harus anggota grup yang sama
    _assert_member(db, payload.group_id, payload.to_user_id)

    # Tandai expense_splits yang relevan sebagai settled
    # Cari splits: current_user berutang ke to_user di grup ini
    splits = (
        db.query(ExpenseSplit)
        .join(Expense, Expense.id == ExpenseSplit.expense_id)
        .filter(
            Expense.group_id == payload.group_id,
            Expense.paid_by == payload.to_user_id,
            ExpenseSplit.user_id == current_user_id,
            ExpenseSplit.is_settled == False,
        )
        .order_by(ExpenseSplit.amount_owed.asc())
        .all()
    )

    remaining = float(payload.amount)
    now = datetime.now(timezone.utc)
    for split in splits:
        if remaining <= 0:
            break
        if float(split.amount_owed) <= remaining:
            split.is_settled = True
            split.settled_at = now
            remaining -= float(split.amount_owed)
        else:
            # Partial settlement — tandai saja, jangan pecah split
            split.is_settled = True
            split.settled_at = now
            remaining = 0

    # Catat ke tabel settlements
    settlement = Settlement(
        group_id=payload.group_id,
        from_user=current_user_id,
        to_user=payload.to_user_id,
        amount=payload.amount,
        notes=payload.notes,
    )
    db.add(settlement)
    db.commit()
    db.refresh(settlement)

    from_user = db.query(User).filter(User.id == current_user_id).first()
    return _format_settlement(settlement, from_user, to_user)


def get_group_settlements(db: Session, group_id: UUID, current_user_id: UUID) -> list:
    _assert_member(db, group_id, current_user_id)

    settlements = (
        db.query(Settlement)
        .filter(Settlement.group_id == group_id)
        .order_by(Settlement.settled_at.desc())
        .all()
    )

    # Kumpulkan semua user_id lalu fetch sekaligus
    user_ids = set()
    for s in settlements:
        user_ids.add(s.from_user)
        user_ids.add(s.to_user)
    users = db.query(User).filter(User.id.in_(user_ids)).all()
    user_map = {u.id: u for u in users}

    return [
        _format_settlement(s, user_map.get(s.from_user), user_map.get(s.to_user))
        for s in settlements
    ]


def _format_settlement(s: Settlement, from_user: User, to_user: User) -> dict:
    return {
        "id": s.id,
        "group_id": s.group_id,
        "from_user_id": s.from_user,
        "from_user_name": from_user.name if from_user else "Unknown",
        "from_user_avatar": from_user.avatar_url if from_user else None,
        "to_user_id": s.to_user,
        "to_user_name": to_user.name if to_user else "Unknown",
        "to_user_avatar": to_user.avatar_url if to_user else None,
        "amount": float(s.amount),
        "notes": s.notes,
        "settled_at": s.settled_at.strftime("%d %b %Y").lstrip("0") if s.settled_at else None,
    }


def _assert_member(db: Session, group_id: UUID, user_id: UUID):
    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == user_id,
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Kamu bukan anggota grup ini")
