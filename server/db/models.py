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


class Club(Document):
    meta = {"collection": "clubs"}
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

    def to_dict(self):
        return {
            "id": str(self.pk),
            "name": self.name,
            "profileImage": self.profileImage,
            "description": self.description,
            "shortDescription": self.shortDescription,
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
    # id = UUIDField()  # consider ObjectIdField
    firstName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True, primary=True)
    picture = URLField(required=True)
    meta = {"collection": "users"}

    def to_dict(self):
        return {
            # TODO
        }

    def to_json(self):
        return json.dumps(self.to_dict())


ROLES = {
    "A": "Admin",
    "U": "User",
}


class ClubMembership(Document):
    club = ReferenceField("Club")
    clubName = StringField(max_length=50, required=True)
    member = ReferenceField("User")
    memberName = StringField(max_length=71, required=True)
    role = StringField(max_length=35, required=True, choices=ROLES.keys())


class Event(Document):
    # id = UUIDField()  # consider ObjectIdField
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    creationTime = DateTimeField(
        required=True, validation=None
    )  # check validation define
    duration = IntField(required=True, validation=None)  # check validation
    lastUpdateTime = DateTimeField(
        required=True, validation=None
    )  # not sure if relevant
    membersAttending = ListField(required=True)  # check if can define the list
    creatingClub = StringField(
        max_length=200, required=True
    )  # check how to define LazyReferenceField
    profileImage = URLField()
    intrested = ListField(required=True)  # check if can define the list


class Tag(Document):
    # validation hex of 6 nibbles(#ABCDEF)
    name = StringField(max_length=200, required=True)
    color = StringField(required=True)
    clubsWithTag = ListField(required=True)  # list of clubs


class Message(Document):
    # id = UUIDField()  # consider ObjectIdField
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    creationTime = DateTimeField(
        required=True, validation=None
    )  # check validation define
    lastUpdateTime = DateTimeField(
        required=True, validation=None
    )  # not sure if relevant
    likes = ListField(required=True)  # check if can define the list
    creatingClub = StringField(max_length=200, required=True)  # check how to deine
    creatingUser = StringField(
        max_length=200, required=True
    )  # check how to define LazyReferenceField
