from extensions import db

class Theater(db.Model):
    __tablename__ = 'theaters'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200))
    total_seats = db.Column(db.Integer, nullable=False)
    
    # Relationships
    showtimes = db.relationship('Showtime', backref='theater', lazy=True, cascade='all, delete-orphan')