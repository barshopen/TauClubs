import datetime
from server.db.models import Message
from bson.objectid import ObjectId


def createMessage(title, content, likes, club, user):
    if user.role != "A":
        return None  # error only admin can create message
    now = datetime.datetime.utcnow()
    message = Message(
        title=title,
        content=content,
        likes=likes,
        creatingClub=club,
        creatingUser=user,
        creationTime=now,
        lastUpdateTime=now,
    )
    return message


def updateTime(message: Message):
    now = datetime.datetime.utcnow()
    message.lastUpdateTime = now


def updateMessageContent(message: Message, content):
    message.content = content
    updateTime(message)


def updateMessageTitle(message: Message, title):
    message.title = title
    updateTime(message)


def get_message_by_club(club):
    return Message.objects(creatingClub=club).to_json()


def get_message(id: str):
    return Message.objects.get(_id=ObjectId(id)).to_json()


def delete_message(id: str):
    message = Message.objects.get(_id=ObjectId(id))
    message.delete()
