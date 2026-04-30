from uuid import UUID
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from app.models.expense import Expense, ExpenseSplit
from app.models.group import Group, GroupMember

CATEGORY_ICONS = {
    "makanan": "restaurant",
    "transportasi": "commute",
    "travel": "flight",
    "belanja": "shopping_bag",
    "hiburan": "celebration",
    "tagihan": "receipt_long",
    "lainnya": "category",
}


def get_my_activities(db: Session, user_id: UUID, limit: int = 10):
    # Ambil semua group_id milik user
    group_ids = [
        m.group_id for m in
        db.query(GroupMember.group_id).filter(GroupMember.user_id == user_id).all()
    ]
    if not group_ids:
        return []

    # Single query: expenses yang melibatkan user (paid_by atau split),
    # eager load group + splits sekaligus
    expenses = (
        db.query(Expense)
        .options(
            joinedload(Expense.group),
            joinedload(Expense.splits),
        )
        .filter(Expense.group_id.in_(group_ids))
        .order_by(Expense.created_at.desc())
        .limit(limit * 3)  # ambil lebih, filter setelah
        .all()
    )

    result = []
    seen = set()
    for exp in expenses:
        if exp.id in seen:
            continue

        paid_by_me = exp.paid_by == user_id
        split_row = next((s for s in exp.splits if s.user_id == user_id), None)

        # Hanya tampilkan expense yang melibatkan user ini
        if not paid_by_me and split_row is None:
            continue

        seen.add(exp.id)
        amount_display = float(exp.amount) if paid_by_me else (float(split_row.amount_owed) if split_row else 0)
        date_str = exp.date.strftime("%d %b %Y").lstrip("0") if exp.date else ""

        result.append({
            "id": str(exp.id),
            "title": exp.title,
            "group_name": exp.group.name if exp.group else "",
            "category": exp.category or "lainnya",
            "icon": CATEGORY_ICONS.get(exp.category or "lainnya", "category"),
            "amount": amount_display,
            "paid_by_me": paid_by_me,
            "date": date_str,
        })

        if len(result) >= limit:
            break

    return result
