from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from ..extensions import db
from ..models.movie import Movie, MovieStatus
from ..models.theater import Theater
from ..models.showtime import Showtime
from ..models.booking import Booking, BookingStatus
from ..utils.permissions import admin_required

admin_bp = Blueprint("admin", __name__)


@admin_bp.before_request
@jwt_required()
def ensure_admin_jwt():
    # Verify the token & admin role for all routes in this blueprint
    admin_required()


@admin_bp.get("/status-report")
def status_report():
    """
    FR17 – View Status Report (U15)
    """
    total_tickets = (
        db.session.query(db.func.sum(Booking.num_seats))
        .filter(Booking.status == BookingStatus.CONFIRMED)
        .scalar()
        or 0
    )
    total_revenue = (
        db.session.query(db.func.sum(Booking.total_price))
        .filter(Booking.status == BookingStatus.CONFIRMED)
        .scalar()
        or 0
    )

    current_movies = Movie.query.filter_by(status=MovieStatus.CURRENT).all()

    return jsonify(
        {
            "total_tickets_sold": int(total_tickets),
            "total_revenue": float(total_revenue),
            "current_movies": [m.title for m in current_movies],
        }
    )


# ----- Manage Movies (FR18 & U16/U17) -----

@admin_bp.post("/movies")
def add_movie():
    data = request.get_json() or {}
    title = data.get("title")
    if not title:
        return jsonify({"message": "Title required"}), 400

    movie = Movie(
        title=title,
        synopsis=data.get("synopsis"),
        genre=data.get("genre"),
        duration_minutes=data.get("duration_minutes"),
        cast=data.get("cast"),
        status=MovieStatus(data.get("status", "current")),
    )
    db.session.add(movie)
    db.session.commit()
    return jsonify({"message": "Movie added", "id": movie.id}), 201


@admin_bp.put("/movies/<int:movie_id>")
def edit_movie(movie_id):
    movie = Movie.query.get_or_404(movie_id)
    data = request.get_json() or {}

    for field in ["title", "synopsis", "genre", "duration_minutes", "cast"]:
        if field in data:
            setattr(movie, field, data[field])

    if "status" in data:
        movie.status = MovieStatus(data["status"])

    db.session.commit()
    return jsonify({"message": "Movie updated"})


@admin_bp.delete("/movies/<int:movie_id>")
def remove_movie(movie_id):
    movie = Movie.query.get_or_404(movie_id)
    db.session.delete(movie)
    db.session.commit()
    return jsonify({"message": "Movie removed"})


# ----- Manage Theaters & Showtimes (FR18.1/18.2) -----

@admin_bp.post("/theaters")
def add_theater():
    data = request.get_json() or {}
    name = data.get("name")
    city = data.get("city")
    if not name or not city:
        return jsonify({"message": "name and city required"}), 400

    t = Theater(name=name, city=city)
    db.session.add(t)
    db.session.commit()
    return jsonify({"message": "Theater added", "id": t.id}), 201


@admin_bp.post("/showtimes")
def add_showtime():
    data = request.get_json() or {}
    movie_id = data.get("movie_id")
    theater_id = data.get("theater_id")
    start_time = data.get("start_time")  # ISO string
    ticket_price = data.get("ticket_price")
    total_seats = data.get("total_seats", 100)

    if not all([movie_id, theater_id, start_time, ticket_price]):
        return jsonify({"message": "movie_id, theater_id, start_time, ticket_price required"}), 400

    st = Showtime(
        movie_id=movie_id,
        theater_id=theater_id,
        start_time=datetime.fromisoformat(start_time),
        ticket_price=ticket_price,
        total_seats=total_seats,
        available_seats=total_seats,
    )
    db.session.add(st)
    db.session.commit()
    return jsonify({"message": "Showtime added", "id": st.id}), 201


@admin_bp.put("/showtimes/<int:showtime_id>")
def edit_showtime(showtime_id):
    """
    FR18.2 – edit time and price.
    """
    st = Showtime.query.get_or_404(showtime_id)
    data = request.get_json() or {}

    if "start_time" in data:
        st.start_time = datetime.fromisoformat(data["start_time"])
    if "ticket_price" in data:
        st.ticket_price = data["ticket_price"]
    if "total_seats" in data:
        # adjust available seats based on new total if you want
        diff = data["total_seats"] - st.total_seats
        st.total_seats = data["total_seats"]
        st.available_seats += diff

    db.session.commit()
    return jsonify({"message": "Showtime updated"})


@admin_bp.delete("/showtimes/<int:showtime_id>")
def delete_showtime(showtime_id):
    st = Showtime.query.get_or_404(showtime_id)
    db.session.delete(st)
    db.session.commit()
    return jsonify({"message": "Showtime removed"})
