from flask import Blueprint

auth_app = Blueprint("auth_app", __file__, url_prefix="/auth")
