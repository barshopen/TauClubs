from mongoengine import Document, StringField, ListField, EmailField, UUIDField


class User(Document):
    name = StringField(max_length=200, required=True)
    contactMail = EmailField(required=True, unique=True)
    # as following to thhis task we can remove this too
    eventsAttending = ListField(required=True)
