import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret-key"
    SQLALCHEMY_DATABASE_URI = "sqlite:///../instance/mbs.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
