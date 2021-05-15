from server.db.models import Event
import datetime
from bson.objectid import ObjectId


def currentTime():
    now = datetime.datetime.utcnow()
    return now


def createEvent(title, duration, club, description=None, profileImage=None):
    newEvent = Event(
        title=title,
        description=description,
        creationTime=currentTime(),
        duration=duration,
        lastUpdateTime=currentTime(),
        creatingClub=club,
        profileImage=profileImage,
    )
    newEvent.save()
    return newEvent


def updateEventContent(
    event, title=None, description=None, duration=None, profileImage=None
):
    if title:
        event.title = title
    if description:
        event.description
    if duration:
        event.duration = duration
    if profileImage:
        event.profileImage = profileImage
    now = currentTime()
    event.update(
        lastUpdateTime=now,
        title=event.title,
        description=event.duration,
        profileImage=event.profileImage,
    )
    return event


def addAttending(event, user):
    event.membersAttending.append(user)
    now = currentTime()
    event.update(
        lastUpdateTime=now, membersAttending=event.membersAttending.append(user)
    )
    return event


def addIntrested(event, user):
    event.intrested.append(user)
    now = currentTime()
    event.update(lastUpdateTime=now, intrested=event.intrested.append(user))
    return event


def deleteEvent(event_id):
    event = Event.objects.get(id=event_id)
    event.delete()


def getEvent(event_id):
    return Event.objects.get(id=event_id).to_json()
