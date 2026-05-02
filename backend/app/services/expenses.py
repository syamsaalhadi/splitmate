from uuid import UUID
from decimal import Decimal
from datetime import date
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status
from app.models.group import GroupMember
from app.models.expense import Expense, ExpenseSplit
from app.models.user import User
from app.schemas.expense import ExpenseCreate

CATEGORY_ICONS = {
    "makanan": "restaurant",
    "transportasi": "directions_car",
    "akomodasi": "hotel",
    "hiburan": "movie",
    "belanja": "shopping_bag",
    "travel": "flight",
    "tagihan": "receipt",
    "lainnya": "category",
}

def create_expense(db: Session, group_id: UUID, payload: ExpenseCreate, current_user_id: UUID) -> dict:
    _assert_member(db, group_id, current_user_id)

    # Cek apakah grup ditutup
    from app.models.group import Group
    group = db.query(Group).filter(Group.id == group_id).first()
    if group.status == "closed":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Grup sudah ditutup, tidak bisa menambah pengeluaran baru")

    paid_by_id = payload.paid_by if payload.paid_by else current_user_id

    # Validasi paid_by harus anggota grup yang sama
    _assert_member(db, group_id, paid_by_id)

    payer = db.query(User).filter(User.id == paid_by_id).first()
    if not payer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User pembayar tidak ditemukan")

    expense = Expense(
        group_id=group_id,
        paid_by=paid_by_id,
        title=payload.title,
        amount=payload.amount,
        category=payload.category,
        split_type=payload.split_type,
        notes=payload.notes,
        date=payload.date or date.today()
    )
    db.add(expense)
    db.flush()

    members = db.query(GroupMember).filter(GroupMember.group_id == group_id).all()

    if payload.split_type == "equal":
        per_person = Decimal(str(payload.amount)) / Decimal(len(members))
        per_person = per_person.quantize(Decimal("0.01"))
        for m in members:
            split = ExpenseSplit(
                expense_id=expense.id,
                user_id=m.user_id,
                amount_owed=per_person,
                is_settled=(m.user_id == paid_by_id)
            )
            db.add(split)
    else:
        if not payload.splits:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Custom split butuh data splits")
        total_splits = sum(Decimal(str(s.amount_owed)) for s in payload.splits)
        tolerance = Decimal("1.00")  # toleransi 1 rupiah akibat rounding
        if abs(total_splits - Decimal(str(payload.amount))) > tolerance:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Total splits (Rp {total_splits}) harus sama dengan amount (Rp {payload.amount})")
        for s in payload.splits:
            split = ExpenseSplit(
                expense_id=expense.id,
                user_id=s.user_id,
                amount_owed=s.amount_owed,
                is_settled=(s.user_id == paid_by_id)
            )
            db.add(split)

    db.commit()
    db.refresh(expense)
    return _build_expense_response(expense)


def get_group_expenses(db: Session, group_id: UUID, current_user_id: UUID, limit: int = 20, offset: int = 0) -> dict:
    _assert_member(db, group_id, current_user_id)

    # Single query dengan eager load splits + payer
    expenses = (
        db.query(Expense)
        .options(
            joinedload(Expense.splits),
            joinedload(Expense.payer),
        )
        .filter(Expense.group_id == group_id)
        .order_by(Expense.date.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    total = db.query(Expense).filter(Expense.group_id == group_id).count()

    return {
        "items": [_build_expense_response(e) for e in expenses],
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": (offset + limit) < total,
    }


def delete_expense(db: Session, expense_id: UUID, current_user_id: UUID):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pengeluaran tidak ditemukan")
    if expense.paid_by != current_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Hanya pembuat expense yang bisa menghapus")
    db.delete(expense)
    db.commit()


def remind_expense_split(db: Session, expense_id: UUID, user_id: UUID, current_user_id: UUID):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pengeluaran tidak ditemukan")
        
    if expense.paid_by != current_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Hanya pemberi utang yang bisa mengingatkan")
        
    split = db.query(ExpenseSplit).filter(ExpenseSplit.expense_id == expense_id, ExpenseSplit.user_id == user_id).first()
    if not split:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tagihan tidak ditemukan untuk user ini")
        
    if split.is_settled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tagihan sudah lunas")
        
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc)
    
    # Check if buzzed recently (e.g. within last 1 hour to avoid spam, but for testing we can just update it)
    # if split.last_reminded_at and (now - split.last_reminded_at).total_seconds() < 3600:
    #     raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Tunggu 1 jam sebelum mengirim pengingat lagi")
        
    split.last_reminded_at = now
    db.commit()
    return {"message": "Pengingat berhasil dikirim"}


def _build_expense_response(expense: Expense) -> dict:
    # Gunakan relationship yang sudah di-load (tidak trigger query baru)
    payer = expense.payer
    splits = expense.splits

    return {
        "id": expense.id,
        "group_id": expense.group_id,
        "title": expense.title,
        "amount": float(expense.amount),
        "category": expense.category,
        "icon": CATEGORY_ICONS.get(expense.category or "lainnya", "category"),
        "split_type": expense.split_type,
        "split_type_label": "Split equally" if expense.split_type == "equal" else "Custom split",
        "notes": expense.notes,
        "date": expense.date.strftime("%d %b %Y") if expense.date else None,
        "created_at": expense.created_at,
        "paid_by": expense.paid_by,
        "paid_by_name": payer.name if payer else "Unknown",
        "splits": [
            {
                "id": s.id,
                "user_id": s.user_id,
                "amount_owed": float(s.amount_owed),
                "is_settled": s.is_settled,
                "settled_at": s.settled_at
            }
            for s in splits
        ]
    }


def _assert_member(db: Session, group_id: UUID, user_id: UUID):
    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == user_id
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Kamu bukan anggota grup ini")
