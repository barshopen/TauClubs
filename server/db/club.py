import datetime
from bson.objectid import ObjectId
import json
from mongoengine.queryset.visitor import Q
from .models import Club


def create_club(
    name: str,
    contact_mail: str,
    description: str = "",
    short_description: str = "",
    tags=[],
):
    now = datetime.datetime.utcnow()
    club = Club(
        contactMail=contact_mail,
        name=name,
        description=description,
        shortDescription=short_description,
        tags=tags,
        creationTime=now,
        lastUpdateTime=now,
    )

    return club.save(force_insert=True)


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
