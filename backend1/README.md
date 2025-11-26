# MBS Backend1 – Full Setup & API Guide

This README describes how to set up the backend, configure the database, populate sample data, and test all API endpoints for the Movie Booking System.

# 1. Technologies Used
- Python (Flask)
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- MySQL
- Thunder Client or Postman

# 2. Setup Instructions

## Create virtual environment
python -m venv venv

## Activate virtual environment
.\venv\Scripts\Activate.ps1

## Install dependencies
pip install -r requirements.txt

## Create .env file inside backend folder
FLASK_ENV=development
SECRET_KEY=dev-secret
JWT_SECRET_KEY=jwt-secret-key

DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_NAME=mbs_db

# 3. Create MySQL Database

In MySQL Workbench run:
CREATE DATABASE mbs_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

# 4. Run Database Migrations
flask --app run.py db init
flask --app run.py db migrate -m "initial schema"
flask --app run.py db upgrade

# 5. Populate Movies, Theaters, Showtimes
Run the SQL file:
database/populate_mbs_data.sql

This inserts:
- 12 movies
- 3 theaters
- showtimes for movies 1–6
# Note: I chose 12 movies randomly for the database, we can change them if anyone wants to

# 6. Run the Backend Server
python run.py

The backend will run at:
http://127.0.0.1:5000

# 7. Authentication Endpoints

## Register
POST /api/auth/register

Body:
{
  "full_name": "Test User",
  "email": "test@example.com",
  "password": "pass123"
}

## Login
POST /api/auth/login

Body:
{
  "email": "admin@mbs.com",
  "password": "admin123"
}

The response contains:
"access_token": "<token>"

Use the access_token as a Bearer Token when calling protected endpoints.

# 8. User API Endpoints

## Get all movies
GET /api/movies

## Get movie details
GET /api/movies/<id>

## Get showtimes for a movie
GET /api/movies/<id>/showtimes

## Create a booking (requires login)
POST /api/bookings

Body:
{
  "showtime_id": 3,
  "num_seats": 2,
  "payment_method": "card"
}

# 9. Admin API Endpoints (Require admin login)
Admin login:
POST /api/auth/login
(email: admin@mbs.com, password: admin123)

Use the returned access_token for admin routes.

All admin routes begin with:
/api/admin

# 10. Admin – Movie Management

## Add movie
POST /api/admin/movies

{
  "title": "New Movie",
  "synopsis": "Description",
  "genre": "Action",
  "duration_minutes": 120,
  "cast": "Actor A, Actor B",
  "rating": 8.5,
  "image_url": "https://image.com/poster.jpg",
  "status": "current"
}

## Update movie
PUT /api/admin/movies/<id>

## Delete movie
DELETE /api/admin/movies/<id>

# 11. Admin – Theater Management

## Add theater
POST /api/admin/theaters

{
  "name": "New Cinema",
  "city": "Dallas"
}

## Delete theater
DELETE /api/admin/theaters/<id>

# 12. Admin – Showtime Management

## Add showtime
POST /api/admin/showtimes

{
  "movie_id": 1,
  "theater_id": 2,
  "start_time": "2025-11-30 19:00:00",
  "ticket_price": 12.50,
  "total_seats": 120
}

## Delete showtime
DELETE /api/admin/showtimes/<id>

# 13. Database Tables Overview

## users
id  
full_name  
email  
password_hash  
phone  
address  
role  

## movies
id  
title  
synopsis  
genre  
duration_minutes  
cast  
rating  
image_url  
status  

## theaters
id  
name  
city  

## showtimes
id  
movie_id  
theater_id  
start_time  
ticket_price  
total_seats  
available_seats  
created_at  

## bookings
id  
user_id  
showtime_id  
num_seats  
total_price  

## reviews
id  
user_id  
movie_id  
rating  
comment  

# Notes
- Always activate the virtual environment before running the backend.
- The SQL file can be re-run to reset movies, theaters, and showtimes.
- Admin routes require an admin token.

# API Routes Overview

This backend exposes several route groups: authentication, movies, bookings, user profile, and admin management.
Below is the complete list of API endpoints implemented in the backend.

# 1. Auth Routes
POST /api/auth/register  
POST /api/auth/login  

# 2. Movie Routes
GET  /api/movies/current  
GET  /api/movies/upcoming  
GET  /api/movies/search  
GET  /api/movies/<movie_id>  
POST /api/movies/<movie_id>/reviews  

# 3. Booking Routes
POST /api/bookings/  
GET  /api/bookings/<booking_id>/ticket  

# 4. User Profile Routes
GET  /api/user/me  
PUT  /api/user/me  
GET  /api/user/me/bookings  

# 5. Admin Routes (Require Admin Token)

## Movie Management
POST   /api/admin/movies  
PUT    /api/admin/movies/<movie_id>  
PATCH  /api/admin/movies/<movie_id>  
DELETE /api/admin/movies/<movie_id>  

## Theater Management
POST   /api/admin/theaters  
DELETE /api/admin/theaters/<theater_id>  

## Showtime Management
POST   /api/admin/showtimes  
DELETE /api/admin/showtimes/<showtime_id>  

# Notes
- All admin routes require an admin access token obtained from POST /api/auth/login.
- User protected routes require a normal user token.
- Movie, theater, and showtime management functionality is handled entirely under /api/admin.
