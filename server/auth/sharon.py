import os
from flask import Flask, Blueprint, redirect, request, url_for
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user,
    UserMixin
)
import json
import sqlite3
from authlib.integrations.flask_client import OAuth
#from .db import init_db_command
#from .user import User
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'sharon'

auth_app = Blueprint("auth_app", __name__, url_prefix="/auth")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sharonn.db'
db = SQLAlchemy(app)
# User session management setup


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name


# db.create_all()
oauth = None
login_manager = LoginManager()
google = None


def init(app):
    print("sharon")
    login_manager.init_app(app)
    global oauth
    oauth = OAuth(app)
    oauth.register(
        name='google',
        client_id="18740809626-1et94g7dbvpmr4ajbc289d6p4rq35i7k.apps.googleusercontent.com",
        client_secret="69tVQtaPC_J8ARQpvjxOveB6",
        # access_token_url='https://accounts.google.com/o/oauth2/token',
        # access_token_params=None,
        # authorize_url='https://accounts.google.com/o/oauth2/auth',
        # authorize_params=None,
        # api_base_url='https://www.googleapis.com/oauth2/v1/',
        # This is only needed if using openId to fetch user info
        # userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        # client_kwargs={'scope': 'openid email profile'},
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={
            'scope': 'openid email profile'
        }
    )
    global google
    google = oauth.create_client('google')  # create the google oauth client
    # init_db_command()


init(app)


@login_manager.user_loader
def load_user(user_id):
    # return User.get(user_id)
    return User.query.get(int(user_id))


@app.route("/")
def index():
    if current_user.is_authenticated:
        print("heree")
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.name, current_user.email
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'
    # return ('<script src="https://apis.google.com/js/platform.js" async defer></script>'
    #       '<meta name="google-signin-client_id" content="18740809626-1et94g7dbvpmr4ajbc289d6p4rq35i7k.apps.googleusercontent.com">'
    #      '<div class="g-signin2"></div>')


@app.route("/login")
def login():
    return google.authorize_redirect(
        url_for('callback', _external=True))


@app.route("/login/callback")
def callback():
    # Access token from google (needed to get user info)
    token = google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token)

    if user_info["email_verified"]:
        unique_id = user_info["sub"]
        users_email = user_info["email"]
        users_name = user_info["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

        # Create a user in your db with the information provided
    # by Google
    user = User.query.filter_by(email=users_email).first()
    # Doesn't exist? Add it to the database.
    if not user:
        user = User(name=users_name, email=users_email)
        db.session.add(user)
        db.session.commit()

    # Begin user session by logging the user in
    login_user(user, remember=True)

    # Send user back to homepage
    return redirect(url_for("index"))


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(ssl_context="adhoc")
