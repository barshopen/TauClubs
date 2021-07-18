import datetime
from mongoengine import (
    DynamicDocument,
    StringField,
    ReferenceField,
    EmailField,
    DateTimeField,
    ListField,
    IntField,
    ImageField,
)
import json
from mongoengine.base.fields import ObjectIdField

from mongoengine.errors import DoesNotExist
from mongoengine.fields import FloatField, URLField
from flask_login import UserMixin, current_user


def names_of_tags(listTags):
    re = []
    for tag_id in listTags:
        re.append(Tag.objects.get(pk=tag_id).to_dict())
    return re


class Club(DynamicDocument):
    meta = {"collection": "clubs"}
    name = StringField(max_length=50, required=True)
    profileImage = ImageField()
    description = StringField(max_length=4296, required=True)
    tags = ListField(StringField())
    creationTime = DateTimeField()
    lastUpdateTime = DateTimeField()
    contactMail = EmailField(required=True)

    def hasPicture(self):
        return self.profileImage.__dict__["grid_id"] is not None

    def to_dict(self):
        admin = False
        member = False
        pending = False
        if current_user.is_authenticated:
            user = UserAuth.objects.get(id=current_user.get_id()).userauth
            admin = validatePermession(user, self.id)
            memebership = ClubMembership.objects(member=user, club=self).first()
            if memebership is not None:
                member = admin or memebership.role == "U"
                pending = memebership.role == "P"
        return {
            "id": str(self.pk),
            "name": self.name,
            "description": self.description,
            "creationTime": self.id.generation_time.isoformat(),
            "lastUpdateTime": self.lastUpdateTime.isoformat(),
            "contactMail": self.contactMail,
            "membersCount": ClubMembership.objects(club=self).count(),
            "tags": self.tags,
            "admin": admin,
            "member": member,
            "pending": pending,
            "profileImage": self.hasPicture(),
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class User(DynamicDocument):
    firstName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True, primary=True)
    country = StringField()
    phone = StringField()
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
            "joinTime": self.id.generation_time.isoformat(),
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class UserAuth(UserMixin, DynamicDocument):
    email = EmailField(required=True, unique=True)
    userauth = ReferenceField(User)


ROLES = {"A": "Admin", "U": "User", "P": "Pending"}


class ClubMembership(DynamicDocument):
    club = ReferenceField("Club", unique_with="member")
    clubName = StringField(max_length=50, required=True)
    member = ReferenceField("User")
    memberName = StringField(max_length=71, required=True)
    role = StringField(max_length=35, required=True, choices=ROLES.keys())
    RequestTime = (
        DateTimeField()
    )  # chaneg to required, havent change it because nedd to change the db
    approveTime = DateTimeField()

    def to_dict(self):
        return {
            "id": str(self.pk),
            "clubName": self.clubName,
            "memberName": self.memberName,
            "role": self.role,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class Event(DynamicDocument):
    meta = {"collection": "events"}
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    duration = FloatField(validation=None)
    startTime = DateTimeField(required=True)
    location = StringField()
    creatingClub = ReferenceField("Club", max_length=200, required=True)
    creationTime = DateTimeField(required=True, validation=None)
    lastUpdateTime = DateTimeField(required=True, validation=None)
    intrested = ListField(ReferenceField("User"))
    membersAttending = ListField(ReferenceField("User"))

    def to_dict(self):
        user = UserAuth.objects.get(id=current_user.get_id()).userauth
        return {
            "id": str(self.pk),
            "clubId": str(self.creatingClub.id),
            "title": self.title,
            "description": self.description,
            "duration": self.duration,
            "startTime": self.startTime.isoformat(),
            "location": self.location,
            "creationTime": self.creationTime.isoformat(),
            "lastUpdateTime": self.lastUpdateTime.isoformat(),
            "clubName": self.creatingClub.name,
            "isAttend": user in self.membersAttending,
            "isInterested": user in self.intrested,
            "profileImage": self.creatingClub.hasPicture(),
            "numAttending": len(self.membersAttending),
            "numInterest": len(self.intrested),
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class Tag(DynamicDocument):
    name = StringField(max_length=200, required=True)
    color = IntField()
    clubsWithTag = ListField(ObjectIdField())  # list of clubs
    meta = {"collection": "tags"}

    def to_dict(self):
        return {
            "name": self.name,
        }

    def to_json(self):
        return json.dumps(self.to_dict())


class Message(DynamicDocument):
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
            "clubId": str(self.creatingClub.id),
            "title": self.title,
            "content": self.content,
            "creationTime": self.creationTime.isoformat(),
            "lastUpdateTime": self.lastUpdateTime.isoformat(),
            "likes": self.likes,
            "clubName": self.creatingClub.name,
            "userName": self.creatingUser.full_name(),
            "profileImage": self.creatingClub.hasPicture(),
        }

    def to_json(self):
        return json.dumps(self.to_dict())


def validatePermession(user, club_id):
    try:
        club = Club.objects.get(id=club_id)
        membership = ClubMembership.objects(club=club, member=user).first()
        if not membership or membership.role != "A":
            return False  # error only admin can create message
        return True
    except DoesNotExist:
        return False  # invalid membership


def months_ago(today, months):  # until 12 months
    if months == -1:
        return today
    if today.month > months:
        return datetime.datetime(today.year, today.month - months, 1)
    if today.month == months:
        return datetime.datetime(today.year, 12, 1)
    return datetime.datetime(today.year - 1, 12 + today.month - months, 1)


def get_name_for_month(i):
    if i == -1:
        return "currentMonth"
    return "lastMonth"


def dict_two_months(clubs, func):
    today = datetime.datetime.today()
    dict = {}
    for i in range(-1, 1):
        before = months_ago(today, i)
        after = months_ago(today, i + 1)
        dict[get_name_for_month(i)] = {"month": after.strftime("%B")}
        dict[get_name_for_month(i)]["total"] = len(func(before, after, clubs))
    return dict
