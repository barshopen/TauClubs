import datetime
from bson.objectid import ObjectId
import json
from mongoengine.queryset.visitor import Q
from .models import Club
from .clubmembership import createAdminMembership


def create_club(
    image,
    club_name: str,
    contact_mail: str,
    description: str = "",
    tags=[],
) -> Club:
    now = datetime.datetime.utcnow()
    club = Club(
        contactMail=contact_mail,
        name=club_name,
        profileImage=image,
        description=description,
        tags=tags,
        creationTime=now,
        lastUpdateTime=now,
    )
    return club.save(force_insert=True)


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
    return Club.objects.get(pk=ObjectId(id))


def members_count(club: Club):
    return Club.objects.get(pk=ObjectId(id)).count()


def get_image_by_club(image_id):
    for i in list(Club.objects.filter()):
        print(i.profileImage.id)
    return Club.objects.filter(__raw__={"profileImage.id": image_id})


def add_image_to_club(image, club: Club):
    club.profileImage.put(image)
    club.save()
