from extensions import db

class Showtime(db.Model):
    __tablename__ = 'showtimes'
    
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    theater_id = db.Column(db.Integer, db.ForeignKey('theaters.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    # Relationships
    bookings = db.relationship('Booking', backref='showtime', lazy=True, cascade='all, delete-orphan')
