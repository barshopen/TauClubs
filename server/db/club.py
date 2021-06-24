import datetime
from server.db.event import delete_events
from server.db.message import delete_messages
from server.db.tag import add_tags
from bson.objectid import ObjectId
import json
from mongoengine.errors import DoesNotExist
from mongoengine.queryset.visitor import Q
from .models import Club
from .clubmembership import change_club_name, createAdminMembership, delete_membership


def create_club(
    image,
    club_name: str,
    contact_mail: str,
    description: str = "",
    tags=[],
):
    now = datetime.datetime.utcnow()
    club = Club(
        contactMail=contact_mail,
        name=club_name,
        profileImage=image,
        description=description,
        creationTime=now,
        lastUpdateTime=now,
    )
    club.save(force_insert=True)
    add_tags(club.id, club, tags)
    return club


def establish_club(
    foundingUserEmail: str,
    name: str,
    contact_mail: str,
    description: str = "",
    image=None,
    tags=None,
):
    newclub = create_club(image, name, contact_mail, description, tags)
    membership = createAdminMembership(foundingUserEmail, newclub)
    return membership.clubName


def edit_club(club, name, contact_mail, description):  # write
    if name == "undefined":
        name = club.name
    else:
        change_club_name(club, name)
    if contact_mail == "undefined":
        contact_mail = club.contactMail
    if description == "undefined":
        description = club.description
    club.update(name=name, contactMail=contact_mail, description=description)
    club.save()


def get_clubs(name: str, tag: str):
    name_Q = Q(name__icontains=name) if name else Q()
    tags_Q = Q(tags=tag) if tag else Q()
    return json.dumps(
        list(
            map(
                lambda club: club.to_dict(),
                Club.objects.filter(name_Q | tags_Q),
            )
        )
    )


def get_club(id: str):
    try:
        return Club.objects.get(pk=ObjectId(id))
    except DoesNotExist:
        return None


def delete_club(club):
    delete_messages(club)
    delete_events(club)
    delete_membership(club)
    # delete_tags(club)
    club.delete()
    club.switch_collection("old_clubs")
    club.save(force_insert=True)


def members_count(club: Club):
    return Club.objects.get(pk=ObjectId(id)).count()


def get_image_by_club(image_id):
    for i in list(Club.objects.filter()):
        print(i.profileImage.id)
    return Club.objects.filter(__raw__={"profileImage.id": image_id})


def example_club():
    return json.dumps(
        list(
            map(
                lambda club: club.to_dict(),
                Club.objects[:3],
            )
        )
    )


def add_image_to_club(image, club: Club):
    club.profileImage.put(image)
    club.save()
