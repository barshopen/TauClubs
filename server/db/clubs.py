from mongoengine import Document, StringField, UUIDField, DateTimeField, ListField, URLField, IntField


class Clubs(Document):
   # id = UUIDField()  # consider ObjectIdField
    name = StringField(max_length=200, required=True)
    profileImage = URLField()
    shortDescription = StringField(required=True)
    description = StringField(required=True)
    tags = ListField(required=True)  # list of tags
    content = StringField(required=True)
    creationTime = DateTimeField(required=True,
                                 validation=None)  # check validation define
    lastUpdateTime = DateTimeField(
        required=True,
        validation=None)  # not sure if relevant
    members = ListField(required=True)  # list of users
    admins = ListField(required=True)  # list of users
    contactMail = StringField(required=True)
    membersCount = IntField(required=True)
