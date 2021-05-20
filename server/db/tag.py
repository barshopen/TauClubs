import json
from mongoengine.queryset.visitor import Q
from server.db.models import Tag, Club


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


def tags_for_club(club_id):
    club_Q = Q(clubsWithTag__contains=club_id)
    return json.dumps(
        list(
            map(
                lambda tag: tag.to_dict(),
                Tag.objects.filter(club_Q),
            )
        )
    )
