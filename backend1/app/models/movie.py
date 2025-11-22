from datetime import datetime
from enum import Enum

from ..extensions import db


class MovieStatus(str, Enum):
    CURRENT = "current"
    UPCOMING = "upcoming"


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    synopsis = db.Column(db.Text, nullable=True)
    genre = db.Column(db.String(100), nullable=True)
    duration_minutes = db.Column(db.Integer, nullable=True)
    cast = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Float, nullable=True)  # avg user rating
    status = db.Column(db.Enum(MovieStatus), nullable=False, default=MovieStatus.CURRENT)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    showtimes = db.relationship("Showtime", back_populates="movie", lazy="dynamic")
    reviews = db.relationship("Review", back_populates="movie", lazy="dynamic")
