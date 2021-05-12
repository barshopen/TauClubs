from mongoengine import Document, StringField, EmailField,URLField
from .models import User, Club, ClubMembership
from .clubmembership import createAdminMembership, createRegularMembership
from mongoengine.queryset.visitor import Q


def create_user(firstName, lastName, contactMail, picture):
    user = User(
        firstName=firstName, lastName=lastName, contactMail=contactMail, picture=picture
    )
    user.save()
    return user


def listOfClubsPerUser(user):
    clubs=ClubMembership.objects.get(member=user)
    return clubs.to_json()#need to decide hoe do we want to get it

def joinClubAsUser(user,club):
    createRegularMembership(user,club)
