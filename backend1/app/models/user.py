from datetime import datetime
from enum import Enum

from ..extensions import db


class UserRole(str, Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    role = db.Column(db.Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    bookings = db.relationship("Booking", back_populates="user", lazy="dynamic")
    reviews = db.relationship("Review", back_populates="user", lazy="dynamic")

    def is_admin(self) -> bool:
        return self.role == UserRole.ADMIN
