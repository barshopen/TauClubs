from server.db import db_app
from server.db.clubmembership import clubs_by_user_member, is_user_member

from flask import request
from server.db.club import get_club
import datetime
from server.db.event import (
    createEvent,
    events_by_user,
    get_events_by_club,
    get_events_for_all_clubs_by_user,
    updateEventContent,
    addAttending,
    addIntrested,
    getEvent,
    deleteEvent,
)
from server.db.models import validatePermession
from flask_login import current_user, login_required
from server.auth.userauth import get_userauth_user_by_id


def validate_user_event_permession(club_id, event_id):
    if not club_id:
        return None
    club = get_club(club_id)
    user = get_userauth_user_by_id(current_user.get_id())
    if not is_user_member(user, club):
        return None
    event = getEvent(event_id)
    return event


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
        profileImage=request.json.get("profileImage"),
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
@db_app.route("/club/<club_id>/messages/<event_id>/delete")
def event_delete(club_id, event_id):
    if not club_id:
        return "Failed", 400

    user = get_userauth_user_by_id(current_user.get_id())
    if not validatePermession(user, club_id):
        return "Restrict", 400
    deleteEvent(event_id)


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
@db_app.route("/club/<club_id>/messages/<event_id>/interested")
def event_interesting(club_id, event_id):
    event = validate_user_event_permession(club_id, event_id)
    if not event:
        return "Failed", 400
    user = get_userauth_user_by_id(current_user.get_id())
    addIntrested(event, user)
    return event.to_json()
