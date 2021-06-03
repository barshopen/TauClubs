import datetime
import json
from server.db.models import Message, dict_two_months
from mongoengine.queryset.visitor import Q


def currentTime():
    now = datetime.datetime.utcnow()
    return now


def createMessage(title, content, club, user):
    message = Message(
        title=title,
        content=content,
        creatingClub=club,
        creatingUser=user,
        creationTime=currentTime(),
        lastUpdateTime=currentTime(),
    )
    club.update(lastUpdateTime=currentTime())
    message.save()
    return message


def updateMessageContent(message: Message, content):
    message.update(content=content, lastUpdateTime=currentTime())


def updateMessageTitle(message: Message, title):
    message.update(title=title, lastUpdateTime=currentTime())


def get_message(id: str):
    return Message.objects.get(id=id)


def get_messages_by_club(club):
    return json.dumps(
        list(
            map(
                lambda message: message.to_dict(),
                Message.objects(creatingClub=club),
            )
        )
    )


def get_messages_for_all_clubs_by_user(clubs):
    club_Q = Q(creatingClub__in=clubs)
    return list(
        map(
            lambda message: message.to_dict(),
            Message.objects.filter(club_Q),
        )
    )


def get_messages():
    return json.dumps(
        list(
            map(
                lambda message: message.to_dict(),
                Message.objects(),
            )
        )
    )


def delete_message(id: str):
    message = Message.objects.get(id=id)
    message.delete()


def add_like(message_id, user):
    message = Message.objects.get(id=message_id)
    if user.id not in message.likes:
        message.likes.append(user.id)
        message.update(likes=message.likes, lastUpdateTime=currentTime())
    return message.to_dict()


def unlike(message_id, user):
    message = Message.objects.get(id=message_id)
    if user.id in message.likes:
        message.likes.remove(user.id)
        message.update(likes=message.likes, lastUpdateTime=currentTime())
    return message.to_dict()


def messages_between_dates(before, after, clubs):
    before_Q = Q(creationTime__lt=before, creatingClub__in=clubs)  # bigger
    after_Q = Q(creationTime__gt=after, creatingClub__in=clubs)
    return list(
        map(
            lambda message: message.to_dict(),
            Message.objects.filter(before_Q & after_Q),
        )
    )


def dict_two_months_messages(clubs):
    return dict_two_months(clubs, messages_between_dates)
