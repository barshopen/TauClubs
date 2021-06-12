import os
from flask import Flask, request
import dotenv
from server.db import db_app
from server.db.manager_data import dashboard_app
from server.auth import auth_app, init
from server.generic import disable_route_on_flag
from flask_mongoengine import MongoEngine

dotenv.load_dotenv()

app = Flask(__name__, static_folder="__staticbuild__", static_url_path="/")
app.secret_key = os.getenv("DB_SECRET")


# serves static react
FLAG_EXPECTED_VALUE = "1"
FLAG_ACTUAL_VALUE = os.getenv("DEBUG_BACKEND")

# blueprint for db
app.register_blueprint(db_app)

init(app)

# blueprint for auth
app.register_blueprint(auth_app)

app.register_blueprint(dashboard_app)


MONGO_DB_HOST_USER = os.getenv("MONGO_DB_HOST_USER")
MONGO_DB_HOST_PASSWORD = os.getenv("MONGO_DB_HOST_PASSWORD")
MONGO_DB_CLUSTER_URL = os.getenv("MONGO_DB_CLUSTER_URL")
MONGO_DB_CLUSTER_DB_NAME = os.getenv("MONGO_DB_CLUSTER_DB_NAME")
MONGO_DB_PARAMS = "retryWrites=true&w=majority"

URL_HOST = (
    f"mongodb+srv://{MONGO_DB_HOST_USER}:{MONGO_DB_HOST_PASSWORD}"
    f"@{MONGO_DB_CLUSTER_URL}/{MONGO_DB_CLUSTER_DB_NAME}?{MONGO_DB_PARAMS}"
)

mongodb = MongoEngine()
app.config["MONGODB_SETTINGS"] = {"host": URL_HOST}
mongodb.init_app(app)

if FLAG_EXPECTED_VALUE != FLAG_ACTUAL_VALUE:

    @app.errorhandler(404)
    def not_found(e):
        print(e)
        if request.path.startswith("/api/"):
            return "Resource not found", 404
        return "Not found", 404

    @app.route("/")
    @disable_route_on_flag(FLAG_EXPECTED_VALUE, FLAG_ACTUAL_VALUE)
    def index():
        return app.send_static_file("index.html")


@app.route("/isManager")
@login_required
def is_user_manager():
    user = get_userauth_user_by_id(current_user.get_id())
    return json.dumps(is_manager(user))
