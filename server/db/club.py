import datetime
from bson.objectid import ObjectId
import json
from mongoengine.queryset.visitor import Q
from .models import Club
from .clubmembership import createAdminMembership


def create_club(
    club_name: str,
    contact_mail: str,
    description: str = "",
    short_description: str = "",
    tags=[],
) -> Club:
    now = datetime.datetime.utcnow()
    club = Club(
        contactMail=contact_mail,
        name=club_name,
        description=description,
        shortDescription=short_description,
        tags=tags,
        creationTime=now,
        lastUpdateTime=now,
    )
    return club.save(force_insert=True)


def establish_club(
    foundingUserEmail: str,
    name: str,
    contact_mail: str,
    description: str = "",
    short_description: str = "",
    tags=None,
):
    newclub = create_club(name, contact_mail, description, short_description, tags)
    membership = createAdminMembership(foundingUserEmail, newclub)
    return membership.clubName


def get_clubs(name: str, tag: str):
    name_Q = Q(name__contains=name) if name else Q()
    tags_Q = Q(tags=tag) if tag else Q()
    return json.dumps(
        list(
            map(
                lambda club: club.to_dict(),
                Club.objects.filter(name_Q & tags_Q),
            )
        )
    )


def get_club(id: str):
    return Club.objects.get(_id=ObjectId(id)).to_json()


def members_count(club: Club):
    return Club.objects.get(pk=ObjectId(id)).count()