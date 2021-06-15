import json
from bson.objectid import ObjectId
from mongoengine.queryset.visitor import Q
from server.db.models import Tag, Club, names_of_tags


def get_clubs_with_tag(tag_id):
    tag_Q = Q(id=tag_id)
    return json.dumps(
        list(
            map(
                lambda tag: tag.clubsWithTag,
                Tag.objects.filter(tag_Q),
            )
        )
    )


def addTagToClub(tag_id, name, club_id, color=0):
    try:
        tag = Tag.objects.get(id=tag_id)
        tag.clubsWithTag.append(club_id)
        tag.update(clubsWithTag=tag.clubsWithTag)
    except Exception:
        tag = Tag(id=tag_id, name=name, color=color, clubsWithTag=[club_id])
        tag.save()


def delete_tag_to_club(club_id, tag_id):
    tag = Tag.objects.get(id=tag_id)
    club = Club.objects.get(id=club_id)
    if club_id not in tag.clubsWithTag or tag_id not in club.tags:
        return "Error", 400
    tag.clubsWithTag.remove(club_id)
    club.tags.remove(tag_id)
    tag.update(clubsWithTag=tag.clubsWithTag)
    Club.update(tags=club.tags)


def exist_tag_and_add(tag_name, club, club_id_object):
    try:
        tag = Tag.objects.get(name=tag_name)
        if club_id_object not in tag.clubsWithTag:
            tag.clubsWithTag.append(club_id_object)
            tag.save()
            club.tags.append(tag_name)
            club.save()
        return club
    except Exception:
        return None


def add_tags(club_id, club, tags):
    for tagname in tags:
        NewClub = exist_tag_and_add(tagname, club, ObjectId(club_id))
        if NewClub is None:
            tag = Tag(name=tagname, clubsWithTag=[ObjectId(club_id)])
            tag.save()
            club.tags.append(tagname)
            club.save()
        return club


def tags_for_club(club):
    return json.dumps(names_of_tags(club.tags))
