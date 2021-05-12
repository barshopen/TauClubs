# from bson.objectid import ObjectId
# import json
# from mongoengine.queryset.visitor import Q
from .models import ClubMembership


def createMembership(user, club, role):
    membership = ClubMembership(
        club=club,
        clubName=club.name,
        member=user,
        memberFirstName=user.firstName,
        memberLastName=user.lastName,
        role=role,
    )
    membership.save()


def createRegularMembership(user, club):
    createMembership(user, club, "U")


def createAdminMembership(user, club):
    createMembership(user, club, "A")
