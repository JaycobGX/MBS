from flask import Blueprint, request, jsonify
from datetime import datetime
from extensions import db
from models.movie import Movie
from models.booking import Booking
from models.showtime import Showtime
from models.theater import Theater
from models.user import User
from utils.decorators import admin_required

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/dashboard', methods=['GET'])
@admin_required
def dashboard():
    """FR17.1: Status report"""
    total_bookings = Booking.query.filter_by(status='confirmed').count()
    total_revenue = db.session.query(db.func.sum(Booking.total_price)).filter_by(payment_status='completed').scalar() or 0
    active_movies = Movie.query.filter_by(is_active=True, is_currently_playing=True).count()
    
    recent_bookings = Booking.query.order_by(Booking.booking_time.desc()).limit(10).all()
    
    return jsonify({
        'stats': {
            'total_bookings': total_bookings,
            'total_revenue': float(total_revenue),
            'active_movies': active_movies
        },
        'recent_bookings': [{
            'id': b.id,
            'user_name': b.user.name,
            'movie_title': b.showtime.movie.title,
            'amount': b.total_price,
            'status': b.status,
            'booking_time': b.booking_time.isoformat()
        } for b in recent_bookings]
    })

@admin_bp.route('/movies', methods=['POST'])
@admin_required
def create_movie():
    """FR18.1: Add movie"""
    data = request.json
    movie = Movie(
        title=data['title'],
        description=data.get('description'),
        duration=data.get('duration'),
        genre=data.get('genre'),
        rating=data.get('rating'),
        release_date=datetime.strptime(data['release_date'], '%Y-%m-%d').date() if data.get('release_date') else None,
        poster_url=data.get('poster_url'),
        trailer_url=data.get('trailer_url'),
        language=data.get('language'),
        director=data.get('director'),
        cast=data.get('cast'),
        is_currently_playing=data.get('is_currently_playing', True)
    )
    db.session.add(movie)
    db.session.commit()
    return jsonify({'id': movie.id, 'message': 'Movie created'}), 201

@admin_bp.route('/movies/<int:movie_id>', methods=['PUT'])
@admin_required
def update_movie(movie_id):
    """FR18.2: Edit movie"""
    movie = Movie.query.get_or_404(movie_id)
    data = request.json
    
    for key, value in data.items():
        if hasattr(movie, key):
            setattr(movie, key, value)
    
    db.session.commit()
    return jsonify({'message': 'Movie updated'})

@admin_bp.route('/movies/<int:movie_id>', methods=['DELETE'])
@admin_required
def delete_movie(movie_id):
    """FR18.1: Remove movie"""
    movie = Movie.query.get_or_404(movie_id)
    movie.is_active = False
    db.session.commit()
    return jsonify({'message': 'Movie removed'})

@admin_bp.route('/showtimes', methods=['POST'])
@admin_required
def create_showtime():
    """Add showtime"""
    data = request.json
    showtime = Showtime(
        movie_id=data['movie_id'],
        theater_id=data['theater_id'],
        start_time=datetime.fromisoformat(data['start_time']),
        price=data['price']
    )
    db.session.add(showtime)
    db.session.commit()
    return jsonify({'id': showtime.id, 'message': 'Showtime created'}), 201

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users():
    """View all users"""
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'name': u.name,
        'email': u.email,
        'is_admin': u.is_admin,
        'total_bookings': len(u.bookings)
    } for u in users])

