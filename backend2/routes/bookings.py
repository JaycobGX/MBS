from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from extensions import db
from models.booking import Booking
from models.showtime import Showtime
from utils.payment import simulate_payment_processing

bookings_bp = Blueprint('bookings', __name__, url_prefix='/api/bookings')

@bookings_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    """FR12.1, FR12.2: Create booking"""
    user_id = get_jwt_identity()
    data = request.json
    
    showtime = Showtime.query.get_or_404(data['showtime_id'])
    num_seats = data['num_seats']
    
    # FR12.2: Max 10 seats
    if num_seats > 10:
        return jsonify({'error': 'Maximum 10 seats allowed'}), 400
    
    # FR7.2: No advance booking for upcoming
    if not showtime.movie.is_currently_playing:
        return jsonify({'error': 'Cannot book upcoming movies in advance'}), 400
    
    # Check availability
    booked = sum(b.num_seats for b in showtime.bookings if b.status in ['pending', 'confirmed'])
    if showtime.theater.total_seats - booked < num_seats:
        return jsonify({'error': 'Not enough seats available'}), 400
    
    booking = Booking(
        user_id=user_id,
        showtime_id=showtime.id,
        num_seats=num_seats,
        total_price=showtime.price * num_seats
    )
    
    db.session.add(booking)
    db.session.commit()
    
    return jsonify({
        'id': booking.id,
        'message': 'Booking created',
        'confirmation': {
            'movie': showtime.movie.title,
            'showtime': showtime.start_time.isoformat(),
            'theater': showtime.theater.name,
            'num_seats': num_seats,
            'total_price': booking.total_price
        }
    }), 201

@bookings_bp.route('/<int:booking_id>/payment', methods=['POST'])
@jwt_required()
def process_payment(booking_id):
    """FR13.1: Process payment"""
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    
    if booking.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.json
    payment_method = data.get('payment_method')
    
    if payment_method not in ['venmo', 'paypal', 'card']:
        return jsonify({'error': 'Invalid payment method'}), 400
    
    try:
        payment_success = simulate_payment_processing(payment_method, booking.total_price, data)
        
        if payment_success:
            booking.payment_status = 'completed'
            booking.status = 'confirmed'
            booking.payment_method = payment_method
            booking.payment_id = f"{payment_method.upper()}_{booking_id}_{int(datetime.utcnow().timestamp())}"
            db.session.commit()
            
            return jsonify({'success': True, 'payment_id': booking.payment_id})
        else:
            booking.payment_status = 'failed'
            db.session.commit()
            return jsonify({'success': False, 'error': 'Payment failed'}), 402
    except Exception:
        return jsonify({'error': 'Payment system error'}), 500

@bookings_bp.route('', methods=['GET'])
@jwt_required()
def get_user_bookings():
    """FR14.2: View booking history"""
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).order_by(Booking.booking_time.desc()).all()
    
    return jsonify([{
        'id': b.id,
        'movie_title': b.showtime.movie.title,
        'theater_name': b.showtime.theater.name,
        'showtime': b.showtime.start_time.isoformat(),
        'num_seats': b.num_seats,
        'total_price': b.total_price,
        'status': b.status,
        'payment_status': b.payment_status
    } for b in bookings])

@bookings_bp.route('/<int:booking_id>/ticket', methods=['GET'])
@jwt_required()
def get_ticket(booking_id):
    """FR14.3, FR14.4: Get digital ticket"""
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    
    if booking.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    return jsonify({
        'ticket_id': f"TKT-{booking.id}",
        'qr_data': f"TICKET:{booking.id}:{booking.payment_id}",
        'barcode': f"{booking.id:012d}",
        'movie': booking.showtime.movie.title,
        'theater': booking.showtime.theater.name,
        'showtime': booking.showtime.start_time.isoformat(),
        'seats': booking.num_seats
    })

@bookings_bp.route('/<int:booking_id>/abandon', methods=['POST'])
@jwt_required()
def abandon_booking(booking_id):
    """Allow abandoning unpaid booking"""
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    
    if booking.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    if booking.payment_status == 'completed':
        return jsonify({'error': 'Cannot abandon paid booking'}), 400
    
    booking.status = 'cancelled'
    booking.payment_status = 'abandoned'
    db.session.commit()
    
    return jsonify({'message': 'Booking abandoned'})