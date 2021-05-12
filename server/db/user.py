from server.db.models import User, Club, ClubMembership
from server.db.clubmembership import createRegularMembership
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


def listOfClubsPerUser(user):
    clubs = ClubMembership.objects(member=user)
    return clubs.to_json()  # need to decide hoe do we want to get it


def joinClubAsUser(user: User, club: Club):
    createRegularMembership(user, club)
