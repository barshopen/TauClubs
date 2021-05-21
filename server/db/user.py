from server.db.models import User
from pymongo.errors import DuplicateKeyError
from mongoengine.errors import NotUniqueError


def create_user(firstName, lastName, contactMail, picture):
    try:
        user = User(
            firstName=firstName,
            lastName=lastName,
            contactMail=contactMail,
            picture=picture,
        )
        user.save()
    except [NotUniqueError, DuplicateKeyError]:
        user = User.objects.get(contactMail=contactMail)
    return user
