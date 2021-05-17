# from bson.objectid import ObjectId
# import json
# from mongoengine.queryset.visitor import Q
from .models import ClubMembership, User, Club


def createMembership(user, club, role):
    membership = ClubMembership(
        club=club,
        clubName=club.name,
        member=user,
        memberName=f"{user.firstName} {user.lastName}",
        role=role,
    )
    return membership.save()


def join_club(user_email: str, club_id: str):
    user = User.objects.get(contactMail=user_email)
    club = Club.object.get(pk=club_id)
    return createRegularMembership(user, club)


def createRegularMembership(user: User, club: Club):
    return createMembership(user, club, "U")


def createAdminMembership(user_email: str, club: Club):
    user = User.objects.get(contactMail=user_email)
    return createMembership(user, club, "A")


def members_count(clubName: str):
    return ClubMembership.objects(clubName=clubName).count()


def get_user_clubs(user_email: str):
    user = User.objects.get(contactMail=user_email)
    return ClubMembership.objects(member=user).to_json()


# def clubs_by_admin(member: User):
#     return ClubMembership.objects(member=member, role="A").to_json()
