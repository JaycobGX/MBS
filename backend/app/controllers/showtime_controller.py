from app.extensions import db
from app.models.showtime import Showtime
from datetime import datetime

# 1. Add a new showtime
def add_showtime(data):
    """
    Expected fields:
    movie_id, theater_name, start_time (YYYY-MM-DD HH:MM), price
    """

    try:
        start_time = datetime.strptime(data["start_time"], "%Y-%m-%d %H:%M")
    except Exception:
        raise ValueError("Invalid datetime format — expected 'YYYY-MM-DD HH:MM'")

    showtime = Showtime(
        movie_id=data["movie_id"],
        theater_name=data["theater_name"],
        start_time=start_time,
        price=data["price"]
    )

    db.session.add(showtime)
    db.session.commit()
    return showtime

# 2. Get showtimes for a movie
def get_showtimes_for_movie(movie_id):
    return Showtime.query.filter_by(movie_id=movie_id).all()


# 3. Update a showtime
def update_showtime(showtime_id, data):
    showtime = Showtime.query.get(showtime_id)
    if not showtime:
        return None

    if "start_time" in data:
        try:
            data["start_time"] = datetime.strptime(data["start_time"], "%Y-%m-%d %H:%M")
        except:
            raise ValueError("Invalid datetime — expected 'YYYY-MM-DD HH:MM'")

    for key, value in data.items():
        if hasattr(showtime, key):
            setattr(showtime, key, value)

    db.session.commit()
    return showtime

# 4. Delete a showtime
def delete_showtime(showtime_id):
    showtime = Showtime.query.get(showtime_id)
    if not showtime:
        return False

    db.session.delete(showtime)
    db.session.commit()
    return True
