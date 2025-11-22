from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..extensions import db
from ..models.movie import Movie, MovieStatus
from ..models.showtime import Showtime
from ..models.review import Review
from ..models.booking import Booking

movie_bp = Blueprint("movies", __name__)


def movie_to_dict(movie: Movie, include_showtimes=False, include_reviews=False):
    data = {
        "id": movie.id,
        "title": movie.title,
        "synopsis": movie.synopsis,
        "genre": movie.genre,
        "duration_minutes": movie.duration_minutes,
        "cast": movie.cast,
        "rating": movie.rating,
        "status": movie.status.value,
    }

    if include_showtimes:
        data["showtimes"] = [
            {
                "id": s.id,
                "start_time": s.start_time.isoformat(),
                "ticket_price": float(s.ticket_price),
                "theater": s.theater.name,
                "city": s.theater.city,
                "available_seats": s.available_seats,
            }
            for s in movie.showtimes.order_by(Showtime.start_time).all()
        ]

    if include_reviews:
        data["reviews"] = [
            {
                "id": r.id,
                "user": r.user.full_name,
                "rating": r.rating,
                "comment": r.comment,
                "created_at": r.created_at.isoformat(),
            }
            for r in movie.reviews.order_by(Review.created_at.desc()).all()
        ]

    return data


@movie_bp.get("/current")
def current_movies():
    movies = Movie.query.filter_by(status=MovieStatus.CURRENT).all()
    return jsonify([movie_to_dict(m) for m in movies])


@movie_bp.get("/upcoming")
def upcoming_movies():
    movies = Movie.query.filter_by(status=MovieStatus.UPCOMING).all()
    return jsonify([movie_to_dict(m) for m in movies])


@movie_bp.get("/search")
def search_movies():
    # FR8 + U4/U6
    q = (request.args.get("q") or "").strip()
    if not q:
        return jsonify({"message": "Search term is required"}), 400

    movies = Movie.query.filter(Movie.title.ilike(f"%{q}%")).all()
    return jsonify([movie_to_dict(m) for m in movies])


@movie_bp.get("/<int:movie_id>")
def get_movie(movie_id):
    movie = Movie.query.get_or_404(movie_id)
    return jsonify(movie_to_dict(movie, include_showtimes=True, include_reviews=True))


@movie_bp.post("/<int:movie_id>/reviews")
@jwt_required()
def write_review(movie_id):
    # FR11.1 & U14 – only users with a booking
    user_id = get_jwt_identity()
    movie = Movie.query.get_or_404(movie_id)
    data = request.get_json() or {}
    comment = (data.get("comment") or "").strip()
    rating = data.get("rating")

    if not comment:
        return jsonify({"message": "Review comment required"}), 400

    has_booking = (
        Booking.query.join(Showtime)
        .filter(
            Booking.user_id == user_id,
            Showtime.movie_id == movie.id,
        )
        .count()
        > 0
    )
    if not has_booking:
        return (
            jsonify({"message": "Only users with confirmed bookings can review this movie"}),
            403,
        )

    review = Review(user_id=user_id, movie_id=movie.id, comment=comment, rating=rating)
    db.session.add(review)
    db.session.commit()

    return jsonify({"message": "Review submitted"})
