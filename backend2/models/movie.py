from extensions import db

class Movie(db.Model):
    __tablename__ = 'movies'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    duration = db.Column(db.Integer)
    genre = db.Column(db.String(100))
    rating = db.Column(db.String(10))
    release_date = db.Column(db.Date)
    poster_url = db.Column(db.String(500))
    trailer_url = db.Column(db.String(500))
    language = db.Column(db.String(50))
    director = db.Column(db.String(100))
    cast = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    is_currently_playing = db.Column(db.Boolean, default=True)
    
    # Relationships
    showtimes = db.relationship('Showtime', backref='movie', lazy=True, cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref='movie', lazy=True, cascade='all, delete-orphan')
