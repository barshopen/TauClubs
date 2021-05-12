from os import path
from server.db.models import Message
from flask import Blueprint, json, request
from server.db.club import establish_club, get_club, get_clubs
from server.db.message import (
    get_message,
    createMessage,
    updateMessageContent,
    updateMessageTitle,
    delete_message,
)
from flask_login import current_user, login_required
from server.auth.userauth import get_userauth_email_by_id, get_userauth_user_by_id


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
    """
    example queries:
    * {mainroute}/club -> returns all clubs
    * {mainroute}/clubs?tag=Math -> returns all clubs that have a 'Math' tag
    * {mainroute}/clubs?name=Foodies -> returns all club that their name containes
        foodies
    * {mainroute}/clubs?name=Foodies&tag=Math -> returns all club that their name
        containes foodies AND have a 'Math' tag
    """
    if club_id:
        return get_club(id=club_id)
    clubs_params = request.args.to_dict()
    return get_clubs(name=clubs_params.get("name"), tag=clubs_params.get("tag"))


@db_app.route("/clubs/<club_id>/messages/<message_title>")
def messages(message_id):
    return get_message(id=message_id)


@login_required
@db_app.route("/clubs/<club_id>/create_message")
def message_creation():
    user = get_userauth_user_by_id(current_user.get_id())
    if user.role != "A":
        return "Restrict", 400
    result = createMessage(
        title=request.form.get("title"),
        content=request.form.get("content"),
        likes=[],
        club=None,  ##problem can extract from path?
        user=user,
    )
    if not result:
        return "Failed", 400

    return result, 200


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_title>/update")
def message_update():
    user = get_userauth_user_by_id(current_user.get_id())
    if user.role != "A":
        return "Restrict", 400

    # can extract club id and message id from path?
    # message=Message.objects(id=message_id)
    title = request.form.get("title")
    content = request.form.get("content")
    if title:
        updateMessageTitle(message, title)
    if content:
        updateMessageContent(message, content)
    return message


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_title>/delete")
def message_delete():
    # can extract club id and message id from path?
    # message=Message.objects(id=message_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if user.role != "A":
        return "Restrict", 400
    delete_message(message_id)


@login_required
@db_app.route("/create_club", methods=["POST"])
def club_creation():
    email = get_userauth_email_by_id(current_user.get_id())
    result = establish_club(
        email,
        name=request.form.get("name"),
        contact_mail=request.form.get("contact_mail"),
        description=request.form.get("description"),
        short_description=request.form.get("short_description"),
    )
    if not result:
        return "Failed", 400

    return result, 200


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
