-- seed_data.sql
-- Run this to populate database with sample data

USE movie_booking;

-- Insert Theaters (6 locations per SRS)
INSERT INTO theaters (name, location, total_seats) VALUES
('Cinema Lubbock', 'Lubbock, TX', 150),
('Cinema Amarillo', 'Amarillo, TX', 200),
('Cinema Levelland', 'Levelland, TX', 120),
('Cinema Plainview', 'Plainview, TX', 180),
('Cinema Snyder', 'Snyder, TX', 100),
('Cinema Abilene', 'Abilene, TX', 250);

-- Insert Movies
INSERT INTO movies (title, description, duration, genre, rating, release_date, poster_url, language, director, cast, is_currently_playing) VALUES
('Dune: Part Two', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 166, 'Sci-Fi', 'PG-13', '2024-03-01', 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg', 'English', 'Denis Villeneuve', 'Timothée Chalamet, Zendaya, Rebecca Ferguson', TRUE),

('Oppenheimer', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 180, 'Drama', 'R', '2023-07-21', 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', 'English', 'Christopher Nolan', 'Cillian Murphy, Emily Blunt, Matt Damon', TRUE),

('The Batman', 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city''s hidden corruption.', 176, 'Action', 'PG-13', '2022-03-04', 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', 'English', 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Jeffrey Wright', TRUE),

('Spider-Man: Across the Spider-Verse', 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.', 140, 'Action', 'PG', '2023-06-02', 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', 'English', 'Joaquim Dos Santos', 'Shameik Moore, Hailee Steinfeld, Oscar Isaac', TRUE),

('Barbie', 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.', 114, 'Comedy', 'PG-13', '2023-07-21', 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', 'English', 'Greta Gerwig', 'Margot Robbie, Ryan Gosling, America Ferrera', TRUE),

('The Marvels', 'Carol Danvers gets her powers entangled with those of Kamala Khan and Monica Rambeau.', 105, 'Action', 'PG-13', '2023-11-10', 'https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdkpDz3m3Cj3KR.jpg', 'English', 'Nia DaCosta', 'Brie Larson, Teyonah Parris, Iman Vellani', TRUE),

('Killers of the Flower Moon', 'Members of the Osage tribe in the United States are murdered under mysterious circumstances.', 206, 'Drama', 'R', '2023-10-20', 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg', 'English', 'Martin Scorsese', 'Leonardo DiCaprio, Robert De Niro, Lily Gladstone', TRUE),

('Avatar 3', 'The continuation of the Avatar saga with the Sully family.', 190, 'Sci-Fi', 'PG-13', '2025-12-20', 'https://image.tmdb.org/t/p/w500/placeholder.jpg', 'English', 'James Cameron', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', FALSE),

('Mission: Impossible 8', 'Ethan Hunt and his team embark on their most dangerous mission yet.', 163, 'Action', 'PG-13', '2025-05-23', 'https://image.tmdb.org/t/p/w500/placeholder.jpg', 'English', 'Christopher McQuarrie', 'Tom Cruise, Rebecca Ferguson, Hayley Atwell', FALSE);

-- Insert Showtimes (multiple times for each movie at different theaters)
INSERT INTO showtimes (movie_id, theater_id, start_time, price) VALUES
-- Dune: Part Two showtimes
(1, 1, '2024-11-25 14:00:00', 12.50),
(1, 1, '2024-11-25 19:30:00', 15.00),
(1, 2, '2024-11-25 15:00:00', 12.50),
(1, 3, '2024-11-25 18:00:00', 11.00),

-- Oppenheimer showtimes
(2, 1, '2024-11-25 13:00:00', 13.00),
(2, 2, '2024-11-25 17:00:00', 13.00),
(2, 4, '2024-11-25 20:00:00', 14.00),

-- The Batman showtimes
(3, 1, '2024-11-25 16:00:00', 12.50),
(3, 3, '2024-11-25 19:00:00', 11.00),
(3, 5, '2024-11-25 21:00:00', 12.00),

-- Spider-Man showtimes
(4, 2, '2024-11-25 14:30:00', 13.50),
(4, 4, '2024-11-25 18:30:00', 13.50),
(4, 6, '2024-11-25 20:30:00', 14.50),

-- Barbie showtimes
(5, 1, '2024-11-25 12:00:00', 11.50),
(5, 3, '2024-11-25 17:30:00', 12.50),
(5, 5, '2024-11-25 19:30:00', 12.00);

-- Insert Admin User
INSERT INTO users (name, email, password_hash, phone, address, is_admin) VALUES
('Admin User', 'admin@moviebooking.com', 'scrypt:32768:8:1$gQ8PK9XGHjqZMJLf$2c9f0c8e8f8a3b5c7d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', '1234567890', '123 Admin St, Lubbock, TX', TRUE);
-- Password is: admin123

-- Insert Regular Test Users
INSERT INTO users (name, email, password_hash, phone, address, is_admin) VALUES
('John Doe', 'john@example.com', 'scrypt:32768:8:1$gQ8PK9XGHjqZMJLf$2c9f0c8e8f8a3b5c7d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', '5551234567', '456 Main St, Lubbock, TX', FALSE),
('Jane Smith', 'jane@example.com', 'scrypt:32768:8:1$gQ8PK9XGHjqZMJLf$2c9f0c8e8f8a3b5c7d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d', '5559876543', '789 Oak Ave, Amarillo, TX', FALSE);
-- Password for both is: password123