# from bson.objectid import ObjectId
# import json
# from mongoengine.queryset.visitor import Q
from .models import ClubMembership, User


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


def members_count(clubName: str):
    return ClubMembership.objects(clubName=clubName).count()

def my_clubs(member: User):
    return ClubMembership.objects(member=member).to_json()

def clubs_by_admin(member: User):
    return ClubMembership.objects(member=member, role="A").to_json()