from mongoengine import Document, StringField, UUIDField, DateTimeField, ListField


class Message(Document):
    id = UUIDField()  # consider ObjectIdField
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    creationTime = DateTimeField(required=True,
                                 validation=None)  # check validation define
    lastUpdateTime = DateTimeField(
        required=True,
        validation=None)  # not sure if relevant
    likes = ListField(required=True)  # check if can define the list
    creatingClub = StringField(
        max_length=200,
        required=True)  # check how to deine
    creatingUser = StringField(
        max_length=200,
        required=True)  # check how to define LazyReferenceField
