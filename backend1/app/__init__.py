from flask import Flask
from config import Config
from .extensions import db, migrate, jwt, cors

# Import models so Alembic/Flask-Migrate can see them
from .models import user, movie, theater, showtime, booking, review  # noqa: F401


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, origins=app.config["ALLOWED_ORIGINS"].split(","))

    # Register blueprints
    from .routes.auth_routes import auth_bp
    from .routes.user_routes import user_bp
    from .routes.movie_routes import movie_bp
    from .routes.booking_routes import booking_bp
    from .routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(movie_bp, url_prefix="/api/movies")
    app.register_blueprint(booking_bp, url_prefix="/api/bookings")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    @app.route("/api/health")
    def health():
        return {"status": "ok"}

    return app
