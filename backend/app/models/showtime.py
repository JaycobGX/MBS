from app.extensions import db
from datetime import datetime

class Showtime(db.Model):
    __tablename__ = "showtimes"

    id = db.Column(db.Integer, primary_key=True)
    
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
    theater_name = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # Relationship (optional but useful)
    movie = db.relationship("Movie", backref="showtimes", lazy=True)

    def as_dict(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "theater_name": self.theater_name,
            "start_time": self.start_time.isoformat(),
            "price": self.price
        }
