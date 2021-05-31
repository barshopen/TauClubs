from server.db.event import dict_two_months_events
from server.db.message import dict_two_months_messages
from server.db.clubmembership import (
    clubs_by_user_manager,
    dict_users_and_update_by_club,
)
from flask import Blueprint
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
