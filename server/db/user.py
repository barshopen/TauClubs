from mongoengine import Document, StringField, EmailField
from server.db.userauth

class User(Document):
    # id = UUIDField()  # consider ObjectIdField
    firsName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True, primary=True)

def create_user(u):
