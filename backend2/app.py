from flask import Flask
from config import Config
from extensions import db, cors, jwt

def create_app(config_class=Config):
    """Application factory"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)
    
    # Register blueprints
    from routes import auth_bp, movies_bp, bookings_bp, reviews_bp, admin_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(movies_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(admin_bp)
    
    # Additional routes
    @app.route('/api/theaters', methods=['GET'])
    def get_theaters():
        from models.theater import Theater
        theaters = Theater.query.all()
        return {'theaters': [{
            'id': t.id,
            'name': t.name,
            'location': t.location,
            'total_seats': t.total_seats
        } for t in theaters]}
    
    @app.route('/api/showtimes', methods=['GET'])
    def get_showtimes():
        from models.showtime import Showtime
        from flask import request
        from datetime import datetime, timedelta
        
        movie_id = request.args.get('movie_id', type=int)
        date = request.args.get('date')
        
        query = Showtime.query
        if movie_id:
            query = query.filter_by(movie_id=movie_id)
        if date:
            start = datetime.strptime(date, '%Y-%m-%d')
            end = start + timedelta(days=1)
            query = query.filter(Showtime.start_time >= start, Showtime.start_time < end)
        
        showtimes = query.all()
        return {'showtimes': [{
            'id': s.id,
            'movie_title': s.movie.title,
            'theater_name': s.theater.name,
            'start_time': s.start_time.isoformat(),
            'price': s.price
        } for s in showtimes]}
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)