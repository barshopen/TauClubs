from mongoengine import Document, StringField, DateTimeField, ListField, ObjectIdField


class Message(Document):
    # id = ObjectId()  # consider ObjectIdField
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    creationTime = DateTimeField(required=True,
                                 validation=None)  # check validation define
    lastUpdateTime = DateTimeField(
        required=True,
        validation=None)  # not sure if relevant
    # check if can define the list
    likes = ListField(ObjectIdField(), required=True)
    creatingClub = StringField(
        max_length=200,
        required=True)  # check how to deine
    creatingUser = StringField(
        max_length=200,
        required=True)  # check how to define LazyReferenceField
