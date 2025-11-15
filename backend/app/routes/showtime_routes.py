from flask import Blueprint, request, jsonify
from app.controllers.showtime_controller import (
    add_showtime,
    get_showtimes_for_movie,
    update_showtime,
    delete_showtime
)
from app.models.showtime import Showtime

showtime_bp = Blueprint("showtime", __name__)


# -------------------------------------------
# 1. Add a new showtime
# -------------------------------------------
@showtime_bp.post("/showtimes")
def create_showtime():
    data = request.json
    try:
        new_showtime = add_showtime(data)
        return jsonify(new_showtime.as_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# -------------------------------------------
# 2. Get showtimes for a specific movie
# -------------------------------------------
@showtime_bp.get("/showtimes/movie/<int:movie_id>")
def list_showtimes_for_movie(movie_id):
    showtimes = get_showtimes_for_movie(movie_id)
    return jsonify([s.as_dict() for s in showtimes]), 200


# -------------------------------------------
# 3. Update a showtime
# -------------------------------------------
@showtime_bp.put("/showtimes/<int:showtime_id>")
def update_showtime_route(showtime_id):
    data = request.json
    updated = update_showtime(showtime_id, data)
    if not updated:
        return jsonify({"error": "Showtime not found"}), 404
    return jsonify(updated.as_dict()), 200


# -------------------------------------------
# 4. Delete a showtime
# -------------------------------------------
@showtime_bp.delete("/showtimes/<int:showtime_id>")
def delete_showtime_route(showtime_id):
    deleted = delete_showtime(showtime_id)
    if not deleted:
        return jsonify({"error": "Showtime not found"}), 404
    return jsonify({"message": "Showtime deleted"}), 200


# -------------------------------------------
# 5. List ALL showtimes (for admin)
# -------------------------------------------
@showtime_bp.get("/showtimes")
def list_all_showtimes():
    showtimes = Showtime.query.order_by(Showtime.start_time.asc()).all()
    return jsonify([s.as_dict() for s in showtimes]), 200
