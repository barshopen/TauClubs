from mongoengine import Document, StringField, ListField, ObjectIdField
# from bson import ObjectId


class Tag(Document):
    # validation hex of 6 nibbles(#ABCDEF)
    # id = ObjectIdField(required=True, unique=True, primary_key=True)
    name = StringField(max_length=200, required=True)
    color = StringField(required=True)
    clubsWithTag = ListField(
        ObjectIdField(),
        required=True)  # list of clubs
