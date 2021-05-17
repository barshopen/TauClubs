from os import path
from flask import Blueprint, json, request
from server.db.club import establish_club, get_club, get_clubs
from server.db.message import (
    get_message,
    createMessage,
    updateMessageContent,
    updateMessageTitle,
    delete_message,
)
from server.db.event import (
    createEvent,
    updateEventContent,
    addAttending,
    addIntrested,
    getEvent,
    deleteEvent,
)
from server.db.tag import get_club_with_tag, addTagToClub, delete_tag_to_club
from server.db.models import validatePermession
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
@db_app.route("/clubs/<club_id>", methods=["POST"])
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


@login_required
@db_app.route("/create_club", methods=["POST"])
def club_creation():
    email = get_userauth_email_by_id(current_user.get_id())
    result = establish_club(
        email,
        name=request.json.get("name"),
        contact_mail=request.json.get("contact_mail"),
        description=request.json.get("description"),
        short_description=request.json.get("short_description"),
    )
    if not result:
        return "Failed", 400

    return result, 200


@db_app.route("/clubs/<club_id>/messages/<message_id>", methods=["POST"])
def messagesNew(club_id, message_id):  # after delete update name
    if not club_id:
        return "Failed", 400
    return get_message(id=message_id)


@login_required
@db_app.route("/clubs/<club_id>/create_message", methods=["POST"])
def message_creation(club_id):
    if not validatePermession(current_user.get_id(), club_id):
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    result = createMessage(
        title=request.form.get("title"),
        content=request.form.get("content"),
        club=get_club(club_id),
        user=user,
    )
    return result, 200


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_id>/update", methods=["POST"])
def message_update(club_id, message_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    message = get_message(id=message_id)
    title = request.form.get("title")
    content = request.form.get("content")
    if title:
        updateMessageTitle(message, title)
    if content:
        updateMessageContent(message, content)
    return message


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_id>/delete", methods=["POST"])
def message_delete(club_id, message_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400

    delete_message(message_id)


@db_app.route("/clubs/<club_id>/events/<event_id>", methods=["POST"])
def events(club_id, event_id):  # after delete update name
    if not club_id:
        return "Failed", 400
    return getEvent(id=event_id)


@login_required
@db_app.route("/clubs/<club_id>/create_event", methods=["POST"])
def event_creation(club_id):
    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400

    result = createEvent(
        title=request.form.get("title"),
        duration=request.form.get("duration"),
        club=get_club(club_id),
        description=request.form.get("description"),
        profileImage=request.form.get("profileImage"),  # check if not filed
    )
    if not result:
        return "Failed", 400

    return result, 200


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/update", methods=["POST"])
def event_update(club_id, event_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400

    event = getEvent(event_id)

    title = request.form.get("title")
    description = request.form.get("description")
    duration = request.form.get("duration")
    profileImage = request.form.get("profileImage")
    event = updateEventContent(
        event,
        title=title,
        description=description,
        duration=duration,
        profileImage=profileImage,
    )
    return event


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/delete", methods=["POST"])
def event_delete(club_id, event_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    deleteEvent(event_id)


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/attend", methods=["POST"])
def event_attending(club_id, event_id):
    if not club_id:
        return "Failed", 400

    user = get_userauth_user_by_id(current_user.get_id())

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    event = getEvent(event_id)
    addAttending(event, user)


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/interested", methods=["POST"])
def event_interesting(club_id, event_id):
    if not club_id:
        return "Failed", 400

    user = get_userauth_user_by_id(current_user.get_id())

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    event = getEvent(event_id)
    addIntrested(event, user)


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
