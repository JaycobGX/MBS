from app import create_app
from app.extensions import db
from app.models.movie import Movie
from app.models.showtime import Showtime
from datetime import datetime, timedelta

app = create_app()

# SAMPLE MOVIES
movies_data = [
    {
        "title": "Avatar: The Way of Water",
        "genre": "Action, Sci-Fi",
        "duration": 192,
        "description": "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
        "release_date": "2023-01-01",
        "poster_url": "https://example.com/avatar.jpg",
        "rating": 8.2,
        "is_upcoming": False
    },
    {
        "title": "Inside Out 2",
        "genre": "Animation, Family",
        "duration": 110,
        "description": "Riley's emotions experience new changes as she becomes a teenager.",
        "release_date": "2024-06-15",
        "poster_url": "https://example.com/out2.jpg",
        "rating": 7.5,
        "is_upcoming": False
    },
    {
        "title": "Deadpool 3",
        "genre": "Action, Comedy",
        "duration": 125,
        "description": "Deadpool teams up with Wolverine in a multiverse adventure.",
        "release_date": "2025-05-20",
        "poster_url": "https://example.com/deadpool3.jpg",
        "rating": 8.7,
        "is_upcoming": True
    }
]

# SAMPLE SHOWTIMES
def generate_showtimes(movie_id):
    showtimes = []
    base_time = datetime.now().replace(hour=15, minute=0, second=0, microsecond=0)

    for i in range(3):
        showtimes.append(
            Showtime(
                movie_id=movie_id,
                theater_name=f"Hall {movie_id}-{i+1}",
                start_time=base_time + timedelta(hours=i * 2),
                price=12.99
            )
        )
    return showtimes


with app.app_context():
    # Clean old data
    db.drop_all()
    db.create_all()

    # Insert movies
    movies = []
    for m in movies_data:
        movie = Movie(
            title=m["title"],
            genre=m["genre"],
            duration=m["duration"],
            description=m["description"],
            release_date=datetime.strptime(m["release_date"], "%Y-%m-%d").date(),
            poster_url=m["poster_url"],
            rating=m["rating"],
            is_upcoming=m["is_upcoming"]
        )
        db.session.add(movie)
        movies.append(movie)

    db.session.commit()

    # Insert showtimes
    for movie in movies:
        showtimes = generate_showtimes(movie.id)
        db.session.add_all(showtimes)

    db.session.commit()

    print("Sample data inserted successfully!")
