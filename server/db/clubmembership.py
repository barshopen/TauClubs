import datetime
from .models import ClubMembership, User, Club, months_ago
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


def leave_club(user, club):
    membership = ClubMembership.objects(member=user, club=club)
    if membership is None:
        return None
    else:
        membership.delete()
        return "Success"


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
    dict = {}
    try:
        ClubMembership.objects(member=user)
        dict["manager"] = True
    except DoesNotExist:
        dict["manager"] = False
    return dict


def clubs_by_user_manager(user):
    # return all clubs that the user manage
    return list(
        map(
            lambda memberships: memberships.club,
            ClubMembership.objects.filter(member=user, role="A"),
        )
    )


def clubs_by_user_member(user):
    # return all clubs that the user manage
    return list(
        map(
            lambda memberships: memberships.club,
            ClubMembership.objects.filter(member=user),
        )
    )


def users_for_club_between_dates(club, before, after):
    return list(
        map(
            lambda membership: membership.member.to_dict(),
            ClubMembership.objects.filter(club=club),
        )
    )


def dict_users_and_update_by_club(clubs):
    today = datetime.datetime.today()
    after = months_ago(today, 6)
    dict = {}
    for club in clubs:
        dict[club.name] = {"çlub": club.to_dict()}  # club data
        dict[club.name][
            "last_update"
        ] = club.lastUpdateTime  # last update time for club
        dict[club.name]["users"] = users_for_club_between_dates(
            club, today, after
        )  # member for the club between dates, why not all?
    return dict
