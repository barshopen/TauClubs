import json
from server.db.models import Event
import datetime
from mongoengine.queryset.visitor import Q


def currentTime():
    now = datetime.datetime.utcnow()
    return now


def createEvent(
    title, duration, club, startTime, location=None, description=None, profileImage=None
):
    newEvent = Event(
        title=title,
        description=description,
        creationTime=currentTime(),
        duration=duration,
        startTime=startTime,
        lastUpdateTime=currentTime(),
        creatingClub=club,
        location=location,
        profileImage=profileImage,
    )
    newEvent.save()
    return newEvent.to_dict()


def updateEventContent(
    event,
    startTime=None,
    location=None,
    title=None,
    description=None,
    duration=None,
    profileImage=None,
):
    if title:
        event.title = title
    if description:
        event.description
    if duration:
        event.duration = duration
    if profileImage:
        event.profileImage = profileImage
    if startTime:
        event.startTime = startTime
    if location:
        event.location = location
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
    return Event.objects.get(id=event_id)


def get_all_events():
    return json.dumps(
        list(
            map(
                lambda event: event.to_dict(),
                Event.objects(),
            )
        )
    )


def events_by_user(user):
    event_Q = Q(membersAttending__contains=user)
    return json.dumps(
        list(
            map(
                lambda event: event.to_dict(),
                Event.objects.filter(event_Q),
            )
        )
    )
