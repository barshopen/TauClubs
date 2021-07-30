from os import path
import os
from server.db.mailMessages import (
    approve_manager_message,
    approve_user_message,
    delete_club_message,
    remove_by_admin,
    user_to_manager_message,
)
from server.db.user import update
from server.db.clubmembership import (
    clubs_by_user_member,
    genericApproveMembership,
    get_membership,
    is_member,
    is_user_member,
    leave_club,
)
from flask import Blueprint, json, request
from server.db.club import (
    add_image_to_club,
    delete_club,
    edit_club,
    establish_club,
    example_club,
    get_club,
    get_clubs,
)
import datetime


from server.db.message import (
    add_like,
    createMessage,
    get_messages_for_all_clubs_by_user,
    unlike,
    updateMessage,
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
from server.db.models import validatePermession, validatePermessionByClub
from server.db.clubmembership import get_user_clubs, join_club
from server.db.tag import add_tags, tags_for_club
from flask_login import current_user, login_required
from server.auth.userauth import get_userauth_user_by_id
from flask import send_file
from flask_mail import Mail, Message

STATIC_FOLDER_NAME = "mock-api"

db_app = Blueprint(
    "db_app",
    __name__,
    url_prefix="/db",
)

mail = Mail()


def mail_init(app):
    mail.init_app(app)


def send_message_text(recipients, subject, body):
    msg = Message(
        subject=subject,
        sender=os.getenv("EMAIL_USER"),
        recipients=recipients,
        body=body,
    )
    path = os.path.join(os.getcwd(), "frontend", "public", "images", "logo.jpeg")
    f = open(path, "rb")
    msg.attach("logo.jpeg", "image/jpeg", f.read(), "inline")
    mail.send(msg)


def send_mail_approve(receivers, club_name, role):
    for receive in receivers:
        if role == "p":
            head, text = approve_user_message(receive["name"], club_name)
        else:
            head, text = approve_manager_message(receive["name"], club_name)
        send_message_text([receive["contactMail"]], head, text)


def send_mail_delete_by_manager(receivers, club_name):
    for receive in receivers:
        head, text = remove_by_admin(receive["name"], club_name)
        send_message_text([receive["contactMail"]], head, text)


def send_delete_club(receivers, club_name):
    head, text = delete_club_message(club_name)
    mails = []
    for receive in receivers:
        mails.append(receive["contactMail"])
    send_message_text(mails, head, text)


def get_json_data(filename):
    pathname = path.join(path.dirname(__file__), STATIC_FOLDER_NAME, filename)
    with open(pathname, "r") as f:
        return json.load(f)


def filter_by_id(data, data_id):
    if data_id:
        d = json.dumps([x for x in data if x["id"] == data_id][0])
        return d
    return json.dumps(data)


def send_mail_user_to_manager(club_name, membername, clubMail, title, info, userMail):
    text = user_to_manager_message(info, membername, userMail, club_name)
    send_message_text([clubMail], title, text)


@db_app.route("/contactus", methods=["POST"])
def send_mail_to_club():
    try:
        clubMail = request.json["data"]["contactMail"]
        title = request.json["data"]["title"]
        info = request.json["data"]["info"]
        userMail = request.json["data"]["mail"]
        membername = request.json["data"]["name"]
        club_name = request.json["data"]["clubName"]
        send_mail_user_to_manager(
            club_name, membername, clubMail, title, info, userMail
        )
        return "Success", 200
    except Exception:
        return "Failed", 400


@db_app.route("/default_clubs")
@login_required
def all_clubs():
    return example_club()


@db_app.route("/create_club", methods=["POST"])
@login_required
def club_creation():
    user = get_userauth_user_by_id(current_user.get_id())
    if request.form.get("image") == "None":
        image = None
    else:
        image = request.files["image"]
    if request.form["tags"] == "":
        tags = None
    else:
        tags = request.form["tags"].split(",")
    result = establish_club(
        image=image,
        foundingUserEmail=user.contactMail,
        name=request.form["club_name"],
        contact_mail=request.form["contact_mail"],
        description=request.form["description"],
        tags=tags,
    )
    if not result:
        return "Failed", 400
    return result, 200


@db_app.route("/club/delete", methods=["POST"])
@login_required
def deleteClub():
    try:
        club_id = request.json.get("clubId")
        if not club_id:
            return "invalid club", 400
        club = get_club(club_id)
        user = get_userauth_user_by_id(current_user.get_id())
        if not validatePermession(user, club_id):
            return "Failed", 400
        list_memberships = delete_club(club)
        send_delete_club(list_memberships, club.name)
        return "Success", 200
    except Exception:
        return "Failed", 400


@db_app.route("/club/edit", methods=["POST"])
@login_required
def editClub():  # write

    club_id = request.form["clubId"]
    if not club_id:
        return "invalid club", 400
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Failed", 400
    name = request.form["club_name"]
    contact_mail = request.form["contact_mail"]
    description = request.form["description"]
    tags = request.form["tags"]
    try:
        image = request.files["image"]
    except Exception:
        image = "None"
    edit_club(club, name, contact_mail, description, image, tags)
    if image != "None":
        send_file(image, download_name="club.jpg", max_age=20000000)
    return "Success", 200


@db_app.route("/club/add_image", methods=["POST"])
@login_required
def add_image():
    club_id = request.form["clubId"]

    if not club_id:
        return "invalid club", 400
    club = get_club(club_id)
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
    return get_clubs(name=clubs_params.get("search"), tag=clubs_params.get("search"))


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
    club = get_club(club_id)
    if not club:
        return "Not valid club id", 400
    if is_member(user, club):
        return "Already member", 200
    res = join_club(cur_user_email, club_id).to_json()
    if not res:
        return "Could not complete request", 400
    return "Success", 200


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
def all_messages_for_user():
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


@db_app.route("/club/<club_id>/messages/get_messages")
def messages_by_club(club_id):
    if not club_id:
        return "Failed", 400
    club = get_club(club_id)
    if not club:
        return "Failed", 400
    return get_messages_by_club(club)


@db_app.route("/club/<club_id>/messages/<message_id>")
def message(club_id, message_id):
    if not club_id:
        return "Failed", 400
    return get_message(message_id).to_json()


@login_required
@db_app.route("/club/message/update", methods=["POST"])
def message_update():
    club_id = request.json.get("clubId")
    if not club_id:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400
    message_id = request.json.get("data")["messageId"]
    message = get_message(id=message_id)
    try:
        title = request.json.get("data")["message_title"]
    except Exception:
        title = None
    try:
        content = request.json.get("data")["message_content"]
    except Exception:
        content = None
    message = updateMessage(message, title, content)
    return message.to_dict()


@login_required
@db_app.route("/club/message/delete", methods=["POST"])
def message_delete():
    try:
        club_id = request.json.get("clubId")
        if not club_id:
            return "Failed", 400
        user = get_userauth_user_by_id(current_user.get_id())
        if not validatePermession(user, club_id):
            return "Restrict", 400
        message_id = request.json.get("eventId")
        delete_message(message_id)
        return "SUCCESS", 200
    except Exception:
        return "Failed", 400


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
        startTime=datetime.datetime.strptime(
            request.json.get("data")["event_startDateTime"], "%Y-%m-%dT%H:%M"
        ).replace(tzinfo=datetime.timezone.utc),
        endTime=datetime.datetime.strptime(
            request.json.get("data")["event_endDateTime"], "%Y-%m-%dT%H:%M"
        ).replace(tzinfo=datetime.timezone.utc),
        location=request.json.get("data")["event_location"],
        club=get_club(club_id),
    )
    if not result:
        return "Failed", 400

    return result, 200


