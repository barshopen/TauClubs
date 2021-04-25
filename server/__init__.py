from flask import Flask
from server.db import db_app
from server.auth import auth_app

app = Flask(__name__, static_folder="__staticbuild__", static_url_path="/")

# serves static react


@app.errorhandler(404)
def not_found(e):
    print(e)
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


# blueprint for db
app.register_blueprint(db_app)

# blueprint for auth
app.register_blueprint(auth_app)
