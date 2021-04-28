import os
from flask import Flask, abort
import dotenv
from server.db import db_app
from server.auth import auth_app
from server.generic import disable_route_on_flag
dotenv.load_dotenv()

app = Flask(__name__, static_folder="__staticbuild__", static_url_path="/")
# serves static react
FLAG_EXPECTED_VALUE = '1'
FLAG_ACTUAL_VALUE = os.getenv('DEBUG_BACKEND')
print(FLAG_ACTUAL_VALUE)


@app.errorhandler(404)
def not_found(e):
    print(e)
    # This is not going to stay like this, but for now this is how we'll do it
    return 'File not found'


@app.route('/')
@disable_route_on_flag(FLAG_EXPECTED_VALUE, FLAG_ACTUAL_VALUE)
def index():
    return app.send_static_file('index.html')


# blueprint for db
app.register_blueprint(db_app)

# blueprint for auth
app.register_blueprint(auth_app)
