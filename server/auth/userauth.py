from mongoengine import Document, EmailField, ReferenceField
from flask_login import UserMixin
from server.db.models import User
from server.db.user import create_user
from bson.objectid import ObjectId


class UserAuth(UserMixin, Document):
    email = EmailField(required=True, unique=True)
    userauth = ReferenceField(User)

    def __repr__(self):
        return f"< User {self.name} >"


def get_userauth_email_by_id(id: str):
    return UserAuth.objects.get(pk=ObjectId(id)).email


def create_user_auth(firstName, lastName, email, picture):
    full_user = create_user(firstName, lastName, email, picture)
    user = UserAuth(email=email, userauth=full_user)
    user.save()
    return user
