from server.db.models import User


def create_user(firstName, lastName, contactMail, picture):
    try:
        user = User(
            firstName=firstName,
            lastName=lastName,
            contactMail=contactMail,
            picture=picture,
        )
        user.save()
    except Exception:
        user = User.objects.get(contactMail=contactMail)
    return user


def get_user(user_id):
    return User.objects.get(id=user_id)


def update(user, firstName, lastName, phone, country):
    user.update(firstName=firstName, lastName=lastName, phone=phone, country=country)
