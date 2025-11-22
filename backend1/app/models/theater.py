from ..extensions import db


class Theater(db.Model):
    __tablename__ = "theaters"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)

    showtimes = db.relationship("Showtime", back_populates="theater", lazy="dynamic")
