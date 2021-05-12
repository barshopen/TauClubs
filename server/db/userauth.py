from mongoengine import Document, EmailField, ReferenceField
from flask_login import UserMixin
from server.db.user import User


class UserAuth(UserMixin, Document):
    email = EmailField(required=True, unique=True)
    userauth = ReferenceField(User)

    def __repr__(self):
        return f"< User {self.name} >"

    @staticmethod
    def create_user_auth(firstName, lastName, email, picture):
        full_user = User.create_user(firstName, lastName, email, picture)
        user = UserAuth(email=email, userauth=full_user)
        user.save()
        return user
