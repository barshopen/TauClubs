from mongoengine import Document, StringField, DateTimeField, ListField, URLField, ObjectIdField


class Club(Document):
    # id = ObjectId()  # consider ObjectIdField
    name = StringField(max_length=200, required=True)
    profileImage = URLField()
    shortDescription = StringField(required=True)
    tags = ListField(ObjectIdField(), required=True)  # list of tags
    content = StringField(required=True)
    creationTime = DateTimeField(required=True,
                                 validation=None)  # check validation define
    lastUpdateTime = DateTimeField(
        required=True,
        validation=None)  # not sure if relevant
    members = ListField(ObjectIdField(), required=True)  # list of users
    admins = ListField(ObjectIdField(), required=True)  # list of users
