from flask import Flask
from flask_cors import CORS
from app.extensions import db
from app.routes.movie_routes import movie_bp
from app.routes.admin_routes import admin_bp
from app.routes.showtime_routes import showtime_bp

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/mbs.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Register routes
    app.register_blueprint(movie_bp, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api")
    app.register_blueprint(showtime_bp, url_prefix="/api")

    return app
