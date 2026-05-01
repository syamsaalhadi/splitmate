from uuid import UUID
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from fastapi import HTTPException, status
from app.models.friendship import Friendship
from app.models.user import User

def add_friend(db: Session, current_user_id: UUID, friend_email: str):
    friend = db.query(User).filter(User.email == friend_email).first()
    if not friend:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User dengan email tersebut tidak ditemukan")
    
    if friend.id == current_user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Kamu tidak bisa menambahkan dirimu sendiri")
    
    # Cek apakah sudah berteman atau pending
    existing_1 = db.query(Friendship).filter(Friendship.user_id == current_user_id, Friendship.friend_id == friend.id).first()
    existing_2 = db.query(Friendship).filter(Friendship.user_id == friend.id, Friendship.friend_id == current_user_id).first()
    
    if existing_1 or existing_2:
        rel = existing_1 or existing_2
        if rel.status == 'accepted':
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Kalian sudah berteman")
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Permintaan pertemanan sudah ada (pending)")

    # Insert 1 baris saja, dari pengirim (user_id) ke penerima (friend_id)
    f = Friendship(user_id=current_user_id, friend_id=friend.id, status='pending')
    db.add(f)
    db.commit()
    return {"message": "Permintaan pertemanan berhasil dikirim"}

def get_my_friends(db: Session, current_user_id: UUID):
    # Teman aktif adalah ketika status == 'accepted' dan current user ada di salah satu sisi
    friendships = db.query(Friendship).filter(
        or_(
            and_(Friendship.user_id == current_user_id, Friendship.status == 'accepted'),
            and_(Friendship.friend_id == current_user_id, Friendship.status == 'accepted')
        )
    ).all()
    
    friend_ids = []
    for f in friendships:
        if f.user_id == current_user_id:
            friend_ids.append(f.friend_id)
        else:
            friend_ids.append(f.user_id)
            
    friends = db.query(User).filter(User.id.in_(friend_ids)).all()
    
    # Map created_at
    f_map = {
        (f.user_id if f.user_id != current_user_id else f.friend_id): f.created_at 
        for f in friendships
    }
    
    result = []
    for user in friends:
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "avatar_url": user.avatar_url,
            "status": "accepted",
            "friendship_created_at": f_map.get(user.id)
        })
    return result

def get_friend_requests(db: Session, current_user_id: UUID):
    # Yg request ke kita -> friend_id == current_user_id AND status == 'pending'
    requests = db.query(Friendship).filter(
        Friendship.friend_id == current_user_id,
        Friendship.status == 'pending'
    ).all()
    
    requester_ids = [r.user_id for r in requests]
    requesters = db.query(User).filter(User.id.in_(requester_ids)).all()
    
    r_map = {r.user_id: r.created_at for r in requests}
    
    result = []
    for user in requesters:
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "avatar_url": user.avatar_url,
            "status": "pending",
            "friendship_created_at": r_map.get(user.id)
        })
    return result

def respond_friend_request(db: Session, current_user_id: UUID, requester_id: UUID, action: str):
    req = db.query(Friendship).filter(
        Friendship.user_id == requester_id,
        Friendship.friend_id == current_user_id,
        Friendship.status == 'pending'
    ).first()
    
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Permintaan pertemanan tidak ditemukan")
        
    if action == "accept":
        req.status = "accepted"
        db.commit()
        return {"message": "Permintaan pertemanan diterima"}
    elif action == "reject":
        db.delete(req)
        db.commit()
        return {"message": "Permintaan pertemanan ditolak"}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Action tidak valid")
