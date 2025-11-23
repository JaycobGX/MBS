from flask import Blueprint, request, jsonify
from extensions import db
from models.movie import Movie
from models.review import Review

movies_bp = Blueprint('movies', __name__, url_prefix='/api/movies')

@movies_bp.route('', methods=['GET'])
def get_movies():
    """FR6.1, FR7.1, FR8.1: Browse and search movies"""
    category = request.args.get('category')
    genre = request.args.get('genre')
    search = request.args.get('search')
    
    query = Movie.query.filter_by(is_active=True)
    
    if category == 'current':
        query = query.filter_by(is_currently_playing=True)
    elif category == 'upcoming':
        query = query.filter_by(is_currently_playing=False)
    
    if genre:
        query = query.filter(Movie.genre.contains(genre))
    if search:
        query = query.filter(Movie.title.ilike(f'%{search}%'))
    
    movies = query.all()
    
    return jsonify([{
        'id': m.id,
        'title': m.title,
        'description': m.description,
        'duration': m.duration,
        'genre': m.genre,
        'rating': m.rating,
        'poster_url': m.poster_url,
        'director': m.director,
        'cast': m.cast,
        'is_currently_playing': m.is_currently_playing,
        'avg_rating': db.session.query(db.func.avg(Review.rating)).filter_by(movie_id=m.id).scalar() or 0
    } for m in movies])

@movies_bp.route('/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    """FR10.1: View movie details"""
    movie = Movie.query.get_or_404(movie_id)
    avg_rating = db.session.query(db.func.avg(Review.rating)).filter_by(movie_id=movie_id).scalar() or 0
    
    return jsonify({
        'id': movie.id,
        'title': movie.title,
        'description': movie.description,
        'duration': movie.duration,
        'genre': movie.genre,
        'rating': movie.rating,
        'cast': movie.cast,
        'director': movie.director,
        'poster_url': movie.poster_url,
        'trailer_url': movie.trailer_url,
        'is_currently_playing': movie.is_currently_playing,
        'avg_rating': float(avg_rating)
    })