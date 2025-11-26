--  FULL POPULATE SCRIPT FOR MBS DATABASE
--  Includes: Theaters, Movies (with cast, rating, image URL),
--            Showtimes for movies 1–6

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS mbs_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE mbs_db;

-- CLEAN EXISTING DATA
DELETE FROM showtimes;
DELETE FROM bookings;
DELETE FROM reviews;
DELETE FROM movies;
DELETE FROM theaters;

ALTER TABLE theaters AUTO_INCREMENT = 1;
ALTER TABLE movies AUTO_INCREMENT = 1;
ALTER TABLE showtimes AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- INSERT THEATERS (3)
INSERT INTO theaters (name, city) VALUES
  ('Lubbock Cinema', 'Lubbock'),
  ('Amarillo Plaza', 'Amarillo'),
  ('Midland Screens', 'Midland');

-- INSERT MOVIES (12)
INSERT INTO movies (
  title, synopsis, genre, duration_minutes, cast, rating, image_url, status
) VALUES

('Dune: Part Two',
 'Paul Atreides unites with the Fremen to fight House Harkonnen.',
 'Sci-Fi',
 165,
 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
 8.8,
 'https://image.tmdb.org/t/p/w500/8b8R8l88Q7cIlZJOXvvrqOAaQzl.jpg',
 'current'),

('Inside Out 2',
 'Riley faces new emotions as she enters high school.',
 'Animation',
 100,
 'Amy Poehler, Maya Hawke, Phyllis Smith',
 7.9,
 'https://image.tmdb.org/t/p/w500/jB622J02vDxQ9S84F9Jx8wytB5.jpg',
 'current'),

('Oppenheimer',
 'The story of J. Robert Oppenheimer and the atomic bomb.',
 'Drama',
 180,
 'Cillian Murphy, Emily Blunt, Matt Damon',
 8.6,
 'https://image.tmdb.org/t/p/w500/ptpr0kGAckWrrJ4SY7S8A1ngBkn.jpg',
 'current'),

('Spider-Man: Across the Spider-Verse',
 'Miles and Gwen travel the multiverse of Spider-People.',
 'Animation',
 140,
 'Shameik Moore, Hailee Steinfeld, Oscar Isaac',
 8.7,
 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
 'current'),

('Barbie',
 'Barbie questions her perfect world and visits the real one.',
 'Comedy',
 114,
 'Margot Robbie, Ryan Gosling, America Ferrera',
 7.0,
 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
 'current'),

('The Batman',
 'Bruce Wayne faces the Riddler in a dark Gotham.',
 'Action',
 176,
 'Robert Pattinson, Zoë Kravitz, Paul Dano',
 7.8,
 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
 'current'),

('Avatar 3',
 'New adventures on Pandora with Jake and Neytiri.',
 'Sci-Fi',
 170,
 'Sam Worthington, Zoe Saldaña',
 0.0,
 'https://image.tmdb.org/t/p/w500/kHC2Z9Gk8Mo2i7P7h9tC4yv5vYr.jpg',
 'upcoming'),

('Frozen 3',
 'Anna and Elsa discover another mystery of Arendelle.',
 'Animation',
 110,
 'Kristen Bell, Idina Menzel',
 0.0,
 'https://image.tmdb.org/t/p/w500/2YD6eZ3NCErkelMo31pYSWdvSnV.jpg',
 'upcoming'),

('Mission: Impossible – Dead Reckoning Part Two',
 'Ethan Hunt faces his most dangerous mission yet.',
 'Action',
 155,
 'Tom Cruise, Hayley Atwell, Simon Pegg',
 0.0,
 'https://image.tmdb.org/t/p/w500/Af4bXE63pP3cJ7SXINEGzz8opfC.jpg',
 'upcoming'),

('Wicked',
 'The untold story of the witches of Oz.',
 'Musical',
 150,
 'Ariana Grande, Cynthia Erivo, Michelle Yeoh',
 0.0,
 'https://image.tmdb.org/t/p/w500/u0XUB5O2Eo07RNJIKyJdP7j4NQ8.jpg',
 'upcoming'),

('Gladiator II',
 'A new chapter in the Roman arena.',
 'Action',
 150,
 'Paul Mescal, Pedro Pascal, Denzel Washington',
 0.0,
 'https://image.tmdb.org/t/p/w500/cCNWt5g0yt7FfVX0hFcp2GIdGNg.jpg',
 'upcoming'),

