from mongoengine import Document, StringField, EmailField,URLField


class User(Document):
    # id = UUIDField()  # consider ObjectIdField
    firstName = StringField(max_length=35, required=True)
    lastName = StringField(max_length=35, required=True)
    contactMail = EmailField(required=True, unique=True, primary=True)
    picture = URLField(required=True)
    meta = {"collection": "users"}


    def create_user(firstName,lastName,contactMail,picture):
        user=User(firstName=firstName,lastName=lastName,contactMail=contactMail,picture=picture)
        user.save()
        return user
    
