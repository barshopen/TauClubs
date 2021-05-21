from .models import ClubMembership, User, Club
from mongoengine.errors import DoesNotExist, NotUniqueError
from flask import jsonify


def createMembership(user, club, role):
    membership = ClubMembership(
        club=club,
        clubName=club.name,
        member=user,
        memberName=f"{user.firstName} {user.lastName}",
        role=role,
    )
    membership.save()
    return membership


def join_club(user_email: str, club_id: str):
    user = User.objects.get(contactMail=user_email)
    club = Club.objects.get(pk=club_id)
    try:
        return createRegularMembership(user, club)
    except NotUniqueError:
        return None


def createRegularMembership(user: User, club: Club):
    return createMembership(user, club, "U")


def createAdminMembership(user_email: str, club: Club):
    user = User.objects.get(contactMail=user_email)
    return createMembership(user, club, "A")


def members_count(clubName: str):
    return ClubMembership.objects(clubName=clubName).count()


def get_user_clubs(user):
    res = []
    for doc in ClubMembership.objects(member=user):
        try:
            dict = doc.club.to_dict()
            if doc.role == "A":
                dict["admin"] = True
            res.append(dict)
        except DoesNotExist as e:
            print(doc, e)
            # if for some odd reason it finds a non existing doc referenced in club,
            # the current doc should be deleted because clubMembership has no meaning
            # without the club.
            doc.delete()
    return jsonify(res)


# def clubs_by_admin(member: User):
#     return ClubMembership.objects(member=member, role="A").to_json()


def listOfClubsPerUser(user):
    clubs = ClubMembership.objects(member=user)
    return clubs.to_json()  # need to decide hoe do we want to get it


def joinClubAsUser(user: User, club: Club):
    createRegularMembership(user, club)


def is_user_member(user, club):
    try:
        ClubMembership.objects(club=club, member=user)
        return True
    except DoesNotExist:
        return False


def is_manager(user):
    try:
        ClubMembership.objects(member=user)
        return True
    except DoesNotExist:
        return False
