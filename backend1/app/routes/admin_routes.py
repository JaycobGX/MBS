from datetime import datetime
from functools import wraps

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from ..extensions import db
from ..models.movie import Movie, MovieStatus
from ..models.theater import Theater
from ..models.showtime import Showtime

admin_bp = Blueprint("admin", __name__)


# Helper: admin-only decorator
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()  # JWT claims contain "role": "admin"
        if claims.get("role") != "admin":
            return jsonify({"message": "Admin privileges required"}), 403
        return fn(*args, **kwargs)

    return wrapper


# MOVIE MANAGEMENT
@admin_bp.route("/movies", methods=["POST"])
@admin_required
def create_movie():
    """
    Create a new movie.
    Required: title
    Optional: synopsis, genre, duration_minutes, cast, rating, image_url, status
    """
    data = request.get_json() or {}

    title = data.get("title")
    if not title:
        return jsonify({"message": "Field 'title' is required"}), 400

    status_str = data.get("status", "current").lower()
    if status_str not in ("current", "upcoming"):
        return jsonify({"message": "status must be 'current' or 'upcoming'"}), 400

    try:
        status = MovieStatus(status_str)
    except ValueError:
        return jsonify({"message": "Invalid status value"}), 400

    movie = Movie(
        title=title,
        synopsis=data.get("synopsis"),
        genre=data.get("genre"),
        duration_minutes=data.get("duration_minutes"),
        cast=data.get("cast"),
        rating=data.get("rating"),
        image_url=data.get("image_url") if hasattr(Movie, "image_url") else None,
        status=status,
    )

    db.session.add(movie)
    db.session.commit()

    return jsonify({"message": "Movie created", "movie_id": movie.id}), 201


@admin_bp.route("/movies/<int:movie_id>", methods=["PUT", "PATCH"])
@admin_required
def update_movie(movie_id):
    """
    Update an existing movie (partial update).
    """
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({"message": "Movie not found"}), 404

    data = request.get_json() or {}

    if "title" in data:
        movie.title = data["title"]
    if "synopsis" in data:
        movie.synopsis = data["synopsis"]
    if "genre" in data:
        movie.genre = data["genre"]
    if "duration_minutes" in data:
        movie.duration_minutes = data["duration_minutes"]
    if "cast" in data:
        movie.cast = data["cast"]
    if "rating" in data:
        movie.rating = data["rating"]
    if "image_url" in data and hasattr(Movie, "image_url"):
        movie.image_url = data["image_url"]
    if "status" in data:
        status_str = str(data["status"]).lower()
        if status_str not in ("current", "upcoming"):
            return jsonify({"message": "status must be 'current' or 'upcoming'"}), 400
        try:
            movie.status = MovieStatus(status_str)
        except ValueError:
            return jsonify({"message": "Invalid status value"}), 400

    db.session.commit()

    return jsonify({"message": "Movie updated"}), 200


@admin_bp.route("/movies/<int:movie_id>", methods=["DELETE"])
@admin_required
def delete_movie(movie_id):
    """
    Delete a movie. Any related showtimes/reviews must be handled
    by DB cascade OR manually before this call.
    """
    movie = Movie.query.get(movie_id)
    if not movie:
        return jsonify({"message": "Movie not found"}), 404

    # If cascade is not configured in the ORM/DB, you may need to:
    # Showtime.query.filter_by(movie_id=movie.id).delete()
    # Review.query.filter_by(movie_id=movie.id).delete()

    db.session.delete(movie)
    db.session.commit()

    return jsonify({"message": "Movie deleted"}), 200

# THEATER MANAGEMENT
@admin_bp.route("/theaters", methods=["POST"])
@admin_required
def create_theater():
    """
    Create a new theater.
    Required: name, city
    """
    data = request.get_json() or {}
    name = data.get("name")
    city = data.get("city")

    if not name or not city:
        return jsonify({"message": "Fields 'name' and 'city' are required"}), 400

    theater = Theater(name=name, city=city)
    db.session.add(theater)
    db.session.commit()

    return jsonify({"message": "Theater created", "theater_id": theater.id}), 201


# delete a theater
@admin_bp.route("/theaters/<int:theater_id>", methods=["DELETE"])
@admin_required
def delete_theater(theater_id):
    theater = Theater.query.get(theater_id)
    if not theater:
        return jsonify({"message": "Theater not found"}), 404

    # Prevent deletion if showtimes exist
    if theater.showtimes and theater.showtimes.count() > 0:
        return jsonify({"message": "Cannot delete theater with existing showtimes"}), 400

    db.session.delete(theater)
    db.session.commit()
    return jsonify({"message": "Theater deleted"}), 200

# SHOWTIME MANAGEMENT
@admin_bp.route("/showtimes", methods=["POST"])
@admin_required
def create_showtime():
    """
    Create a new showtime.
    Required: movie_id, theater_id, start_time, ticket_price, total_seats
    start_time should be a string 'YYYY-MM-DD HH:MM:SS'
    """
    data = request.get_json() or {}

    movie_id = data.get("movie_id")
    theater_id = data.get("theater_id")
    start_time_str = data.get("start_time")
    ticket_price = data.get("ticket_price")
    total_seats = data.get("total_seats")

    if not (movie_id and theater_id and start_time_str and ticket_price and total_seats):
        return jsonify({
            "message": "Fields 'movie_id', 'theater_id', 'start_time', 'ticket_price', 'total_seats' are required"
        }), 400

    # validate movie + theater exist:
    if not Movie.query.get(movie_id):
        return jsonify({"message": "Invalid movie_id"}), 400
    if not Theater.query.get(theater_id):
        return jsonify({"message": "Invalid theater_id"}), 400

    try:
        start_time = datetime.strptime(start_time_str, "%Y-%m-%d %H:%M:%S")
    except ValueError:
        return jsonify({"message": "start_time must be in format 'YYYY-MM-DD HH:MM:SS'"}), 400

    showtime = Showtime(
        movie_id=movie_id,
        theater_id=theater_id,
        start_time=start_time,
        ticket_price=ticket_price,
        total_seats=total_seats,
        available_seats=total_seats,  # initially all seats available
    )

    db.session.add(showtime)
    db.session.commit()

    return jsonify({"message": "Showtime created", "showtime_id": showtime.id}), 201


@admin_bp.route("/showtimes/<int:showtime_id>", methods=["DELETE"])
@admin_required
def delete_showtime(showtime_id):
    """
    Delete a showtime.
    """
    showtime = Showtime.query.get(showtime_id)
    if not showtime:
        return jsonify({"message": "Showtime not found"}), 404

    db.session.delete(showtime)
    db.session.commit()

    return jsonify({"message": "Showtime deleted"}), 200
