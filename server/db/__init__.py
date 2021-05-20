from os import path
from server.db.user import is_user_member
from flask import Blueprint, json, request
from server.db.club import establish_club, get_club, get_clubs

from server.db.message import (
    add_like,
    createMessage,
    get_messages,
    unlike,
    updateMessageContent,
    updateMessageTitle,
    delete_message,
    get_message,
    get_messages_by_club,
)
from server.db.event import (
    createEvent,
    events_by_user,
    get_all_events,
    updateEventContent,
    addAttending,
    addIntrested,
    getEvent,
    deleteEvent,
)
from server.db.models import validatePermession
from server.db.clubmembership import get_user_clubs, join_club

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


@db_app.route("/create_club", methods=["POST"])
@login_required
def club_creation():
    print(current_user.get_id())
    print(request.json)
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


@db_app.route("/clubs")
def clubs():
    """
    example queries:
    * {mainroute}/clubs -> returns all clubs
    * {mainroute}/clubs?tag=Math -> returns all clubs that have a 'Math' tag
    * {mainroute}/clubs?name=Foodies -> returns all club that their name containes
        foodies
    * {mainroute}/clubs?name=Foodies&tag=Math -> returns all club that their name
        containes foodies OR have a 'Math' tag
    """
    clubs_params = request.args.to_dict()
    return get_clubs(name=clubs_params.get("name"), tag=clubs_params.get("tag"))


@db_app.route("/club/<club_id>")
def club_by_id(club_id):
    return get_club(id=club_id).to_json()


@db_app.route("/my_clubs")
@login_required
def my_clubs():
    cur_user_email = get_userauth_email_by_id(current_user.get_id())
    return get_user_clubs(cur_user_email)


@db_app.route("/join_club", methods=["POST"])
@login_required
def join_club_by_id():
    club_id = request.json.get("clubId")
    cur_user_email = get_userauth_email_by_id(current_user.get_id())
    res = join_club(cur_user_email, club_id)
    if not res:
        return "Could not complete request", 400


@db_app.route("/messages")
def all_messages():
    return get_messages()


@login_required
@db_app.route("/clubs/create_message", methods=["POST"])
def message_creation():
    club_id = request.json.get("clubId")
    if not validatePermession(current_user.get_id(), club_id):
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    club = get_club(club_id)
    result = createMessage(
        title=request.json.get("title"),
        content=request.json.get("content"),
        club=club,
        user=user,
    )
    return result, 200


@db_app.route("/clubs/<club_id>/messages/get_messages")
def messages_by_club(club_id):
    if not club_id:
        return "Failed", 400
    club = get_club(club_id)
    return get_messages_by_club(club)


@db_app.route("/clubs/<club_id>/messages/<message_id>")
def message(club_id, message_id):
    if not club_id:
        return "Failed", 400
    return get_message(message_id).to_json()


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_id>/update")
def message_update(club_id, message_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    message = get_message(id=message_id)
    title = request.json.get("title")
    content = request.json.get("content")
    if title:
        updateMessageTitle(message, title)
    if content:
        updateMessageContent(message, content)
    return message.to_dict()


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_id>/delete")
def message_delete(club_id, message_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400

    delete_message(message_id)


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_id>/like")
def like_message(club_id, message_id):
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not is_user_member(user, club):
        return "Failed", 400
    result = add_like(message_id, user)
    return result, 200


@login_required
@db_app.route("/clubs/<club_id>/messages/<message_id>/unlike")
def unlike_message(club_id, message_id):
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not is_user_member(user, club):
        return "Failed", 400
    result = unlike(message_id, user)
    return result, 200


@db_app.route("/upcoming_events")
def upcoming_events():
    return get_all_events()


@db_app.route("/my_events")
def my_events():
    user = get_userauth_user_by_id(current_user.get_id())
    return events_by_user(user)


@db_app.route("/clubs/<club_id>/events/<event_id>")
def get_event(club_id, event_id):
    if not club_id:
        return "Failed", 400
    return getEvent(id=event_id).to_json()


@login_required
@db_app.route("/clubs/create_event", methods=["POST"])
def event_creation():
    club_id = request.json.get("clubId")
    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    result = createEvent(
        title=request.json.get("title"),
        description=request.json.get("description"),
        duration=request.json.get("duration"),
        startTime=request.json.get("startTime"),
        location=request.json.get("location"),
        club=get_club(club_id),
        profileImage=request.json.get("profileImage"),
    )
    if not result:
        return "Failed", 400

    return result, 200


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/update")
def event_update(club_id, event_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400

    event = getEvent(event_id)

    title = request.json.get("title")
    description = request.json.get("description")
    duration = request.json.get("duration")
    profileImage = request.json.get("profileImage")
    startTime = request.json.get("startTime")
    location = request.json.get("location")
    event = updateEventContent(
        event,
        title=title,
        description=description,
        duration=duration,
        profileImage=profileImage,
        startTime=startTime,
        location=location,
    )
    return event.to_json(), 200


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/delete")
def event_delete(club_id, event_id):
    if not club_id:
        return "Failed", 400

    if not validatePermession(current_user.get_id(), club_id):
        return "Restrict", 400
    deleteEvent(event_id)


def validate_user_event_permession(club_id, event_id):
    if not club_id:
        return None
    user = get_userauth_user_by_id(current_user.get_id())
    club = get_club(club_id)
    if not is_user_member(user, club):
        return None
    event = getEvent(event_id)
    return event, user


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/attend")
def event_attending(club_id, event_id):
    event, user = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    addAttending(event, user)
    return event.to_json()


@login_required
@db_app.route("/clubs/<club_id>/messages/<event_id>/interested")
def event_interesting(club_id, event_id):
    event, user = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    addIntrested(event, user)
    return event.to_json()


######################################################
# how do we us it?


@db_app.route("/users")
@db_app.route("/users/<user_id>")
def users(user_id: str = ""):
    data = get_json_data("users.json")
    return filter_by_id(data, user_id)


@db_app.route("/check")
@db_app.route("/users/<user_id>")
def check():
    return "check"
