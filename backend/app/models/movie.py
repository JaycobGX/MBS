from app.extensions import db

class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    genre = db.Column(db.String(100))
    duration = db.Column(db.Integer)  # in minutes
    description = db.Column(db.Text)
    release_date = db.Column(db.Date)
    poster_url = db.Column(db.String(300))
    rating = db.Column(db.Float)  # IMDB or internal rating
    is_upcoming = db.Column(db.Boolean, default=False)

    # For convenience when returning JSON
    def as_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "duration": self.duration,
            "description": self.description,
            "release_date": self.release_date.isoformat() if self.release_date else None,
            "poster_url": self.poster_url,
            "rating": self.rating,
            "is_upcoming": self.is_upcoming
        }
