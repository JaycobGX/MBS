from routes.auth import auth_bp
from routes.movies import movies_bp
from routes.bookings import bookings_bp
from routes.reviews import reviews_bp
from routes.admin import admin_bp

__all__ = ['auth_bp', 'movies_bp', 'bookings_bp', 'reviews_bp', 'admin_bp']
