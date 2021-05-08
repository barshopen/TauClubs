import os
import dotenv
import json
import flask
from flask import Flask, Blueprint, redirect, request, url_for
from requests import Response
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user
)
from authlib.integrations.flask_client import OAuth
from server.db.userauth import UserAuth
from server.auth import google_token
auth_app = Blueprint("auth_app", __name__, url_prefix="/auth")
dotenv.load_dotenv()
OAuthGOOGLE = None
login_manager = LoginManager()
google = None


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
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
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


@login_manager.user_loader
def load_user(user_id):
    return UserAuth.objects(id=user_id).first()


@auth_app.route('/login', methods=['POST'])
def sendUserData():
    id_token = request.headers.get('id_token')
    print(id_token)
    if id_token is None:
        return "No ID token provided", 401

    try:

        user_info = google_token.validate_id_token(
            id_token, os.getenv('GOOGLE_CLIENT_ID')
        )
        print("userinfo", user_info)
        print(user_info)
    except ValueError:
        print(1)
        return 'Invalid ID token', 401

    if user_info["email_verified"]:
        #unique_id = user_info["sub"]
        users_email = user_info["email"]
        print("unique id", users_email)
        users_name = user_info["name"]
    else:
        return "User email not available or not verified by Google.", 400

    try:
        user = UserAuth.objects.get(email=users_email)
    except Exception:
        user = UserAuth(name=users_name, email=users_email)
        user.save()

    login_user(user, remember=True)

    return login()


@auth_app.route("/login", methods=['GET'])
def login():
    d = {'google_id': current_user.get_id()}
    return d


@ auth_app.route("/logout")
@ login_required
def logout():
    logout_user()
    return redirect('http://localhost:3000')
