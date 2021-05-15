from server.db.models import Tag, Club
from bson.objectid import ObjectId


def get_club_with_tag(tag_id):
    tag = Tag.objects.get(id=tag_id)
    return tag.clubsWithTag


def addTagToClub(name, club_id, color=0):
    try:
        tag = Tag.objects.get(name=name)
        tag.clubsWithTag.append(club_id)
        tag.update(clubsWithTag=tag.clubsWithTag)
    except Exception:
        tag = Tag(name=name, color=color, clubsWithTag=[club_id])
        tag.save()


def delete_tag_to_club(club_id, tag_id):
    tag = Tag.objects.get(id=tag_id)
    club = Club.objects.get(id=club_id)
    if club_id not in tag.clubsWithTag or tag_id not in club.tags:
        return "Error", 400
    tag.clubsWithTag.remove(club_id)
    club.tags.remove(tag_id)
