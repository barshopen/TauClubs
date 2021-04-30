from flask import Flask, abort
import dotenv
from server.db import db_app
from server.auth import auth_app
from server.frontend import frontend_app

dotenv.load_dotenv()

app = Flask(__name__, static_folder="__staticbuild__", static_url_path="/")


# blueprint for db
app.register_blueprint(db_app)

# blueprint for auth
app.register_blueprint(auth_app)

# blueprint for frotned
app.register_blueprint(frontend_app)
