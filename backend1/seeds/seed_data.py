from datetime import datetime, timedelta

from app import create_app
from app.extensions import db
from app.models.user import User, UserRole
from app.models.movie import Movie, MovieStatus
from app.models.theater import Theater
from app.models.showtime import Showtime
from app.utils.security import hash_password


def seed():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        admin = User(
            full_name="Admin User",
            email="admin@mbs.com",
            password_hash=hash_password("admin123"),
            role=UserRole.ADMIN,
        )
        db.session.add(admin)

        cities = [
            "Lubbock",
            "Amarillo",
            "Levelland",
            "Plainview",
            "Snyder",
            "Abilene",
        ]
        theaters = []
        for c in cities:
            t = Theater(name=f"{c} Cinema", city=c)
            theaters.append(t)
            db.session.add(t)

        m1 = Movie(
            title="Spider-Man: Into the Spider-Verse",
            genre="Animation",
            duration_minutes=117,
            status=MovieStatus.CURRENT,
        )
        m2 = Movie(
            title="Home Alone",
            genre="Comedy",
            duration_minutes=120,
            status=MovieStatus.UPCOMING,
        )
        db.session.add_all([m1, m2])
        db.session.flush()

        now = datetime.utcnow()
        for t in theaters:
            st = Showtime(
                movie_id=m1.id,
                theater_id=t.id,
                start_time=now + timedelta(hours=3),
                ticket_price=12.50,
                total_seats=100,
                available_seats=100,
            )
            db.session.add(st)

        db.session.commit()
        print("Seeded database!")


if __name__ == "__main__":
    seed()
