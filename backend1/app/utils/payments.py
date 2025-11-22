import uuid
from typing import Tuple

import stripe
from flask import current_app


def init_stripe():
    secret = current_app.config.get("STRIPE_SECRET_KEY")
    if secret:
        stripe.api_key = secret


def process_payment(amount_cents: int, method: str) -> Tuple[bool, str]:
    """
    Very simplified payment handler.

    In real life you'd call Stripe/PayPal/Venmo APIs.
    For now we just simulate success and return a fake transaction id.
    """
    # You can branch logic by `method` if needed.
    transaction_id = f"{method}-{uuid.uuid4().hex[:12]}"
    return True, transaction_id
