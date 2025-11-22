import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")

    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_NAME = os.getenv("DB_NAME", "mbs_db")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")

    # Stripe (optional)
    STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")

    # Auth / session behaviour
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 2  # 2 hours
