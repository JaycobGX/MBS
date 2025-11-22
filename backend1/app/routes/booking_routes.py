import uuid
from decimal import Decimal

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..extensions import db
from ..models.showtime import Showtime
from ..models.movie import MovieStatus
from ..models.booking import Booking, BookingStatus
from ..utils.payments import process_payment

booking_bp = Blueprint("bookings", __name__)


@booking_bp.post("/")
@jwt_required()
def create_booking():
    """
    FR12–FR14, U8–U10, U21–U23
    """
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    showtime_id = data.get("showtime_id")
    num_seats = int(data.get("num_seats") or 0)
    payment_method = (data.get("payment_method") or "").lower()

    if not showtime_id or num_seats <= 0:
        return jsonify({"message": "showtime_id and num_seats are required"}), 400

    if num_seats > 10:
        return jsonify({"message": "Cannot book more than 10 seats"}), 400

    if payment_method not in {"credit", "paypal", "venmo"}:
        return jsonify({"message": "Invalid payment method"}), 400

    showtime = Showtime.query.get_or_404(showtime_id)
    if showtime.movie.status != MovieStatus.CURRENT:
        # FR7.2 – cannot book upcoming movies
        return jsonify({"message": "Tickets cannot be purchased for upcoming movies"}), 400

    if showtime.available_seats < num_seats:
        return jsonify({"message": "Not enough available seats"}), 400

    total_price = Decimal(showtime.ticket_price) * num_seats

    # Simple payment processing
    ok, tx_id = process_payment(int(total_price * 100), payment_method)
    if not ok:
        return jsonify({"message": "Payment failed"}), 402

    showtime.available_seats -= num_seats

    booking = Booking(
        user_id=user_id,
        showtime_id=showtime.id,
        num_seats=num_seats,
        total_price=total_price,
        status=BookingStatus.CONFIRMED,
        ticket_code=uuid.uuid4().hex[:12].upper(),
        payment_method=payment_method,
        payment_reference=tx_id,
    )

    db.session.add(booking)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Booking confirmed",
                "booking": {
                    "id": booking.id,
                    "ticket_code": booking.ticket_code,
                    "total_price": float(booking.total_price),
                    "num_seats": booking.num_seats,
                    "payment_method": booking.payment_method,
                    "showtime": {
                        "id": showtime.id,
                        "start_time": showtime.start_time.isoformat(),
                        "theater": showtime.theater.name,
                        "city": showtime.theater.city,
                        "movie_title": showtime.movie.title,
                    },
                },
            }
        ),
        201,
    )


@booking_bp.get("/<int:booking_id>/ticket")
@jwt_required()
def get_ticket(booking_id):
    """
    U13 – Display/Print Ticket.
    Frontend can render ticket_code as text or QR.
    """
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)

    if booking.user_id != user_id:
        return jsonify({"message": "Not authorized to view this ticket"}), 403

    return jsonify(
        {
            "id": booking.id,
            "ticket_code": booking.ticket_code,
            "status": booking.status.value,
            "num_seats": booking.num_seats,
            "showtime": {
                "id": booking.showtime.id,
                "start_time": booking.showtime.start_time.isoformat(),
                "theater": booking.showtime.theater.name,
                "city": booking.showtime.theater.city,
                "movie_title": booking.showtime.movie.title,
            },
        }
    )
