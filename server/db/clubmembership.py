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

    return membership.save()


def join_club(user_email: str, club_id: str):
    user = User.objects.get(contactMail=user_email)
    club = Club.objects.get(pk=club_id)
    try:
        return createRegularMembership(user, club).to_json()
    except NotUniqueError:
        return None


def createRegularMembership(user: User, club: Club):
    return createMembership(user, club, "U")


def createAdminMembership(user_email: str, club: Club):
    user = User.objects.get(contactMail=user_email)
    return createMembership(user, club, "A")


def members_count(clubName: str):
    return ClubMembership.objects(clubName=clubName).count()


def get_user_clubs(user_email: str):
    user = User.objects.get(contactMail=user_email)
    res = []
    for doc in ClubMembership.objects(member=user):
        try:
            res.append(doc.club.to_dict())
        except DoesNotExist as e:
            print(doc, e)
            # if for some odd reason it finds a non existing doc referenced in club,
            # the current doc should be deleted because clubMembership has no meaning
            # without the club.
            doc.delete()
    return jsonify(res)


# def clubs_by_admin(member: User):
#     return ClubMembership.objects(member=member, role="A").to_json()
