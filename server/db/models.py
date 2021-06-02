import datetime
from bson.objectid import ObjectId
from mongoengine import (
    Document,
    StringField,
    ReferenceField,
    EmailField,
    URLField,
    DateTimeField,
    ListField,
    IntField,
    ImageField,
)
import json
from mongoengine.base.fields import ObjectIdField
from flask import send_file
from mongoengine.errors import DoesNotExist
from mongoengine.fields import FloatField


def names_of_tags(listTags):
    re = []
    for tag_id in listTags:
        re.append(Tag.objects.get(pk=tag_id).to_dict())
    return re


class Club(Document):
    meta = {"collection": "clubs"}
    name = StringField(max_length=50, required=True)
    profileImage = ImageField()
    description = StringField(max_length=4296, required=True)
    tags = ListField(ObjectIdField())
    creationTime = DateTimeField(required=True)
    lastUpdateTime = DateTimeField()
    contactMail = EmailField(required=True)

    def to_dict(self):
        x = send_file(
            Club.objects.get(pk=ObjectId("60b7516617273ee384a9fabd")).profileImage,
            download_name="myfile.png",
        )
        return {
            "id": str(self.pk),
            "name": self.name,
            "profileImage": x,
            "description": self.description,
            "name_of_tags": names_of_tags(self.tags),
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
    joinTime = (
        DateTimeField()
    )  # chaneg to required, havent change it because nedd to change the db
    meta = {"collection": "users"}

    def full_name(self):
        return self.firstName + " " + self.lastName

    def to_dict(self):
        return {
            "id": str(self.pk),
            "name": self.full_name(),
            "contactMail": self.contactMail,
            "picture": self.picture,
            # "joinTime": self.joinTime.isoformat(),
        }

    def to_json(self):
        return json.dumps(self.to_dict())


ROLES = {"A": "Admin", "U": "User", "P": "Pendding"}


class ClubMembership(Document):
    club = ReferenceField("Club", unique_with="member")
    clubName = StringField(max_length=50, required=True)
    member = ReferenceField("User")
    memberName = StringField(max_length=71, required=True)
    role = StringField(max_length=35, required=True, choices=ROLES.keys())
    joinTime = (
        DateTimeField()
    )  # chaneg to required, havent change it because nedd to change the db
    approveTime = (
        DateTimeField()
    )  # chaneg to required, havent change it because nedd to change the db

    def to_dict(self):
        return {
            "id": str(self.pk),
            "clubName": self.clubName,
            "memberName": self.memberName,
            "role": self.role,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class Event(Document):
    meta = {"collection": "events"}
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    duration = FloatField(validation=None)
    startTime = DateTimeField(required=True)
    location = StringField()
    creatingClub = ReferenceField("Club", max_length=200, required=True)
    creationTime = DateTimeField(required=True, validation=None)
    lastUpdateTime = DateTimeField(required=True, validation=None)
    profileImage = URLField()
    intrested = ListField(ReferenceField("User"))
    membersAttending = ListField(ReferenceField("User"))

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
            "profileImage": self.creatingClub.profileImage,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class Tag(Document):
    name = StringField(max_length=200, required=True)
    color = IntField(required=True)
    clubsWithTag = ListField(ObjectIdField(), required=True)  # list of clubs
    meta = {"collection": "tags"}

    def to_dict(self):
        return {
            "id": str(self.pk),
            "name": self.name,
            "color": self.color,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


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


def validatePermession(user, club_id):
    try:
        club = Club.objects.get(id=club_id)
        membership = ClubMembership.objects(club=club, member=user).first()
        if membership.role != "A":
            return False  # error only admin can create message
        return True
    except DoesNotExist:
        return False  # invalid membership


def months_ago(today, months):  # until 12 months
    if today.month > months:
        return datetime.datetime(today.year, today.month - months, 1)
    if today.month == months:
        return datetime.datetime(today.year, 12, 1)
    return datetime.datetime(today.year - 1, 12 + today.month - months, 1)
