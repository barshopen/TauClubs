import os
from flask import Flask, redirect, request, url_for
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user,
    UserMixin
)
from authlib.integrations.flask_client import OAuth
import google.oauth2.credentials
import googleapiclient.discovery
import google_auth_oauthlib
import json
import sqlite3
from db import init_db_command
from user import User

try:
    init_db_command()
except sqlite3.OperationalError:
    # Assume it's already been created
    pass

# Flask app setup
app = Flask(__name__)
app.secret_key = "sharon"
# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)

oauth = OAuth(app)

oauth.register(
    name='google',
    client_id=os.environ.get("GOOGLE_CLIENT_ID", None),
    client_secret=os.environ.get("GOOGLE_CLIENT_SECRET", None),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    # This is only needed if using openId to fetch user info
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)


# class User(UserMixin, db.Model):
# primary keys are required by SQLAlchemy
#    id = db.Column(db.Integer, primary_key=True)
#    email = db.Column(db.String(100), unique=True)
#    name = db.Column(db.String(1000))


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route("/")
def index():
    if current_user.is_authenticated:
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            "<div><p>Google Profile Picture:</p>"
            '<img src="{}" alt="Google profile pic"></img></div>'
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.name, current_user.email, current_user.profile_pic
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'
       # return ('<script src="https://apis.google.com/js/platform.js" async defer></script>'
        #        '<meta name="google-signin-client_id" content="18740809626-1et94g7dbvpmr4ajbc289d6p4rq35i7k.apps.googleusercontent.com">'
        #       '<div class="g-signin2"></div>')


@app.route("/login")
def login():
    google = oauth.create_client('google')  # create the google oauth client
   # redirect_uri = request.base_url + "/callback",
    return google.authorize_redirect(url_for('callback', _external=True))


@app.route("/login/callback")
def callback():
    google = oauth.create_client('google')  # create the google oauth client
    # Access token from google (needed to get user info)
    token = google.authorize_access_token()
    # userinfo contains stuff u specificed in the scrope
    resp = google.get('userinfo')
    user_info = resp.json()

    if user_info.get("verified_email"):
        unique_id = user_info["id"]
        users_email = user_info["email"]
        picture = user_info["picture"]
        users_name = user_info["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

        # Create a user in your db with the information provided
    # by Google
    user = User(
        id_=unique_id, name=users_name, email=users_email, profile_pic=picture
    )

    # Doesn't exist? Add it to the database.
    if not User.get(unique_id):
        User.create(unique_id, users_name, users_email, picture)

    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("index"))


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(ssl_context="adhoc")
