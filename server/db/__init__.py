from flask import Blueprint

db_app = Blueprint("db_app", __name__, url_prefix="/db")