('Deadpool & Wolverine',
 'Deadpool teams up with Wolverine on a multiverse mission.',
 'Action',
 127,
 'Ryan Reynolds, Hugh Jackman, Emma Corrin',
 0.0,
 'https://image.tmdb.org/t/p/w500/8tJwhEcu1MRv2sgV2vNhbbX6wuW.jpg',
 'upcoming');

-- INSERT SHOWTIMES (MOVIES 1–6)

-- Dune (1)
INSERT INTO showtimes (movie_id, theater_id, start_time, ticket_price, total_seats, available_seats) VALUES
(1, 1, '2025-11-25 14:00:00', 12.50, 120, 120),
(1, 1, '2025-11-25 19:00:00', 14.00, 120, 120),
(1, 2, '2025-11-25 15:00:00', 12.00, 110, 110),
(1, 2, '2025-11-25 20:30:00', 14.00, 110, 110),
(1, 3, '2025-11-25 16:00:00', 11.50, 100, 100),
(1, 3, '2025-11-25 21:00:00', 13.50, 100, 100);

-- Inside Out 2 (2)
INSERT INTO showtimes (movie_id, theater_id, start_time, ticket_price, total_seats, available_seats) VALUES
(2, 1, '2025-11-26 13:00:00', 10.00, 100, 100),
(2, 1, '2025-11-26 17:00:00', 11.00, 100, 100),
(2, 2, '2025-11-26 14:30:00', 10.50, 90, 90),
(2, 2, '2025-11-26 18:30:00', 11.50, 90, 90),
(2, 3, '2025-11-26 15:00:00', 9.50, 80, 80),
(2, 3, '2025-11-26 19:30:00', 10.50, 80, 80);

-- Oppenheimer (3)
INSERT INTO showtimes (movie_id, theater_id, start_time, ticket_price, total_seats, available_seats) VALUES
(3, 1, '2025-11-27 16:00:00', 13.50, 120, 120),
(3, 1, '2025-11-27 20:30:00', 15.00, 120, 120),
(3, 2, '2025-11-27 17:00:00', 13.00, 110, 110),
(3, 2, '2025-11-27 21:30:00', 14.50, 110, 110),
(3, 3, '2025-11-27 18:00:00', 12.50, 100, 100),
(3, 3, '2025-11-27 22:00:00', 14.00, 100, 100);

-- Spider-Man (4)
INSERT INTO showtimes (movie_id, theater_id, start_time, ticket_price, total_seats, available_seats) VALUES
(4, 1, '2025-11-28 13:30:00', 11.50, 120, 120),
(4, 1, '2025-11-28 18:00:00', 12.50, 120, 120),
(4, 2, '2025-11-28 14:00:00', 11.00, 110, 110),
(4, 2, '2025-11-28 19:00:00', 12.00, 110, 110),
(4, 3, '2025-11-28 15:30:00', 10.50, 100, 100),
(4, 3, '2025-11-28 20:30:00', 11.50, 100, 100);

-- Barbie (5)
INSERT INTO showtimes (movie_id, theater_id, start_time, ticket_price, total_seats, available_seats) VALUES
(5, 1, '2025-11-29 12:00:00', 10.50, 120, 120),
(5, 1, '2025-11-29 17:00:00', 11.50, 120, 120),
(5, 2, '2025-11-29 13:00:00', 10.00, 110, 110),
(5, 2, '2025-11-29 18:00:00', 11.00, 110, 110),
(5, 3, '2025-11-29 14:30:00', 9.50, 100, 100),
(5, 3, '2025-11-29 19:30:00', 10.50, 100, 100);

-- The Batman (6)
INSERT INTO showtimes (movie_id, theater_id, start_time, ticket_price, total_seats, available_seats) VALUES
(6, 1, '2025-11-30 16:30:00', 13.00, 120, 120),
(6, 1, '2025-11-30 21:00:00', 14.00, 120, 120),
(6, 2, '2025-11-30 17:30:00', 12.50, 110, 110),
(6, 2, '2025-11-30 22:00:00', 13.50, 110, 110),
(6, 3, '2025-11-30 18:30:00', 12.00, 100, 100),
(6, 3, '2025-11-30 23:00:00', 13.00, 100, 100);

