import datetime
from server.db.models import Message, ClubMembership


def currentTime():
    now = datetime.datetime.utcnow()
    return now


def createMessage(title, content, club, user):
    try:
        membership = ClubMembership.objects(club=club, member=user).first()
        if membership.role != "A":
            return None  # error only admin can create message
    except:
        return None  # invalid membership
    message = Message(
        title=title,
        content=content,
        creatingClub=club,
        creatingUser=user,
        creationTime=currentTime(),
        lastUpdateTime=currentTime(),
    )
    message.save()
    return message


def updateMessageContent(message: Message, content):
    message.update(content=content, lastUpdateTime=currentTime())


def updateMessageTitle(message: Message, title):
    message.update(title=title, lastUpdateTime=currentTime())


def get_message_by_club(club):
    return Message.objects(creatingClub=club).to_json()


def get_message(id: str):
    return Message.objects.get(id=id).to_json()


def delete_message(id: str):
    message = Message.objects.get(id=id)
    message.delete()


def add_likes(message_id, user_id):
    message = Message.objects.get(id=message_id)
    message.likes.append(user_id)
    message.update(likes=message.likes, lastUpdateTime=currentTime())
