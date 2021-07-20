import datetime

from .models import ClubMembership, User, Club, months_ago
from mongoengine.errors import DoesNotExist, NotUniqueError
from flask import jsonify
from mongoengine.queryset.visitor import Q


def createMembership(user, club, role):
    approveTime = None
    if role == "A":
        approveTime = current_time()
    membership = ClubMembership(
        club=club,
        clubName=club.name,
        member=user,
        memberName=f"{user.firstName} {user.lastName}",
        role=role,
        RequestTime=current_time(),
        approveTime=approveTime,
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
        clubmembership = ClubMembership.objects(member=user, role="A").first()
        dict["manager"] = clubmembership is not None
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


def users_for_club_between_dates(club, before, after):  # change to request time
    before_Q = Q(approveTime__lte=before, club=club)  # bigger
    after_Q = Q(approveTime__gte=after, club=club)
    return ClubMembership.objects.filter(after_Q & before_Q).count()


def month_to_num(today_month, month_ago):
    if today_month >= month_ago:
        return today_month - month_ago
    return today_month - month_ago + 12 + 1


def current_time():
    return datetime.datetime.now().replace(tzinfo=datetime.timezone.utc)


def users_for_club_six_months(club):
    today = datetime.datetime.today()
    dict = {}
    for i in range(-1, 5):
        before = months_ago(today, i)
        after = months_ago(today, i + 1)
        dict[month_to_num(today.month, i + 1)] = users_for_club_between_dates(
            club, before, after
        )
    return dict


def users_for_club(club):
    return list(
        map(
            lambda membership: membership.member.to_dict(),
            ClubMembership.objects.filter(club=club),
        )
    )


def dict_users_and_update_by_club(clubs):
    dict = {}
    for club in clubs:
        dict[club.name] = {"club": club.to_dict()}  # club data
        dict[club.name]["lastUpdate"] = club.lastUpdateTime  # last update time for club
        dict[club.name]["users"] = users_for_club(club)  # member for the club
        dict[club.name]["usersByDated"] = users_for_club_six_months(club)
    return dict


def is_member(user, club):
    try:
        membership = ClubMembership.objects(club=club, member=user)
        print(membership.role)
        return True
    except Exception:
        return False


def remove_club_from_user(membership):
    membership.delete()


def approve(club, user, answer):
    membership = ClubMembership.objects(member=user, club=club)
    membership.update(role=answer, approveTime=current_time())
    # If user was approved as user and now he is approved as manager
    # the approve time changes
