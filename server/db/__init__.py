from os import path
from flask import Blueprint, json
from server.db.club import get_club
from server.db.models import validatePermession
from server.db.tag import delete_tag_to_club, tags_for_club
from flask_login import current_user, login_required
from server.auth.userauth import get_userauth_user_by_id


STATIC_FOLDER_NAME = "mock-api"

db_app = Blueprint(
    "db_app",
    __name__,
    url_prefix="/db",
)


@db_app.route("/club/<club_id>/tags")
def tags(club_id):
    club = get_club(club_id)
    return tags_for_club(club)


@login_required
@db_app.route("/club/<club_id>/tags/<tag_id>")
def remove_tag(club_id, tag_id):
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400
    delete_tag_to_club(club_id, tag_id)
    club = get_club(club_id)
    return club.to_json()


######################################################
# how do we us it?


def get_json_data(filename):
    pathname = path.join(path.dirname(__file__), STATIC_FOLDER_NAME, filename)
    with open(pathname, "r") as f:
        return json.load(f)


def filter_by_id(data, data_id):
    if data_id:
        d = json.dumps([x for x in data if x["id"] == data_id][0])
        return d
    return json.dumps(data)


@db_app.route("/users")
@db_app.route("/users/<user_id>")
def users(user_id: str = ""):
    data = get_json_data("users.json")
    return filter_by_id(data, user_id)


@db_app.route("/check")
@db_app.route("/users/<user_id>")
def check():
    return "check"
