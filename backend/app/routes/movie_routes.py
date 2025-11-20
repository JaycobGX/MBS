from flask import Blueprint, request, jsonify
from app.controllers.movie_controller import (
    add_movie,
    update_movie,
    delete_movie,
    get_all_movies,
    get_movie_by_id,
    search_movies,
    get_upcoming_movies,
    get_now_showing_movies
)

movie_bp = Blueprint("movie", __name__)

# 1. GET all movies
@movie_bp.get("/movies")
def list_movies():
    movies = get_all_movies()
    return jsonify([m.as_dict() for m in movies]), 200

# 2. GET one movie by ID
@movie_bp.get("/movies/<int:movie_id>")
def get_movie(movie_id):
    movie = get_movie_by_id(movie_id)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404
    return jsonify(movie.as_dict()), 200

# 3. ADD a new movie
@movie_bp.post("/movies")
def create_movie():
    data = request.json
    try:
        movie = add_movie(data)
        return jsonify(movie.as_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 4. UPDATE movie
@movie_bp.put("/movies/<int:movie_id>")
def update_movie_route(movie_id):
    data = request.json
    movie = update_movie(movie_id, data)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404
    return jsonify(movie.as_dict()), 200

# 5. DELETE movie
@movie_bp.delete("/movies/<int:movie_id>")
def delete_movie_route(movie_id):
    deleted = delete_movie(movie_id)
    if not deleted:
        return jsonify({"error": "Movie not found"}), 404
    return jsonify({"message": "Movie deleted"}), 200

# 6. SEARCH movies by title or genre
@movie_bp.get("/movies/search")
def search_movies_route():
    keyword = request.args.get("keyword", "")
    results = search_movies(keyword)
    return jsonify([m.as_dict() for m in results]), 200

# 7. UPCOMING movies
@movie_bp.get("/movies/upcoming")
def upcoming_movies():
    movies = get_upcoming_movies()
    return jsonify([m.as_dict() for m in movies]), 200

# 8. NOW SHOWING movies
@movie_bp.get("/movies/now")
def now_showing_movies():
    movies = get_now_showing_movies()
    return jsonify([m.as_dict() for m in movies]), 200
