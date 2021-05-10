from mongoengine import Document, BooleanField, ObjectIdField


class ClubMembership(Document):
    # because we do not point to the user and club from each other, i think we
    # should consider to use the reference - ReferenceField
    user = ObjectIdField(required=True)
    club = ObjectIdField(required=True)
    isAdmin = BooleanField(required=True)
