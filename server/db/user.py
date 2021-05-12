from server.db.models import User, Club, ClubMembership
from server.db.clubmembership import createRegularMembership


def create_user(firstName, lastName, contactMail, picture):
    user = User(
        firstName=firstName, lastName=lastName, contactMail=contactMail, picture=picture
    )
    user.save()
    return user


def listOfClubsPerUser(user):
    clubs = ClubMembership.objects(member=user)
    return clubs.to_json()  # need to decide hoe do we want to get it


def joinClubAsUser(user: User, club: Club):
    createRegularMembership(user, club)