@db_app.route("/club/<club_id>/events/get_events")
def events_by_club(club_id):
    if not club_id:
        return "Failed", 400
    club = get_club(club_id)
    if not club:
        return "Failed", 400
    return get_events_by_club(club)


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


@db_app.route("/club/event/update", methods=["POST"])
@login_required
def event_update():
    club_id = request.json.get("clubId")
    if not club_id:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400
    try:
        event_id = request.json.get("data")["eventId"]
    except Exception:
        return "Not valid event", 400
    event = getEvent(event_id)
    try:
        title = request.json.get("data")["event_title"]
    except Exception:
        title = None
    try:
        description = request.json.get("data")["event_description"]
    except Exception:
        description = None
    try:
        startTime = datetime.datetime.strptime(
            request.json.get("data")["event_startDateTime"], "%Y-%m-%dT%H:%M"
        ).replace(tzinfo=datetime.timezone.utc)
    except Exception:
        startTime = None
    try:
        endTime = datetime.datetime.strptime(
            request.json.get("data")["event_endDateTime"], "%Y-%m-%dT%H:%M"
        ).replace(tzinfo=datetime.timezone.utc)
    except Exception:
        endTime = None
    try:
        location = request.json.get("data")["event_location"]
    except Exception:
        location = None
    event = updateEventContent(
        event,
        title=title,
        description=description,
        startTime=startTime,
        endTime=endTime,
        location=location,
    )
    return event.to_json(), 200


