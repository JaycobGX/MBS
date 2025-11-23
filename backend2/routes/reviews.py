from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.review import Review
from models.booking import Booking
from models.showtime import Showtime

reviews_bp = Blueprint('reviews', __name__, url_prefix='/api/movies')

@reviews_bp.route('/<int:movie_id>/reviews', methods=['GET'])
def get_reviews(movie_id):
    """Get movie reviews"""
    reviews = Review.query.filter_by(movie_id=movie_id).order_by(Review.created_at.desc()).all()
    
    return jsonify([{
        'id': r.id,
        'user_name': r.user.name,
        'rating': r.rating,
        'comment': r.comment,
        'created_at': r.created_at.isoformat()
    } for r in reviews])

@reviews_bp.route('/<int:movie_id>/reviews', methods=['POST'])
@jwt_required()
def create_review(movie_id):
    """FR11.1: Only confirmed bookings can review"""
    user_id = get_jwt_identity()
    data = request.json
    
    # Check for confirmed booking
    has_booking = Booking.query.join(Showtime).filter(
        Booking.user_id == user_id,
        Showtime.movie_id == movie_id,
        Booking.status == 'confirmed'
    ).first()
    
    if not has_booking:
        return jsonify({'error': 'Only users with confirmed bookings can review'}), 403
    
    existing = Review.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if existing:
        return jsonify({'error': 'Already reviewed'}), 400
    
    review = Review(
        user_id=user_id,
        movie_id=movie_id,
        rating=data['rating'],
        comment=data.get('comment')
    )
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({'id': review.id, 'message': 'Review added'}), 201

