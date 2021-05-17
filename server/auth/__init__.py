from flask import Blueprint, redirect, request
import os
import dotenv
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user,
)
from mongoengine.errors import DoesNotExist
from server.auth.userauth import UserAuth, create_user_auth
from server.auth import google_token

auth_app = Blueprint("auth_app", __name__, url_prefix="/auth")
dotenv.load_dotenv()

login_manager = LoginManager()


def init(app):
    login_manager.init_app(app)
    login_manager.session_protection = "strong"


@login_manager.user_loader
def load_user(user_id):
    return UserAuth.objects(id=user_id).first()


@auth_app.route("/login", methods=["POST"])
def sendUserData():
    id_token = request.headers.get("id_token")
    if id_token is None:
        return "No ID token provided", 401

    try:
        user_info = google_token.validate_id_token(
            id_token, os.getenv("GOOGLE_CLIENT_ID")
        )
        print(user_info)
    except ValueError:
        return "Invalid ID token", 401

    if user_info["email_verified"]:
        users_email = user_info["email"]
    else:
        return "User email not available or could not be verified by Google.", 400

    try:
        user = UserAuth.objects.get(email=users_email)
    except DoesNotExist:
        user = create_user_auth(
            user_info["given_name"],
            user_info["family_name"],
            user_info["email"],
            user_info["picture"],
        )
        user.save()
    except Exception as e:
        print(type(e).__name__, e)
        return "Could not complete request", 400

    login_user(user, remember=True)

    dict = {
        "id": current_user.get_id(),
        "email": user_info["email"],
        "firstName": user_info["given_name"],
        "lastName": user_info["family_name"],
        "picture": user_info["picture"],
    }
    return whoami(dict)


@auth_app.route("/whoami", methods=["GET"])
@login_required
def whoami(dict):
    return dict


@auth_app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("http://localhost:3000")
