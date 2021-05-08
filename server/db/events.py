from mongoengine import Document, StringField, UUIDField, DateTimeField, ListField, IntField, URLField


class Event(Document):
    id = UUIDField()  # consider ObjectIdField
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    creationTime = DateTimeField(required=True,
                                 validation=None)  # check validation define
    duration = IntField(required=True, validation=None)  # check validation
    lastUpdateTime = DateTimeField(
        required=True,
        validation=None)  # not sure if relevant
    membersAttending = ListField(required=True)  # check if can define the list
    creatingClub = StringField(
        max_length=200,
        required=True)  # check how to define LazyReferenceField
    profileImage = URLField()
    intrested = ListField(required=True)  # check if can define the list