@db_app.route("/club/event/delete", methods=["POST"])
@login_required
def event_delete():
    try:
        club_id = request.json.get("clubId")
        if not club_id:
            return "Failed", 400
        event_id = request.json.get("eventId")
        user = get_userauth_user_by_id(current_user.get_id())
        if not validatePermession(user, club_id):
            return "Restrict", 400
        deleteEvent(event_id)
        return "Success", 200
    except Exception:
        return "Failed", 400


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
@db_app.route("/club/<club_id>/events/<event_id>/interested")
def event_interesting(club_id, event_id):
    event = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    addIntrested(event, user)
    return event.to_json()


@login_required
@db_app.route("/club/<club_id>/events/<event_id>/uninterested")
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


@db_app.route("/club/<club_id>/tags")
def tags(club_id):
    club = get_club(club_id)
    return tags_for_club(club)


@login_required
@db_app.route("/club/addtags", methods=["POST"])
def add_tag(club_id):
    try:
        club_id = request.json.get("clubId")
        club = get_club(club_id)
        user = get_userauth_user_by_id(current_user.get_id())
        if not validatePermession(user, club_id):
            return "Restrict", 400
        tags = request.json.get("tags")
        club = add_tags(club_id, club, tags)
        return club.to_json()
    except Exception:
        return "Failed", 200


@login_required
@db_app.route("/approve", methods=["POST"])
def approve_users():
    manager = get_userauth_user_by_id(current_user.get_id())
    try:
        memberships = request.json
        for membership_id in memberships:
            membership = get_membership(membership_id)
            club = membership.club
            if (
                not club
                or not validatePermessionByClub(manager, club)
                or membership is None
            ):
                return "Restrict", 400
            membership = genericApproveMembership(membership)
            send_mail_approve([membership.member.to_dict()], club.name, membership.role)
            return "Success", 200
    except Exception:
        return "Failed", 400


@login_required
@db_app.route("/unapprove", methods=["POST"])
def unapprove_users():
    manager = get_userauth_user_by_id(current_user.get_id())
    try:
        memberships = request.json
        for membership_id in memberships:
            membership = get_membership(membership_id)
            club = membership.club
            if (
                not club
                or not validatePermessionByClub(manager, club)
                or membership is None
            ):
                return "Restrict", 400
            leave_club(membership)
            send_mail_delete_by_manager([membership.member.to_dict()], club.name)
            return "Success", 200
    except Exception:
        return "Failed", 400


@login_required
@db_app.route("/updateuser", methods=["POST"])
def update_user_data():
    user = get_userauth_user_by_id(current_user.get_id())
    try:
        update(
            user,
            request.json.get("firstName"),
            request.json.get("lastName"),
            request.json.get("phone"),
            request.json.get("country"),
        )
        return "Success", 200
    except Exception:
        return "failed", 400


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


@db_app.route("/users")
@db_app.route("/users/<user_id>")
def users(user_id: str = ""):
    data = get_json_data("users.json")
    return filter_by_id(data, user_id)


@db_app.route("/check")
@db_app.route("/users/<user_id>")
def check():
    return "check"
