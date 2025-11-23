from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from email_validator import validate_email, EmailNotValidError

from ..extensions import db
from ..models.user import User, UserRole
from ..utils.security import hash_password, check_password

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    data = request.get_json() or {}
    full_name = data.get("full_name")
    email = (data.get("email") or "").strip().lower()
    password = data.get("password")
    phone = data.get("phone")
    address = data.get("address")

    missing = [f for f in ["full_name", "email", "password"] if not data.get(f)]
    if missing:
        return (
            jsonify(
                {
                    "message": "Missing required fields",
                    "missing": missing,
                }
            ),
            400,
        )

    try:
        validate_email(email)
    except EmailNotValidError as e:
        return jsonify({"message": str(e)}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400

    user = User(
        full_name=full_name,
        email=email,
        password_hash=hash_password(password),
        phone=phone,
        address=address,
        role=UserRole.CUSTOMER,
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Account created successfully"}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password(password, user.password_hash):
        return jsonify({"message": "Invalid email or password"}), 401

    additional_claims = {"role": user.role.value}

    access_token = create_access_token(
        identity=str(user.id),    
        additional_claims=additional_claims
    )

    return jsonify(
        {
            "access_token": access_token,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role.value,
            },
        }
    )