from server.db.models import Tag, Club
from bson.objectid import ObjectId

def get_club_with_tag(tag_id):
    tag=Tag.objects(_id=ObjectId(tag_id))
    return tag.clubsWithTag

def addTagToClub(name,club_id,color=0):
    try:
        tag=Tag.objects(name=name)
        tag.clubsWithTag.append(club_id)
    except Exception:
        tag=Tag(name=name,color=color,clubsWithTag=[club_id])

def delete_tag_to_club(club_id,tag_id):
    tag=Tag.objects(_id=ObjectId(tag_id))
    club=Club.objects(_id=ObjectId(club_id))
    if club_id  not in tag.clubsWithTag or tag_id not in club.tags:
        return "Error", 400
    tag.clubsWithTag.remove(club_id)
    club.tags.remove(tag_id)