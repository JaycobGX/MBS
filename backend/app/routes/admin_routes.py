from flask import Blueprint, request, jsonify
from app.controllers.admin_controller import (
    get_basic_stats,
    admin_add_movie,
    admin_update_movie,
    admin_delete_movie,
    admin_add_showtime,
    admin_update_showtime,
    admin_delete_showtime,
    admin_list_showtimes
)

admin_bp = Blueprint("admin", __name__)

# 1. Admin Dashboard Stats
@admin_bp.get("/admin/stats")
def admin_stats():
    stats = get_basic_stats()
    return jsonify(stats), 200

# 2. Add Movie
@admin_bp.post("/admin/movies")
def admin_create_movie():
    data = request.json
    try:
        movie = admin_add_movie(data)
        return jsonify(movie.as_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 3. Update Movie
@admin_bp.put("/admin/movies/<int:movie_id>")
def admin_update_movie_route(movie_id):
    data = request.json
    updated = admin_update_movie(movie_id, data)
    if not updated:
        return jsonify({"error": "Movie not found"}), 404
    return jsonify(updated.as_dict()), 200

# 4. Delete Movie
@admin_bp.delete("/admin/movies/<int:movie_id>")
def admin_delete_movie_route(movie_id):
    deleted = admin_delete_movie(movie_id)
    if not deleted:
        return jsonify({"error": "Movie not found"}), 404
    return jsonify({"message": "Movie deleted"}), 200

# 5. Add Showtime
@admin_bp.post("/admin/showtimes")
def admin_create_showtime():
    data = request.json
    try:
        showtime = admin_add_showtime(data)
        return jsonify(showtime.as_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 6. Update Showtime
@admin_bp.put("/admin/showtimes/<int:showtime_id>")
def admin_update_showtime_route(showtime_id):
    data = request.json
    updated = admin_update_showtime(showtime_id, data)
    if not updated:
        return jsonify({"error": "Showtime not found"}), 404
    return jsonify(updated.as_dict()), 200

# 7. Delete Showtime
@admin_bp.delete("/admin/showtimes/<int:showtime_id>")
def admin_delete_showtime_route(showtime_id):
    deleted = admin_delete_showtime(showtime_id)
    if not deleted:
        return jsonify({"error": "Showtime not found"}), 404
    return jsonify({"message": "Showtime deleted"}), 200

# 8. List all Showtimes
@admin_bp.get("/admin/showtimes")
def admin_list_all_showtimes():
    showtimes = admin_list_showtimes()
    return jsonify([s.as_dict() for s in showtimes]), 200
