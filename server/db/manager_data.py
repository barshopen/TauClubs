from server.db.event import dict_two_months_events
from server.db.message import dict_two_months_messages
from server.db.clubmembership import (
    clubs_by_user_manager,
    dict_users_and_update_by_club,
    is_manager,
    users_for_club_six_months,
    users_for_clubs,
)
from flask import Blueprint, json
from flask_login import login_required, current_user
from server.auth.userauth import get_userauth_user_by_id

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
    dict["messages"] = dict_two_months_messages(clubs)
    dict["events"] = dict_two_months_events(clubs)
    dict["clubs"] = dict_users_and_update_by_club(
        clubs
    )  # dict with 3 fields: club info, last update, users that joined last 6 months
    dict["users"] = users_for_clubs(clubs)
    dict["usersByDated"] = users_for_club_six_months(dict["users"])
    return dict


@dashboard_app.route("/isManager")
@login_required
def is_user_manager():
    user = get_userauth_user_by_id(current_user.get_id())
    return is_manager(user)
