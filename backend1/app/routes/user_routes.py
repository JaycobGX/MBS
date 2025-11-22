from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..extensions import db
from ..models.user import User
from ..models.booking import Booking
from ..utils.security import hash_password

user_bp = Blueprint("users", __name__)


@user_bp.get("/me")
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    return jsonify(
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "role": user.role.value,
        }
    )


@user_bp.put("/me")
@jwt_required()
def update_me():
    # FR4.1, FR11 – update profile info
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)
    data = request.get_json() or {}

    for field in ["full_name", "phone", "address"]:
        if field in data and data[field]:
            setattr(user, field, data[field])

    if data.get("password"):
        user.password_hash = hash_password(data["password"])

    db.session.commit()
    return jsonify({"message": "Profile updated"})


@user_bp.get("/me/bookings")
@jwt_required()
def my_bookings():
    user_id = get_jwt_identity()
    bookings = (
        Booking.query.filter_by(user_id=user_id)
        .order_by(Booking.created_at.desc())
        .all()
    )

    results = []
    for b in bookings:
        results.append(
            {
                "id": b.id,
                "ticket_code": b.ticket_code,
                "status": b.status.value,
                "num_seats": b.num_seats,
                "total_price": float(b.total_price),
                "payment_method": b.payment_method,
                "created_at": b.created_at.isoformat(),
                "showtime": {
                    "id": b.showtime.id,
                    "start_time": b.showtime.start_time.isoformat(),
                    "theater": b.showtime.theater.name,
                    "city": b.showtime.theater.city,
                    "movie_title": b.showtime.movie.title,
                },
            }
        )

    return jsonify(results)
