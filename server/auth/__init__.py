from flask import Blueprint, request
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
from server.auth.userauth import create_user_auth, getUserInfo
from server.db.models import UserAuth
from server.auth import google_token
from flask import send_file


auth_app = Blueprint("auth_app", __name__, url_prefix="/auth")
dotenv.load_dotenv()

login_manager = LoginManager()


def init(app):
    login_manager.init_app(app)
    login_manager.session_protection = "strong"


@login_manager.user_loader
def load_user(user_id):
    return UserAuth.objects(id=user_id).first()


@auth_app.route("/whoami", methods=["GET"])
def whoami():
    if not current_user.is_authenticated:
        return {"id": -1}
    return getUserInfo(current_user.get_id())


@auth_app.route("/login", methods=["POST"])
def sendUserData():
    id_token = request.headers.get("id_token")
    if id_token is None:
        return "No ID token provided", 401

    try:
        user_info = google_token.validate_id_token(
            id_token, os.getenv("GOOGLE_CLIENT_ID")
        )
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

    return whoami()


@auth_app.route("/logout")
@login_required
def logout():
    logout_user()
    return "Logout", 200


@auth_app.route("/user/image")
@login_required
def user_image():
    user = UserAuth.objects(current_user.get_id()).user
    image = user.picture
    return send_file(
        image,
        download_name=user.firstName + "." + image.format,
    )
