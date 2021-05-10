from mongoengine import Document, StringField, ListField, EmailField, ObjectIdField


class User(Document):
    # id = ObjectId()  # consider ObjectIdField
    name = StringField(max_length=200, required=True)
    contactMail = EmailField(required=True, unique=True)
    # check if can define the list
    myClubsMembership = ListField(ObjectIdField(), required=True)
    myClubsAsAdmin = ListField(ObjectIdField(),
                               required=True)  # check if can define the list
    eventsAttending = ListField(ObjectIdField(),
                                required=True)  # check if can define the
