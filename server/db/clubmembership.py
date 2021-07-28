import datetime

from mongoengine.queryset.visitor import Q

from .models import ClubMembership, User, Club, current_time, months_ago
from mongoengine.errors import DoesNotExist, NotUniqueError
from flask import jsonify


def removeMembership(membership):
    membership.delete()
    membership.switch_collection("old_memberships")
    membership.save(force_insert=True)


def get_membership(id: str):
    try:
        return ClubMembership.objects.get(id=id)
    except DoesNotExist:
        return None


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
        requestTime=current_time(),
        approveTime=approveTime,
    )
    membership.save()
    return membership


def join_club(user_email: str, club_id: str):
    user = User.objects.get(contactMail=user_email)
    club = Club.objects.get(pk=club_id)
    try:
        return createPendingMembership(user, club)
    except NotUniqueError:
        return None


def leave_club(membership):
    if membership is None:
        return None
    else:
        removeMembership(membership)
        return "Success"


def delete_membership(club):
    memberships = ClubMembership.objects.filter(club=club)
    list_of_memberships = []
    for membership in memberships:
        list_of_memberships.append(membership.member.to_dict())
        removeMembership(membership)
    return list_of_memberships


def approve_membership(membership, role):
    membership.update(role=role, approveTime=current_time())
    return membership


def genericApproveMembership(membership):
    if membership.role == "U":
        membership.update(role="A", approveTime=current_time())
    else:
        membership.update(role="U", approveTime=current_time())
    membership.save()
    return membership


def createAdminMembership(user_email: str, club: Club):  # change
    user = User.objects.get(contactMail=user_email)
    # check if is member or pending, if yes change it otherwise create
    try:
        membership = ClubMembership.objects(member=user, club=club).first()
        approve_membership(membership, "A")
        return membership
    except Exception:
        return createMembership(user, club, "A")


def createPendingMembership(user: User, club: Club):
    membership = ClubMembership(
        club=club,
        clubName=club.name,
        member=user,
        memberName=f"{user.firstName} {user.lastName}",
        role="P",
        requestTime=current_time().isoformat(),
    )
    membership.save()
    return membership


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


def month_to_num(today_month, month_ago):
    if today_month >= month_ago:
        return today_month - month_ago
    return today_month - month_ago + 12 + 1


def users_by_date(users, start, end):
    counter = 0
    for user in users:
        if user["approveTime"] is not None:
            approveTime = user["approveTime"]
            if approveTime >= start and approveTime <= end:
                counter = counter + 1
    return counter


def users_for_club_six_months(users):
    today = datetime.datetime.today()
    dict = {}
    for i in range(-1, 5):
        before = months_ago(today, i)
        after = months_ago(today, i + 1)
        dict[month_to_num(today.month, i + 1)] = users_by_date(users, after, before)
    return dict


def users_for_club(club):
    return list(
        map(
            lambda membership: membership.member.to_dict_with_membership(
                membership.to_dict()
            ),
            ClubMembership.objects.filter(club=club),
        )
    )


def users_for_clubs(clubs):
    return list(
        map(
            lambda membership: membership.member.to_dict_with_membership(
                membership.to_dict()
            ),
            ClubMembership.objects.filter(club__in=clubs),
        )
    )


def dict_users_and_update_by_club(clubs):
    dict = {}
    for club in clubs:
        dict[club.name] = {"club": club.to_dict()}  # club data
        dict[club.name]["lastUpdate"] = club.lastUpdateTime  # last update time for club
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


def change_club_name(club, club_name):
    memberships = ClubMembership.objects.filter(club=club)
    for membership in memberships:
        membership.update(clubName=club_name)
        membership.save()
