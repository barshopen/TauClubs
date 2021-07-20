import json
from server.db.models import Event, current_time, dict_two_months
from mongoengine.queryset.visitor import Q


def createEvent(
    title, duration, club, startTime, endTime, location=None, description=None
):
    newEvent = Event(
        title=title,
        description=description,
        creationTime=current_time(),
        duration=duration,
        startTime=startTime,
        endTime=endTime,
        lastUpdateTime=current_time(),
        creatingClub=club,
        location=location,
    )
    newEvent.save()
    club.update(lastUpdateTime=current_time())
    return newEvent.to_dict()


def updateEventContent(
    event,
    startTime=None,
    endTime=None,
    location=None,
    title=None,
    description=None,
    duration=None,
):
    if title:
        event.title = title
    if description:
        event.description = description
    if duration:
        event.duration = duration
    if startTime:
        event.startTime = startTime
    if endTime:
        event.endTime = endTime
    if location:
        event.location = location
    now = current_time()
    event.update(
        lastUpdateTime=now,
        title=event.title,
        description=event.description,
    )
    return event


def addAttending(event, user):
    event.membersAttending.append(user)
    now = current_time()
    event.update(lastUpdateTime=now, membersAttending=event.membersAttending)
    return event


def undoAttending(event, user):
    event.membersAttending.remove(user)
    now = current_time()
    event.update(lastUpdateTime=now, membersAttending=event.membersAttending)
    return event


def addIntrested(event, user):
    event.intrested.append(user)
    now = current_time()
    event.update(lastUpdateTime=now, intrested=event.intrested)
    return event


def undoIntrested(event, user):
    event.intrested.remove(user)
    now = current_time()
    event.update(lastUpdateTime=now, intrested=event.intrested)
    return event


def deleteEvent(event_id):
    event = Event.objects.get(id=event_id)
    event.delete()


def getEvent(event_id):
    return Event.objects.get(id=event_id)


def get_events_by_club(club):
    return json.dumps(
        list(
            map(
                lambda event: event.to_dict(),
                Event.objects(creatingClub=club),
            )
        )
    )


def get_events_for_all_clubs_by_user(clubs):
    club_Q = Q(creatingClub__in=clubs)
    return json.dumps(
        list(
            map(
                lambda message: message.to_dict(),
                Event.objects.filter(club_Q),
            )
        )
    )


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


def events_between_dates(before, after, clubs):
    before_Q = Q(creationTime__lte=before, creatingClub__in=clubs)  # bigger
    after_Q = Q(creationTime__gte=after, creatingClub__in=clubs)
    return list(
        map(
            lambda message: message.to_dict(),
            Event.objects.filter(before_Q & after_Q),
        )
    )


def dict_two_months_events(clubs):
    return dict_two_months(clubs, events_between_dates)
