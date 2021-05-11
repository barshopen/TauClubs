from mongoengine import Document, StringField, ListField, EmailField, UUIDField


class User(Document):
    # id = UUIDField()  # consider ObjectIdField
    firsName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True)
