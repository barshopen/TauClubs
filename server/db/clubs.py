import datetime
from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    ListField,
    URLField,
)


class Club(Document):
    meta = {"collection": "clubs"}
    # id = UUIDField()  # consider ObjectIdField
    name = StringField(max_length=50, required=True)
    profileImage = URLField()
    description = StringField(max_length=4296, required=True)
    shortDescription = StringField(max_length=100)
    tags = ListField()  # list of tags
    creationTime = DateTimeField(
        required=True, validation=None
    )  # check validation define
    lastUpdateTime = DateTimeField(validation=None)  # not sure if relevant
    contactMail = StringField(required=True)


def create_club(
    name: str,
    contact_mail: str,
    description: str = "",
    short_description: str = "",
    tags=None,
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
