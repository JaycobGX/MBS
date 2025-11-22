import os
from datetime import timedelta

class Config:
    """Application configuration"""
    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'mysql+pymysql://chelsea:newpassword123@localhost/movie_booking'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)  # SRS 4.2.2 requirement
    
    # Security
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
