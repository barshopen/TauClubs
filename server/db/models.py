from mongoengine import (
    Document,
    StringField,
    ReferenceField,
    EmailField,
    URLField,
    DateTimeField,
    ListField,
    IntField,
)
import json
from mongoengine.base.fields import ObjectIdField

from mongoengine.errors import DoesNotExist
from mongoengine.fields import FloatField


class Club(Document):
    meta = {"collection": "clubs"}
    name = StringField(max_length=50, required=True)
    profileImage = URLField()
    description = StringField(max_length=4296, required=True)
    tags = ListField()  # list of tags
    creationTime = DateTimeField(
        required=True, validation=None
    )  # check validation define
    lastUpdateTime = DateTimeField(validation=None)  # not sure if relevant
    contactMail = StringField(required=True)

    def to_dict(self):
        return {
            "id": str(self.pk),
            "name": self.name,
            "profileImage": self.profileImage,
            "description": self.description,
            "tags": self.tags,
            "creationTime": self.creationTime.isoformat(),
            "lastUpdateTime": self.lastUpdateTime.isoformat(),
            "contactMail": self.contactMail,
            "membersCount": 12,
            "admin": False,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class User(Document):
    firstName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True, primary=True)
    picture = URLField()
    meta = {"collection": "users"}

    def full_name(self):
        return self.firstName + " " + self.lastName

    def to_json(self):
        return json.dumps(self.to_dict())


ROLES = {
    "A": "Admin",
    "U": "User",
}


class ClubMembership(Document):
    club = ReferenceField("Club", unique_with="member")
    clubName = StringField(max_length=50, required=True)
    member = ReferenceField("User")
    memberName = StringField(max_length=71, required=True)
    role = StringField(max_length=35, required=True, choices=ROLES.keys())


class Event(Document):
    meta = {"collection": "events"}
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    duration = FloatField(required=True, validation=None)
    startTime = DateTimeField(required=True)
    location = StringField()
    creatingClub = ReferenceField("Club", max_length=200, required=True)
    creationTime = DateTimeField(required=True, validation=None)
    lastUpdateTime = DateTimeField(required=True, validation=None)
    profileImage = URLField()
    intrested = ListField()
    membersAttending = ListField()

    def to_dict(self):
        return {
            "id": str(self.pk),
            "title": self.title,
            "description": self.description,
            "duration": self.duration,
            "startTime": self.startTime.isoformat(),
            "location": self.location,
            "creationTime": self.creationTime.isoformat(),
            "lastUpdateTime": self.lastUpdateTime.isoformat(),
            "clubName": self.creatingClub.name,
            "profileImage": self.profileImage,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class Tag(Document):
    # validation hex of 6 nibbles(#ABCDEF)
    name = StringField(max_length=200, required=True)
    color = IntField(required=True)
    clubsWithTag = ListField(required=True)  # list of clubs
    meta = {"collection": "tags"}


class Message(Document):
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    creationTime = DateTimeField(required=True)
    lastUpdateTime = DateTimeField(required=True)
    likes = ListField(ObjectIdField)
    creatingClub = ReferenceField("Club", max_length=200, required=True)
    creatingUser = ReferenceField("User", max_length=200, required=True)
    meta = {"collection": "messages"}

    def to_dict(self):
        return {
            "id": str(self.pk),
            "title": self.title,
            "content": self.content,
            "creationTime": self.creationTime.isoformat(),
            "lastUpdateTime": self.lastUpdateTime.isoformat(),
            "likes": self.likes,
            "clubName": self.creatingClub.name,
            "userName": self.creatingUser.full_name(),
            "profileImage": self.creatingClub.profileImage,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


def validatePermession(user_id, club_id):
    try:
        club = Club.objects.get(id=club_id)
        user = User.objects.get(id=user_id)
        membership = ClubMembership.objects(club=club, member=user).first()
        if membership.role != "A":
            return False  # error only admin can create message
        return True
    except DoesNotExist:
        return False  # invalid membership
