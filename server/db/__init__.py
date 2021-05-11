from os import path
from flask import Blueprint, json
from server.db.club import create_club, get_club, get_clubs

# from .users import User
# from .events import Event
# from .tags import Tag
# from .messages import Message


STATIC_FOLDER_NAME = "mock-api"

db_app = Blueprint(
    "db_app",
    __name__,
    url_prefix="/db",
)


def get_json_data(filename):
    pathname = path.join(path.dirname(__file__), STATIC_FOLDER_NAME, filename)
    with open(pathname, "r") as f:
        return json.load(f)


def filter_by_id(data, data_id):
    if data_id:
        d = json.dumps([x for x in data if x["id"] == data_id][0])
        return d
    return json.dumps(data)


@db_app.route("/clubs", defaults={"club_id": ""})
@db_app.route("/clubs/<club_id>")
def clubs(club_id):
    if club_id:
        return get_club(id=club_id).to_json()  # still buggy to do fix
    return get_clubs().to_json()


@db_app.route("/create_club")
def club_creation():
    result = create_club("test", "a@b.com")
    print(result)
    if not result:
        return "Failed", 400

    return "OK", 200


@db_app.route("/messagesv2")
def messagesv2(message_id: str = ""):
    data = get_json_data("messages.json")
    return filter_by_id(data, message_id)


@db_app.route("/messages")
@db_app.route("/messages/<message_id>")
def messages(message_id: str = ""):
    data = get_json_data("messages.json")
    return filter_by_id(data, message_id)


@db_app.route("/upcoming_events")
@db_app.route("/upcoming_events/<event_id>")
def upcoming_events(event_id: str = ""):
    data = get_json_data("upcoming_events.json")
    return filter_by_id(data, event_id)


@db_app.route("/users")
@db_app.route("/users/<user_id>")
def users(user_id: str = ""):
    data = get_json_data("users.json")
    return filter_by_id(data, user_id)


@db_app.route("/check")
@db_app.route("/users/<user_id>")
def check():
    return "check"
