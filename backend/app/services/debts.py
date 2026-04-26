from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException, status
from app.models.group import Group, GroupMember
from app.models.expense import Expense, ExpenseSplit
from app.models.user import User


def get_group_debts(db: Session, group_id: UUID, current_user_id: UUID) -> dict:
    _assert_member(db, group_id, current_user_id)

    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Grup tidak ditemukan")

    members = db.query(GroupMember).filter(GroupMember.group_id == group_id).all()
    member_ids = [m.user_id for m in members]

    # Hitung balance tiap member: positif = diutangi, negatif = berutang
    balances = {uid: 0.0 for uid in member_ids}

    expenses = db.query(Expense).filter(Expense.group_id == group_id).all()
    for exp in expenses:
        splits = db.query(ExpenseSplit).filter(
            ExpenseSplit.expense_id == exp.id,
            ExpenseSplit.is_settled == False
        ).all()
        for s in splits:
            if s.user_id != exp.paid_by:
                balances[exp.paid_by] = balances.get(exp.paid_by, 0) + float(s.amount_owed)
                balances[s.user_id] = balances.get(s.user_id, 0) - float(s.amount_owed)

    # Build member balance list
    member_balances = []
    for m in members:
        user = db.query(User).filter(User.id == m.user_id).first()
        bal = balances.get(m.user_id, 0)
        member_balances.append({
            "user_id": m.user_id,
            "user_name": user.name if user else "Unknown",
            "avatar_url": user.avatar_url if user else None,
            "balance": round(bal, 2),
            "status": "Is owed" if bal > 0 else ("Owes" if bal < 0 else "Settled"),
            "amount": round(abs(bal), 2)
        })

    # Hitung settlement path optimal (minimize transaksi)
    settlements = _calculate_settlements(db, balances, member_ids)

    return {
        "group_id": group_id,
        "group_name": group.name,
        "member_balances": member_balances,
        "settlements": settlements
    }


def get_my_debts(db: Session, current_user_id: UUID) -> dict:
    memberships = db.query(GroupMember).filter(GroupMember.user_id == current_user_id).all()

    owe_list = []     # Saya berutang ke orang lain
    owed_list = []    # Orang lain berutang ke saya
    total_hutang = 0.0
    total_piutang = 0.0

    for membership in memberships:
        group = membership.group
        expenses = db.query(Expense).filter(Expense.group_id == group.id).all()

        for exp in expenses:
            splits = db.query(ExpenseSplit).filter(
                ExpenseSplit.expense_id == exp.id,
                ExpenseSplit.is_settled == False
            ).all()

            for s in splits:
                if s.user_id == current_user_id and exp.paid_by != current_user_id:
                    # Saya berutang ke payer
                    payer = db.query(User).filter(User.id == exp.paid_by).first()
                    total_hutang += float(s.amount_owed)
                    owe_list.append({
                        "expense_split_id": s.id,
                        "expense_id": exp.id,
                        "expense_title": exp.title,
                        "group_id": group.id,
                        "group_name": group.name,
                        "to_user_id": exp.paid_by,
                        "to_user_name": payer.name if payer else "Unknown",
                        "to_user_avatar": payer.avatar_url if payer else None,
                        "amount": float(s.amount_owed),
                        "status": "Belum Lunas"
                    })

                elif exp.paid_by == current_user_id and s.user_id != current_user_id:
                    # Orang lain berutang ke saya
                    debtor = db.query(User).filter(User.id == s.user_id).first()
                    total_piutang += float(s.amount_owed)
                    owed_list.append({
                        "expense_split_id": s.id,
                        "expense_id": exp.id,
                        "expense_title": exp.title,
                        "group_id": group.id,
                        "group_name": group.name,
                        "from_user_id": s.user_id,
                        "from_user_name": debtor.name if debtor else "Unknown",
                        "from_user_avatar": debtor.avatar_url if debtor else None,
                        "amount": float(s.amount_owed),
                        "status": "Belum Lunas"
                    })

    return {
        "total_hutang": round(total_hutang, 2),
        "total_piutang": round(total_piutang, 2),
        "owe_count": len(owe_list),
        "owed_count": len(owed_list),
        "owe": owe_list,
        "owed": owed_list
    }


def _calculate_settlements(db: Session, balances: dict, member_ids: list) -> list:
    # Algoritma greedy: pisahkan creditor (positif) dan debtor (negatif)
    creditors = sorted(
        [(uid, bal) for uid, bal in balances.items() if bal > 0.01],
        key=lambda x: -x[1]
    )
    debtors = sorted(
        [(uid, -bal) for uid, bal in balances.items() if bal < -0.01],
        key=lambda x: -x[1]
    )

    creditors = [[uid, bal] for uid, bal in creditors]
    debtors = [[uid, bal] for uid, bal in debtors]

    settlements = []
    i, j = 0, 0
    while i < len(creditors) and j < len(debtors):
        creditor_id, credit = creditors[i]
        debtor_id, debt = debtors[j]

        amount = min(credit, debt)
        creditor = db.query(User).filter(User.id == creditor_id).first()
        debtor = db.query(User).filter(User.id == debtor_id).first()

        settlements.append({
            "from_user_id": debtor_id,
            "from_user_name": debtor.name if debtor else "Unknown",
            "to_user_id": creditor_id,
            "to_user_name": creditor.name if creditor else "Unknown",
            "amount": round(amount, 2)
        })

        creditors[i][1] -= amount
        debtors[j][1] -= amount
        if creditors[i][1] < 0.01:
            i += 1
        if debtors[j][1] < 0.01:
            j += 1

    return settlements


def _assert_member(db: Session, group_id: UUID, user_id: UUID):
    member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == user_id
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Kamu bukan anggota grup ini")
