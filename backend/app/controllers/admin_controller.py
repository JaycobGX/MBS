from app.extensions import db
from app.models.movie import Movie
from app.models.showtime import Showtime

# 1. BASIC DASHBOARD METRICS
def get_basic_stats():
    total_movies = Movie.query.count()
    total_showtimes = Showtime.query.count()

    return {
        "total_movies": total_movies,
        "total_showtimes": total_showtimes,
        # Booking + Revenue will be added later after your teammate finishes booking/payment
    }

# 2. ADMIN: Add Movie (wrapper)
from app.controllers.movie_controller import add_movie, update_movie, delete_movie

def admin_add_movie(data):
    """
    Uses the existing movie controller logic.
    Admin permission check will be added later in the route.
    """
    return add_movie(data)

# 3. ADMIN: Update Movie
def admin_update_movie(movie_id, data):
    return update_movie(movie_id, data)

# 4. ADMIN: Delete Movie
def admin_delete_movie(movie_id):
    return delete_movie(movie_id)

# 5. ADMIN: Add Showtime
from app.controllers.showtime_controller import add_showtime, update_showtime, delete_showtime

def admin_add_showtime(data):
    return add_showtime(data)

# 6. ADMIN: Update Showtime
def admin_update_showtime(showtime_id, data):
    return update_showtime(showtime_id, data)

# 7. ADMIN: Delete Showtime
def admin_delete_showtime(showtime_id):
    return delete_showtime(showtime_id)

# 8. ADMIN: List All Showtimes
def admin_list_showtimes():
    return Showtime.query.order_by(Showtime.start_time.asc()).all()
