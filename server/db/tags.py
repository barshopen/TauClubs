from mongoengine import Document, StringField, ListField


class Tag(Document):
    # validation hex of 6 nibbles(#ABCDEF)
    name = StringField(max_length=200, required=True)
    color = StringField(required=True)
    clubsWithTag = ListField(required=True)  # list of clubs
