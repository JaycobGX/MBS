# seed_database.py
# Run this to populate your database with movies, theaters, showtimes, and users

from app import create_app
from extensions import db
from models.user import User
from models.movie import Movie
from models.theater import Theater
from models.showtime import Showtime
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta

app = create_app()

with app.app_context():
    # Clear existing data (optional - uncomment if you want fresh start)
    # db.drop_all()
    # db.create_all()
    
    print("🎬 Starting database seeding...")
    
    # ==================== ADD THEATERS ====================
    print("📍 Adding theaters...")
    theaters = [
        Theater(name='Cinema Lubbock', location='Lubbock, TX', total_seats=150),
        Theater(name='Cinema Amarillo', location='Amarillo, TX', total_seats=200),
        Theater(name='Cinema Levelland', location='Levelland, TX', total_seats=120),
        Theater(name='Cinema Plainview', location='Plainview, TX', total_seats=180),
        Theater(name='Cinema Snyder', location='Snyder, TX', total_seats=100),
        Theater(name='Cinema Abilene', location='Abilene, TX', total_seats=250),
    ]
    
    for theater in theaters:
        db.session.add(theater)
    db.session.commit()
    print(f"Added {len(theaters)} theaters")
    
    # ==================== ADD MOVIES ====================
    print("Adding movies")
    
    movies_data = [
        # CURRENTLY PLAYING MOVIES
        {
            'title': 'The Amazing Spider-Man',
            'description': 'Peter Parker finds a clue that might help him understand why his parents disappeared when he was young. His path puts him on a collision course with Dr. Curt Connors, his father\'s former partner.',
            'duration': 136,
            'genre': 'Action',
            'rating': 'PG-13',
            'release_date': datetime(2012, 7, 3).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/fSbqPbqXa4wXXSlJlXMIzJAk7zH.jpg',
            'language': 'English',
            'director': 'Marc Webb',
            'cast': 'Andrew Garfield, Emma Stone, Rhys Ifans, Denis Leary',
            'is_currently_playing': True
        },
        {
            'title': 'The Amazing Spider-Man 2',
            'description': 'When New York is put under siege by Oscorp, it is up to Spider-Man to save the city he swore to protect as well as his loved ones.',
            'duration': 142,
            'genre': 'Action',
            'rating': 'PG-13',
            'release_date': datetime(2014, 5, 2).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/c3e9e18SSlvFd1cQaGmUj5tqL5P.jpg',
            'language': 'English',
            'director': 'Marc Webb',
            'cast': 'Andrew Garfield, Emma Stone, Jamie Foxx, Dane DeHaan',
            'is_currently_playing': True
        },
        {
            'title': 'Spider-Man: No Way Home',
            'description': 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.',
            'duration': 148,
            'genre': 'Action',
            'rating': 'PG-13',
            'release_date': datetime(2021, 12, 17).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
            'language': 'English',
            'director': 'Jon Watts',
            'cast': 'Tom Holland, Zendaya, Benedict Cumberbatch, Andrew Garfield',
            'is_currently_playing': True
        },
        {
            'title': 'Avengers: Endgame',
            'description': 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
            'duration': 181,
            'genre': 'Action',
            'rating': 'PG-13',
            'release_date': datetime(2019, 4, 26).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
            'language': 'English',
            'director': 'Anthony Russo, Joe Russo',
            'cast': 'Robert Downey Jr., Chris Evans, Scarlett Johansson, Chris Hemsworth',
            'is_currently_playing': True
        },
        {
            'title': 'The Matrix',
            'description': 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
            'duration': 136,
            'genre': 'Sci-Fi',
            'rating': 'R',
            'release_date': datetime(1999, 3, 31).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
            'language': 'English',
            'director': 'Lana Wachowski, Lilly Wachowski',
            'cast': 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
            'is_currently_playing': True
        },
        {
            'title': 'Oppenheimer',
            'description': 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
            'duration': 180,
            'genre': 'Drama',
            'rating': 'R',
            'release_date': datetime(2023, 7, 21).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
            'language': 'English',
            'director': 'Christopher Nolan',
            'cast': 'Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.',
            'is_currently_playing': True
        },
        {
            'title': 'Barbie',
            'description': 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
            'duration': 114,
            'genre': 'Comedy',
            'rating': 'PG-13',
            'release_date': datetime(2023, 7, 21).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
            'language': 'English',
            'director': 'Greta Gerwig',
            'cast': 'Margot Robbie, Ryan Gosling, America Ferrera, Kate McKinnon',
            'is_currently_playing': True
        },
        {
            'title': 'Dune: Part Two',
            'description': 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
            'duration': 166,
            'genre': 'Sci-Fi',
            'rating': 'PG-13',
            'release_date': datetime(2024, 3, 1).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
            'language': 'English',
            'director': 'Denis Villeneuve',
            'cast': 'Timothée Chalamet, Zendaya, Rebecca Ferguson, Josh Brolin',
            'is_currently_playing': True
        },
        {
            'title': 'Joker',
            'description': 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and crime.',
            'duration': 122,
            'genre': 'Thriller',
            'rating': 'R',
            'release_date': datetime(2019, 10, 4).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
            'language': 'English',
            'director': 'Todd Phillips',
            'cast': 'Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy',
            'is_currently_playing': True
        },
        {
            'title': 'Guardians of the Galaxy Vol. 3',
            'description': 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.',
            'duration': 150,
            'genre': 'Action',
            'rating': 'PG-13',
            'release_date': datetime(2023, 5, 5).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
            'language': 'English',
            'director': 'James Gunn',
            'cast': 'Chris Pratt, Zoe Saldana, Dave Bautista, Karen Gillan',
            'is_currently_playing': True
        },
        
       
        {
            'title': 'Deadpool 3',
            'description': 'The third installment of the Deadpool franchise with Wolverine joining the adventure.',
            'duration': 127,
            'genre': 'Action',
            'rating': 'R',
            'release_date': datetime(2025, 7, 26).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/placeholder_deadpool3.jpg',
            'language': 'English',
            'director': 'Shawn Levy',
            'cast': 'Ryan Reynolds, Hugh Jackman, Emma Corrin',
            'is_currently_playing': False
        },
        {
            'title': 'Avatar 3',
            'description': 'The third installment in the Avatar franchise continues the story of the Sully family.',
            'duration': 190,
            'genre': 'Sci-Fi',
            'rating': 'PG-13',
            'release_date': datetime(2025, 12, 19).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/placeholder_avatar3.jpg',
            'language': 'English',
            'director': 'James Cameron',
            'cast': 'Sam Worthington, Zoe Saldana, Sigourney Weaver',
            'is_currently_playing': False
        },
        {
            'title': 'The Batman Part II',
            'description': 'The sequel to The Batman continues the dark knight\'s journey through Gotham.',
            'duration': 170,
            'genre': 'Action',
            'rating': 'PG-13',
            'release_date': datetime(2026, 10, 2).date(),
            'poster_url': 'https://image.tmdb.org/t/p/w500/placeholder_batman2.jpg',
            'language': 'English',
            'director': 'Matt Reeves',
            'cast': 'Robert Pattinson, Zoë Kravitz, Colin Farrell',
            'is_currently_playing': False
        },
        
    ]
    
    movies = []
    for movie_data in movies_data:
        movie = Movie(**movie_data)
        movies.append(movie)
        db.session.add(movie)
    
    db.session.commit()
    print(f" Added {len(movies)} movies")
    
    # ==================== ADD SHOWTIMES ====================
    print(" Adding showtimes...")
    
    base_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    times = [
        (12, 0),   # 12:00 PM
        (14, 30),  # 2:30 PM
        (17, 0),   # 5:00 PM
        (19, 30),  # 7:30 PM
        (22, 0),   # 10:00 PM
    ]
    
    showtime_count = 0
    # Add showtimes only for currently playing movies
    for movie in movies:
        if movie.is_currently_playing:
            # Add showtimes to 3 random theaters
            for theater_idx in [0, 2, 4]:  # Lubbock, Levelland, Snyder
                for hour, minute in times[:3]:  # 3 showtimes per theater
                    showtime = Showtime(
                        movie_id=movie.id,
                        theater_id=theaters[theater_idx].id,
                        start_time=base_date + timedelta(hours=hour, minutes=minute),
                        price=round(10.0 + (theater_idx * 1.5), 2)
                    )
                    db.session.add(showtime)
                    showtime_count += 1
    
    db.session.commit()
    print(f"Added {showtime_count} showtimes")
    
    # ==================== ADD USERS ====================
    print("👥 Adding users")
    
    users_data = [
        {
            'name': 'Admin User',
            'email': 'admin@moviebooking.com',
            'password': 'admin123',
            'phone': '8061234567',
            'address': '123 Admin St, Lubbock, TX',
            'is_admin': True
        },
        {
            'name': 'John Doe',
            'email': 'john@example.com',
            'password': 'password123',
            'phone': '8065551234',
            'address': '456 Main St, Lubbock, TX',
            'is_admin': False
        },
        {
            'name': 'Jane Smith',
            'email': 'jane@example.com',
            'password': 'password123',
            'phone': '8065555678',
            'address': '789 Oak Ave, Amarillo, TX',
            'is_admin': False
        },
        {
            'name': 'Mike Johnson',
            'email': 'mike@example.com',
            'password': 'password123',
            'phone': '8065559999',
            'address': '321 Elm St, Levelland, TX',
            'is_admin': False
        }
    ]
    
    for user_data in users_data:
        password = user_data.pop('password')
        user = User(
            **user_data,
            password_hash=generate_password_hash(password)
        )
        db.session.add(user)
    
    db.session.commit()
    print(f"Added {len(users_data)} users")
    
    # ==================== SUMMARY ====================
    print("\n" + "="*50)
    print("DATABASE SEEDING COMPLETED!")
    print("="*50)
    print(f"Summary:")
    print(f"   - Theaters: {len(theaters)}")
    print(f"   - Movies: {len(movies)}")
    print(f"   - Showtimes: {showtime_count}")
    print(f"   - Users: {len(users_data)}")
    print("\n Test Login Credentials:")
    print("   Admin:")
    print("      Email: admin@moviebooking.com")
    print("      Password: admin123")
    print("\n   Regular User:")
    print("      Email: john@example.com")
    print("      Password: password123")
    print("="*50)
    print("\n You can now run: python3 app.py")
    print("Then visit: http://localhost:5000/api/movies\n")