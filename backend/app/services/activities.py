from uuid import UUID
from sqlalchemy.orm import Session
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
    # Expenses the user paid
    paid = (
        db.query(Expense)
        .join(Group, Expense.group_id == Group.id)
        .join(GroupMember, GroupMember.group_id == Group.id)
        .filter(GroupMember.user_id == user_id, Expense.paid_by == user_id)
        .order_by(Expense.created_at.desc())
        .limit(limit)
        .all()
    )

    # Expenses the user was split into (but didn't pay)
    split = (
        db.query(Expense)
        .join(ExpenseSplit, ExpenseSplit.expense_id == Expense.id)
        .filter(
            ExpenseSplit.user_id == user_id,
            Expense.paid_by != user_id,
        )
        .order_by(Expense.created_at.desc())
        .limit(limit)
        .all()
    )

    seen = set()
    merged = []
    for exp in sorted(paid + split, key=lambda e: e.created_at, reverse=True):
        if exp.id in seen:
            continue
        seen.add(exp.id)
        merged.append(exp)

    result = []
    for exp in merged[:limit]:
        split_row = next((s for s in exp.splits if s.user_id == user_id), None)
        paid_by_me = exp.paid_by == user_id
        amount_display = float(exp.amount) if paid_by_me else float(split_row.amount_owed) if split_row else 0

        date_str = exp.date.strftime("%d %b %Y").lstrip("0") if exp.date else ""
        result.append({
            "id": str(exp.id),
            "title": exp.title,
            "group_name": exp.group.name,
            "category": exp.category or "lainnya",
            "icon": CATEGORY_ICONS.get(exp.category or "lainnya", "category"),
            "amount": amount_display,
            "paid_by_me": paid_by_me,
            "date": date_str,
        })

    return result
