from flask_jwt_extended import verify_jwt_in_request, get_jwt
from flask import abort


def admin_required():
    """
    Use inside a view:
        admin_required()
    """
    verify_jwt_in_request()
    claims = get_jwt()
    if claims.get("role") != "admin":
        abort(403, description="Admin access required")
