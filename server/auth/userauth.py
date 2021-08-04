from server.db.models import UserAuth
from server.db.user import create_user
from bson.objectid import ObjectId


def get_userauth_email_by_id(id: str):
    return UserAuth.objects.get(pk=ObjectId(id)).email


def get_userauth_user_by_id(id: str):
    return UserAuth.objects.get(pk=ObjectId(id)).userauth


def create_user_auth(firstName, lastName, email, picture):
    full_user = create_user(firstName, lastName, email, picture)
    user = UserAuth(email=email, userauth=full_user)
    user.save()
    return user


def getUserInfo(id):
    user_auth = UserAuth.objects.get(id=id)
    user = user_auth.userauth
    dict = {
        "id": id,
        "email": user.contactMail,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "picture": user.picture,
    }
    return dict
