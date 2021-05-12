from mongoengine import Document, StringField, ReferenceField,EmailField,URLField,DateTimeField,ListField,UUIDField
import datetime
from bson.objectid import ObjectId
import json
from mongoengine.queryset.visitor import Q
#from .club import Club
#from .user import User

ROLES = {
    "A": "Admin",
    "U": "User",
}

class Club(Document):
    meta = {"collection": "clubs"}
    _id = UUIDField()  # TODO change this field to hold different unique, random filed.
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
            "id": str(self._id),
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


class User(Document):
    # id = UUIDField()  # consider ObjectIdField
    firstName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True, primary=True)
    picture = URLField(required=True)
    meta = {"collection": "users"}

    
    def to_dict(self):
        return {
            #TODO
        }

    def to_json(self):
        return json.dumps(self.to_dict())


    

    def listOfClubsPerUser(user):
        return ClubMembership.objects.get(member=user).to_json()
    

class ClubMembership(Document):
    club = ReferenceField('Club')
    clubName = StringField(max_length=50, required=True)
    member = ReferenceField('User')
    memberFirsName = StringField(max_length=35, required=True)
    memberLastName = StringField(max_length=35, required=True)
    role = StringField(max_length=35, required=True, choices=ROLES.keys())

    def upsert_club_membership(club: Club, user: User, role):
        ClubMembership.create()

def create_user(firstName,lastName,contactMail,picture):
    user=User(firstName=firstName,lastName=lastName,contactMail=contactMail,picture=picture)
    user.save()
    return user