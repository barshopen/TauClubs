from os import path
from server.db.clubmembership import (
    clubs_by_user_member,
    is_user_member,
    leave_club,
)
from flask import Blueprint, json, request
from server.db.club import add_image_to_club, establish_club, get_club, get_clubs
import datetime


from server.db.message import (
    add_like,
    createMessage,
    get_messages_for_all_clubs_by_user,
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
    get_events_by_club,
    get_events_for_all_clubs_by_user,
    undoAttending,
    undoIntrested,
    updateEventContent,
    addAttending,
    addIntrested,
    getEvent,
    deleteEvent,
)
from server.db.models import validatePermession
from server.db.clubmembership import get_user_clubs, join_club
from server.db.tag import delete_tag_to_club, tags_for_club
from flask_login import current_user, login_required
from server.auth.userauth import get_userauth_user_by_id
from flask import send_file

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
    user = get_userauth_user_by_id(current_user.get_id())
    if request.form.get("image") == "None":
        image = None
    else:
        image = request.files["image"]
    result = establish_club(
        image=image,
        foundingUserEmail=user.contactMail,
        name=request.form["club_name"],
        contact_mail=request.form["contact_mail"],
        description=request.form["description"],
    )
    if not result:
        return "Failed", 400
    return result, 200


@db_app.route("/club/add_image", methods=["POST"])
@login_required
def add_image():
    club_id = request.form["clubId"]
    club = get_club(club_id)
    if not club_id:
        return "invalid club", 400
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Failed", 400
    try:
        image = request.files["image"]
        add_image_to_club(image, club)
        return "Success", 200
    except Exception:
        return "Failed", 400


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
    user = get_userauth_user_by_id(current_user.get_id())
    return get_user_clubs(user)


@db_app.route("/join_club", methods=["POST"])
@login_required
def join_club_by_id():
    club_id = request.json.get("clubId")
    user = get_userauth_user_by_id(current_user.get_id())
    cur_user_email = user.contactMail
    res = join_club(cur_user_email, club_id).to_json()
    if not res:
        return "Could not complete request", 400
    return res, 200


@db_app.route("/leave_club", methods=["POST"])
@login_required
def remove_club_by_id():
    user = get_userauth_user_by_id(current_user.get_id())
    club = get_club(request.json.get("clubId"))
    if not leave_club(user, club):
        return "Could not complete request", 400
    return "Success", 200


@db_app.route("/messages")
@login_required
def all_messages():
    user = get_userauth_user_by_id(current_user.get_id())
    clubs = clubs_by_user_member(user)
    return json.dumps(get_messages_for_all_clubs_by_user(clubs))


@login_required
@db_app.route("/club/create_message", methods=["POST"])
def message_creation():
    club_id = request.json.get("clubId")
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Failed", 400
    club = get_club(club_id)
    result = createMessage(
        title=request.json.get("data")["message_title"],
        content=request.json.get("data")["message_content"],
        club=club,
        user=user,
    )
    return result.to_json(), 200


@db_app.route("/upcoming_events")
@login_required
def upcoming_events():
    user = get_userauth_user_by_id(current_user.get_id())
    clubs = clubs_by_user_member(user)
    return get_events_for_all_clubs_by_user(clubs)


@login_required
@db_app.route("/club/create_event", methods=["POST"])
def event_creation():
    club_id = request.json.get("clubId")
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400
    result = createEvent(
        title=request.json.get("data")["event_title"],
        description=request.json.get("data")["event_description"],
        duration=request.json.get("duration"),
        startTime=datetime.datetime.strptime(
            request.json.get("data")["event_startDateTime"], "%Y-%m-%dT%H:%M"
        ),
        location=request.json.get("location"),
        club=get_club(club_id),
    )
    if not result:
        return "Failed", 400

    return result, 200


@db_app.route("/club/<club_id>/messages/get_messages")
def messages_by_club(club_id):
    if not club_id:
        return "Failed", 400
    club = get_club(club_id)
    return get_messages_by_club(club)


@db_app.route("/club/<club_id>/events/get_events")
def events_by_club(club_id):
    if not club_id:
        return "Failed", 400
    club = get_club(club_id)
    return get_events_by_club(club)


@db_app.route("/club/<club_id>/messages/<message_id>")
def message(club_id, message_id):
    if not club_id:
        return "Failed", 400
    return get_message(message_id).to_json()


@login_required
@db_app.route("/club/<club_id>/messages/<message_id>/update")
def message_update(club_id, message_id):
    if not club_id:
        return "Failed", 400

    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
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
@db_app.route("/club/<club_id>/messages/<message_id>/delete")
def message_delete(club_id, message_id):
    if not club_id:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400

    delete_message(message_id)


@login_required
@db_app.route("/club/<club_id>/messages/<message_id>/like")
def like_message(club_id, message_id):
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not is_user_member(user, club):
        return "Failed", 400
    result = add_like(message_id, user)
    return result, 200


@login_required
@db_app.route("/club/<club_id>/messages/<message_id>/unlike")
def unlike_message(club_id, message_id):
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not is_user_member(user, club):
        return "Failed", 400
    result = unlike(message_id, user)
    return result, 200


@login_required
@db_app.route("/my_events")
def my_events():
    user = get_userauth_user_by_id(current_user.get_id())
    return events_by_user(user)


@db_app.route("/club/<club_id>/events/<event_id>")
def get_event(club_id, event_id):
    if not club_id:
        return "Failed", 400
    return getEvent(id=event_id).to_json()


@login_required
@db_app.route("/club/<club_id>/messages/<event_id>/update")
def event_update(club_id, event_id):
    if not club_id:
        return "Failed", 400

    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400

    event = getEvent(event_id)

    title = request.json.get("title")
    description = request.json.get("description")
    duration = request.json.get("duration")
    startTime = request.json.get("startTime")
    location = request.json.get("location")
    event = updateEventContent(
        event,
        title=title,
        description=description,
        duration=duration,
        startTime=startTime,
        location=location,
    )
    return event.to_json(), 200


@login_required
@db_app.route("/club/<club_id>/messages/<event_id>/delete")
def event_delete(club_id, event_id):
    if not club_id:
        return "Failed", 400

    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400
    deleteEvent(event_id)


def validate_user_event_permession(club_id, event_id):
    if not club_id:
        return None
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not is_user_member(user, club):
        return None
    event = getEvent(event_id)
    return event


@login_required
@db_app.route("/club/<club_id>/messages/<event_id>/attend")
def event_attending(club_id, event_id):
    event = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    addAttending(event, user)
    return event.to_json()


@login_required
@db_app.route("/club/<club_id>/messages/<event_id>/unattend")
def event_not_attending(club_id, event_id):
    event = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    undoAttending(event, user)
    return event.to_json()


@login_required
@db_app.route("/club/<club_id>/messages/<event_id>/interested")
def event_interesting(club_id, event_id):
    event = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    addIntrested(event, user)
    return event.to_json()


@login_required
@db_app.route("/club/<club_id>/messages/<event_id>/uninterested")
def event_not_interesting(club_id, event_id):
    event = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    undoIntrested(event, user)
    return event.to_json()


@db_app.route("/images/<club_id>")
def get_image_club(club_id):
    club = get_club(club_id)
    image = club.profileImage
    return send_file(image, download_name="club.jpg", max_age=20000000)


###########################################################################


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


@db_app.route("/users")
@db_app.route("/users/<user_id>")
def users(user_id: str = ""):
    data = get_json_data("users.json")
    return filter_by_id(data, user_id)


@db_app.route("/check")
@db_app.route("/users/<user_id>")
def check():
    return "check"
