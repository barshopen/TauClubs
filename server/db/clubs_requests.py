from server.db.club import establish_club, get_club, get_clubs
from server.auth.userauth import get_userauth_user_by_id
from server.db import db_app
from flask_login import login_required, current_user
from flask import request
from server.db.clubmembership import (
    is_member,
    remove_club_from_user,
)
from server.db.clubmembership import get_user_clubs, join_club


@db_app.route("/create_club", methods=["POST"])
@login_required
def club_creation():
    user = get_userauth_user_by_id(current_user.get_id())
    email = user.contactMail
    result = establish_club(
        email,
        name=request.json.get("club_name"),
        contact_mail=request.json.get("contact_mail"),
        description=request.json.get("description"),
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
    if not is_member(user, club):
        return "Already member", 200
    res = join_club(cur_user_email, club_id).to_json()
    if not res:
        return "Could not complete request", 400
    return res, 200


@db_app.route("/remove_club", methods=["POST"])
@login_required
def remove_club_by_id():
    club_id = request.json.get("clubId")
    user = get_userauth_user_by_id(current_user.get_id())
    club = get_club(club_id)
    if not club:
        return "Not valid club id", 400
    membership = is_member(user, club)
    if not membership:
        return "Not a member in the club", 400
    remove_club_from_user(membership)
    return 200
