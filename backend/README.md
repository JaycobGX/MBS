# MBS Backend Setup (Not Fully Complete)

## How to Run the Backend Server
1. Open terminal inside the `backend` folder  
2. Run:
```
python run.py
```
The backend will start on:
```
http://127.0.0.1:5000
```
## How to Seed the Database (Sample Data)
Run:
```
python -m seeds.seed_data
```
**Note:**  
The sample data inserted by `seed_data.py` is only for development so the API does not appear empty.  
In the final system, the actual movies and showtimes will be added by the Admin (not using the seed script).

---
# MBS Backend API Documentation

Base URL:
```
http://127.0.0.1:5000/api
```

## Completed 
- Movies API  
- Showtimes API  
- Admin API  
---
# 1. Movies API

### GET /api/movies  
Returns all movies.

### GET /api/movies/<id>  
Get a specific movie.

### GET /api/movies/search?keyword=...  
Search movies.

### GET /api/movies/upcoming  
Get upcoming movies.

### GET /api/movies/now  
Get currently showing movies.

### POST /api/admin/movies  
Add a movie.  
Example body:
```json
{
  "title": "New Movie",
  "genre": "Comedy",
  "duration": 120,
  "description": "Description here",
  "release_date": "2025-01-01",
  "poster_url": "https://example.com",
  "rating": 7.5,
  "is_upcoming": false
}
```
### PUT /api/admin/movies/<id>  
Update a movie.

### DELETE /api/admin/movies/<id>  
Delete a movie.

---

# 2. Showtimes API

### POST /api/showtimes  
Add a showtime.  
Example body:
```json
{
  "movie_id": 1,
  "theater_name": "Hall 1",
  "start_time": "2025-05-20 18:00:00",
  "price": 12.99
}
```
### GET /api/showtimes/movie/<movie_id>  
Showtimes for a movie.

### PUT /api/showtimes/<id>  
Update showtime.

### DELETE /api/showtimes/<id>  
Delete showtime.

### GET /api/admin/showtimes  
All showtimes (Admin).

---
# 3. Admin API

### GET /api/admin/stats  
Returns system statistics.  
Example:
```json
{
  "total_movies": 3,
  "total_showtimes": 9
}
```
### POST /api/admin/movies  
Add movie.

### PUT /api/admin/movies/<id>  
Update movie.

### DELETE /api/admin/movies/<id>  
Delete movie.

### POST /api/admin/showtimes  
Add showtime.

### PUT /api/admin/showtimes/<id>  
Update showtime.

### DELETE /api/admin/showtimes/<id>  
Delete showtime.

### GET /api/admin/showtimes  
List all showtimes.

---
# 4. User API (To Be Added)
Will include:
- Register  
- Login (JWT)  
- Logout  
- User profile  
- Update profile  
- Booking history  

---
# 5. Booking API (To Be Added)
Will include:
- Create booking  
- Select showtime  
- Choose seats  
- Prevent seat conflicts  
- Retrieve booking details  

---
# 6. Payment API (To Be Added)
Will include:
- Stripe  
- PayPal  
- Payment confirmation  
- Save payment status  
---

