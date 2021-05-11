from mongoengine import Document, StringField, ReferenceField
from club import Club
from user import User

ROLES = {
    "A": "Admin",
    "U": "User",
}


class ClubMembership(Document):
    club = ReferenceField(Club)
    clubName = StringField(max_length=50, required=True)
    member = ReferenceField(User)
    memberFirsName = StringField(max_length=35, required=True)
    memberLastName = StringField(max_length=35, required=True)
    role = StringField(max_length=35, required=True, choices=ROLES.keys())

    def upsert_club_membership(club: Club, user: User, role):
        ClubMembership.create()
