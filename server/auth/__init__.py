import os
import json
import sqlite3
import flask
import socket
from flask import Flask, Blueprint, redirect, request, url_for
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user,
    UserMixin
)
from authlib.integrations.flask_client import OAuth
from flask_sqlalchemy import SQLAlchemy


auth_app = Blueprint("auth_app", __name__, url_prefix="/auth")

OAuthGOOGLE = None
login_manager = LoginManager()
google = None
DB = SQLAlchemy()


def initdb(app):
    global DB
    DB = SQLAlchemy(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        os.path.join(os.getcwd(), "server\\auth\\users.db")


def initgoogle():
    global google
    global OAuthGOOGLE
    # create the google oauth client
    google = OAuthGOOGLE.create_client('google')


def initoauth(app):
    global OAuthGOOGLE
    OAuthGOOGLE = OAuth(app)
    OAuthGOOGLE.register(
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
    initgoogle()


def init(app):
    login_manager.init_app(app)
    initoauth(app)
    initdb(app)


class User(UserMixin, DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(80), unique=True, nullable=False)
    email = DB.Column(DB.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name


def create():
    DB.create_all()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

    # return User.get(user_id)


@auth_app.route("/login")
def login():
    return google.authorize_redirect(
        url_for('auth_app.callback', _external=True))

# call back from google


@auth_app.route("/login/callback")
def callback():
    # Access token from google (needed to get user info)
    print(flask.request.args.get('state'),
          flask.session.get('_google_authlib_state_'))
    token = google.authorize_access_token()
    user_info = OAuthGOOGLE.google.parse_id_token(token)

    if user_info["email_verified"]:
        unique_id = user_info["sub"]
        users_email = user_info["email"]
        print("unique id", users_email)
        users_name = user_info["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    user = User.query.filter_by(email=users_email).first()
    # Doesn't exist? Add it to the database.
    if not user:
        user = User(name=users_name, email=users_email)
        DB.session.add(user)
        DB.session.commit()

    # Begin user session by logging the user in
    login_user(user, remember=True)
    print("port", request.host)

    # Send user back to homepage
    return redirect("http://localhost:3000")  # direct for now
    # return redirect(request.host_url) # for production


@ auth_app.route("/logout")
@ login_required
def logout():
    logout_user()
    return redirect(url_for("auth_app.index"))
