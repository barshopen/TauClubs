from mongoengine import Document, StringField, ListField, EmailField, UUIDField


class User(Document):
    # id = UUIDField()  # consider ObjectIdField
    name = StringField(max_length=200, required=True)
    contactMail = EmailField(required=True, unique=True)
    # check if can define the list
    myClubsMembership = ListField(required=True)
    myClubsAsAdmin = ListField(required=True)  # check if can define the list
    eventsAttending = ListField(required=True)  # check if can define the
