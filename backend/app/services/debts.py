from decimal import Decimal
from uuid import UUID
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status
from app.models.group import Group, GroupMember
from app.models.expense import Expense, ExpenseSplit
from app.models.user import User
from app.dependencies import assert_group_member


def get_group_debts(db: Session, group_id: UUID, current_user_id: UUID) -> dict:
    assert_group_member(db, group_id, current_user_id)

    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Grup tidak ditemukan")

    members = (
        db.query(GroupMember)
        .options(joinedload(GroupMember.user))
        .filter(GroupMember.group_id == group_id, GroupMember.status == "accepted")
        .all()
    )
    member_ids = [m.user_id for m in members]
    balances = {uid: Decimal("0.0") for uid in member_ids}

    expenses = (
        db.query(Expense)
        .options(joinedload(Expense.splits))
        .filter(Expense.group_id == group_id)
        .all()
    )

    for exp in expenses:
        for s in exp.splits:
            if s.user_id != exp.paid_by:
                amount = Decimal(str(s.amount_owed))
                balances[exp.paid_by] = balances.get(exp.paid_by, Decimal("0.0")) + amount
                balances[s.user_id] = balances.get(s.user_id, Decimal("0.0")) - amount

    from app.models.settlement import Settlement
    all_settlements = db.query(Settlement).filter(
        Settlement.group_id == group_id, 
        Settlement.status.in_(["pending", "confirmed"])
    ).all()
    
    for ps in all_settlements:
        amount = Decimal(str(ps.amount))
        balances[ps.to_user] = balances.get(ps.to_user, Decimal("0.0")) - amount
        balances[ps.from_user] = balances.get(ps.from_user, Decimal("0.0")) + amount

    member_balances = []
    for m in members:
        bal = balances.get(m.user_id, Decimal("0.0"))
        member_balances.append({
            "user_id": m.user_id,
            "user_name": m.user.name if m.user else "Unknown",
            "avatar_url": m.user.avatar_url if m.user else None,
            "balance": float(round(bal, 2)),
            "status": "Is owed" if bal > 0 else ("Owes" if bal < 0 else "Settled"),
            "amount": float(round(abs(bal), 2))
        })

    user_map = {m.user_id: m.user for m in members}
    settlements = _calculate_settlements(balances, user_map)

    return {
        "group_id": group_id,
        "group_name": group.name,
        "member_balances": member_balances,
        "settlements": settlements
    }


def get_my_debts(db: Session, current_user_id: UUID) -> dict:
    from app.models.expense import Expense, ExpenseSplit
    from app.models.user import User
    from app.models.group import Group

    # OWE: Splits assigned to current_user that are not settled, where expense is paid by someone else.
    owe_query = (
        db.query(ExpenseSplit, Expense, User, Group)
        .join(Expense, ExpenseSplit.expense_id == Expense.id)
        .join(User, Expense.paid_by == User.id)
        .join(Group, Expense.group_id == Group.id)
        .filter(
            ExpenseSplit.user_id == current_user_id,
            ExpenseSplit.is_settled.is_(False),
            Expense.paid_by != current_user_id
        )
    )
    
    # OWED: Splits assigned to others that are not settled, where expense is paid by current_user.
    owed_query = (
        db.query(ExpenseSplit, Expense, User, Group)
        .join(Expense, ExpenseSplit.expense_id == Expense.id)
        .join(User, ExpenseSplit.user_id == User.id)
        .join(Group, Expense.group_id == Group.id)
        .filter(
            Expense.paid_by == current_user_id,
            ExpenseSplit.is_settled.is_(False),
            ExpenseSplit.user_id != current_user_id
        )
    )

    owe_results = owe_query.all()
    owed_results = owed_query.all()

    owe_list = []
    total_hutang = Decimal("0.0")
    for split, exp, payer, group in owe_results:
        amount = Decimal(str(split.amount_owed))
        total_hutang += amount
        owe_list.append({
            "expense_split_id": split.id,
            "expense_id": exp.id,
            "expense_title": exp.title,
            "group_id": group.id,
            "group_name": group.name,
            "to_user_id": exp.paid_by,
            "to_user_name": payer.name,
            "to_user_avatar": payer.avatar_url,
            "amount": float(amount),
            "status": "Belum Lunas"
        })

    owed_list = []
    total_piutang = Decimal("0.0")
    for split, exp, debtor, group in owed_results:
        amount = Decimal(str(split.amount_owed))
        total_piutang += amount
        owed_list.append({
            "expense_split_id": split.id,
            "expense_id": exp.id,
            "expense_title": exp.title,
            "group_id": group.id,
            "group_name": group.name,
            "from_user_id": split.user_id,
            "from_user_name": debtor.name,
            "from_user_avatar": debtor.avatar_url,
            "amount": float(amount),
            "status": "Belum Lunas"
        })

    return {
        "total_hutang": float(round(total_hutang, 2)),
        "total_piutang": float(round(total_piutang, 2)),
        "owe_count": len(owe_list),
        "owed_count": len(owed_list),
        "owe": owe_list,
        "owed": owed_list
    }


def _calculate_settlements(balances: dict, user_map: dict) -> list:
    creditors = sorted(
        [[uid, bal] for uid, bal in balances.items() if bal > Decimal("0.01")],
        key=lambda x: -x[1]
    )
    debtors = sorted(
        [[uid, -bal] for uid, bal in balances.items() if bal < Decimal("-0.01")],
        key=lambda x: -x[1]
    )

    settlements = []
    i, j = 0, 0
    while i < len(creditors) and j < len(debtors):
        creditor_id, credit = creditors[i]
        debtor_id, debt = debtors[j]
        amount = min(credit, debt)

        creditor = user_map.get(creditor_id)
        debtor = user_map.get(debtor_id)

        settlements.append({
            "from_user_id": debtor_id,
            "from_user_name": debtor.name if debtor else "Unknown",
            "to_user_id": creditor_id,
            "to_user_name": creditor.name if creditor else "Unknown",
            "amount": float(round(amount, 2))
        })

        creditors[i][1] -= amount
        debtors[j][1] -= amount
        if creditors[i][1] < Decimal("0.01"):
            i += 1
        if debtors[j][1] < Decimal("0.01"):
            j += 1

    return settlements


