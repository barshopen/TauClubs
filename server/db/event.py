from server.db.models import Event
import datetime
from bson.objectid import ObjectId


def createEvent(title, duration, club, description=None, profileImage=None):
    now = datetime.datetime.utcnow()
    newEvent = Event(
        title=title,
        description=description,
        creationTime=now,
        duration=duration,
        lastUpdateTime=now,
        membersAttending=[],
        creatingClub=club,
        profileImage=profileImage,
        intrested=[],
    )
    return newEvent


def updateEvent(event):
    now = datetime.datetime.utcnow()
    event.lastUpdateTime = now


def updateEventContent(
    event, title=None, description=None, duration=None, profileImage=None
):
    if title:
        event.title = title
    if description:
        event.description
    if duration:
        event.duration
    if profileImage:
        event.profileImage
    updateEvent(event)
    return event


def addAttending(event, user):
    event.membersAttending.append(user)
    updateEvent(event)
    return event


def addIntrested(event, user):
    event.intrested.append(user)
    updateEvent(event)
    return event


def deleteEvent(event_id):
    event = Event.objects.get(_id=ObjectId(event_id))
    event.delete()


def getEvent(event_id):
    return Event.objects.get(_id=ObjectId(event_id)).to_json()
