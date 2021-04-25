from flask import Blueprint

db_app = Blueprint("db_app", __file__, url_prefix="/db")
