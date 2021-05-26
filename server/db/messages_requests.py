from server.db.club import get_club
from server.auth.userauth import get_userauth_user_by_id
from server.db import db_app
from flask_login import login_required, current_user
from flask import request, json
from server.db.models import validatePermession


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
from server.db.clubmembership import clubs_by_user_member, is_user_member


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
