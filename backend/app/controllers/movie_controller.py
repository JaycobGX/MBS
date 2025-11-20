from app.extensions import db
from app.models.movie import Movie
from datetime import datetime

# 1. Add a new movie
def add_movie(data):
    """
    data is expected to be a dictionary containing:
    title, genre, duration, description, release_date, poster_url, rating, is_upcoming
    """

    # Convert date string to Python date
    release_date = None
    if data.get("release_date"):
        try:
            release_date = datetime.strptime(data["release_date"], "%Y-%m-%d").date()
        except Exception:
            raise ValueError("Invalid date format — use YYYY-MM-DD")

    movie = Movie(
        title=data.get("title"),
        genre=data.get("genre"),
        duration=data.get("duration"),
        description=data.get("description"),
        release_date=release_date,
        poster_url=data.get("poster_url"),
        rating=data.get("rating"),
        is_upcoming=data.get("is_upcoming", False)
    )

    db.session.add(movie)
    db.session.commit()
    return movie

# 2. Update movie by ID
def update_movie(movie_id, data):
    movie = Movie.query.get(movie_id)
    if not movie:
        return None

    for key, value in data.items():
        if hasattr(movie, key):
            if key == "release_date" and value:
                try:
                    value = datetime.strptime(value, "%Y-%m-%d").date()
                except:
                    raise ValueError("Invalid date format — use YYYY-MM-DD")
            setattr(movie, key, value)

    db.session.commit()
    return movie

# 3. Delete a movie
def delete_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if not movie:
        return False

    db.session.delete(movie)
    db.session.commit()
    return True

# 4. Get ALL movies
def get_all_movies():
    return Movie.query.all()

# 5. Get ONE movie by ID
def get_movie_by_id(movie_id):
    return Movie.query.get(movie_id)

# 6. Search movies (by title or genre)
def search_movies(keyword):
    keyword = f"%{keyword}%"
    return Movie.query.filter(
        (Movie.title.ilike(keyword)) |
        (Movie.genre.ilike(keyword))
    ).all()

# 7. Upcoming movies
def get_upcoming_movies():
    return Movie.query.filter_by(is_upcoming=True).all()

# 8. Now showing movies
def get_now_showing_movies():
    return Movie.query.filter_by(is_upcoming=False).all()
