from mongoengine.errors import DoesNotExist, ValidationError
from server.db.models import Club, Tag


def is_valid_tag(tag_id: str):
    try:
        Tag.objects.get(id=tag_id)
    except DoesNotExist:
        raise ValidationError("Not valid tag")


def is_valid_club(club_id: str):
    try:
        Club.objects.get(id=club_id)
    except DoesNotExist:
        raise ValidationError("Not valid tag")


def member_name_of_user(user, name):
    if f"{user.firstName} {user.lastName}" != name:
        raise ValidationError("User name is different from name")


def is_hex_color(s):
    try:
        if s and int(s, 16) and len(s) > 6:
            raise ValidationError("Not valid color")
    except ValueError:
        raise ValidationError("Not valid color")
