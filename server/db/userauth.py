
from mongoengine import Document, StringField, UUIDField, EmailField
from flask_login import UserMixin


class UserAuth(UserMixin, Document):
    # id = UUIDField()  # consider ObjectIdField
    name = StringField(max_length=200, required=True)
    email = EmailField(required=True, unique=True)

    def __repr__(self):
        return '<User %r>' % self.name