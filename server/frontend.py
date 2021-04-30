import os
from flask import Blueprint
from server.generic import disable_route_on_flag
# serves static react
FLAG_EXPECTED_VALUE = '1'
FLAG_ACTUAL_VALUE = os.getenv('DEBUG_BACKEND')


frontend_app = Blueprint(
    "frontend_app",
    __name__,
    url_prefix="/")


@frontend_app.errorhandler(404)
def not_found(e):
    print(e)
    # This is not going to stay like this, but for now this is how we'll do it
    return 'File not found'


@frontend_app.route('/')
@disable_route_on_flag(FLAG_EXPECTED_VALUE, FLAG_ACTUAL_VALUE)
def index():
    return frontend_app.send_static_file('index.html')
