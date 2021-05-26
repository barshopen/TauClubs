from server.db.user import get_user
from server.db.models import validatePermession
from server.db.club import get_club
from server.db.event import dict_two_months_events
from server.db.message import dict_two_months_messages
from server.db.clubmembership import (
    approve,
    clubs_by_user_manager,
    dict_users_and_update_by_club,
)
from flask import Blueprint, request
from flask_login import login_required, current_user
from server.auth.userauth import get_userauth_user_by_id
from server.db import db_app

dashboard_app = Blueprint(
    "dashboard_app",
    __name__,
    url_prefix="/dashboard",
)


@dashboard_app.route("/data")
@login_required
def clubs_for_manager():
    user = get_userauth_user_by_id(current_user.get_id())
    dict = {}
    clubs = clubs_by_user_manager(user)  # list of clubs that user manage
    dict["messages"] = dict_two_months_messages(
        clubs
    )  # dict of 6 months of all messages by the clubs, by month and not by club
    dict["events"] = dict_two_months_events(
        clubs
    )  # dict of 2 months of all events by the clubs, by month and not by club
    dict["clubs"] = dict_users_and_update_by_club(
        clubs
    )  # dict with 3 fields: club info, last update, users that joined last 6 months
    print(dict)
    return dict


@login_required
@db_app.route("/approve", methods=["POST"])
def approve_user():
    club_id = request.json.get("clubId")
    user_id = request.json.get("userId")
    if not club_id or user_id:
        return "Failed", 400
    manager = get_userauth_user_by_id(current_user.get_id())
    club = get_club(club_id)
    if not club or not validatePermession(manager, club_id):
        return "Restrict", 400
    user = get_user(user_id)
    approve(club, user, "U")
    return 200


@login_required
@db_app.route("/approve", methods=["POST"])
def approve_manager():
    club_id = request.json.get("clubId")
    user_id = request.json.get("userId")
    if not club_id or user_id:
        return "Failed", 400
    manager = get_userauth_user_by_id(current_user.get_id())
    club = get_club(club_id)
    if not club or not validatePermession(manager, club_id):
        return "Restrict", 400
    user = get_user(user_id)
    approve(club, user, "A")
    return 200
