from datetime import datetime

from ..extensions import db


class Showtime(db.Model):
    __tablename__ = "showtimes"

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
    theater_id = db.Column(db.Integer, db.ForeignKey("theaters.id"), nullable=False)

    start_time = db.Column(db.DateTime, nullable=False)
    ticket_price = db.Column(db.Numeric(8, 2), nullable=False)

    total_seats = db.Column(db.Integer, nullable=False, default=100)
    available_seats = db.Column(db.Integer, nullable=False, default=100)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    movie = db.relationship("Movie", back_populates="showtimes")
    theater = db.relationship("Theater", back_populates="showtimes")
    bookings = db.relationship("Booking", back_populates="showtime", lazy="dynamic")
