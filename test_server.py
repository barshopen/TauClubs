from server.db.user import joinClubAsUser
from mongoengine.errors import DoesNotExist, ValidationError
import pytest
from server.db.models import User, ClubMembership, Club
from server.db.club import establish, create_club


def addUser(firstName, lastName, contactMail):
    user = User(firstName=firstName, lastName=lastName, contactMail=contactMail)
    user.save()
    return user


def test_create_user():
    sharon = addUser(
        firstName="sharon", lastName="zolty", contactMail="sharonzolty@gmail.com"
    )
    assert User.objects.get(firstName="sharon").lastName == sharon.lastName
    amir = addUser(firstName="amir", lastName="cohen", contactMail="amir@gmail.com")
    assert User.objects.get(firstName="amir")._id == amir._id


def test_user_not_exist():
    ron = addUser(firstName="ron", lastName="levi", contactMail="ron@gmail.com")
    with pytest.raises(DoesNotExist):
        User.objects.get(firstName="ron")


def test_create_club():
    clubname = "tennisA"
    newclub = create_club(clubname, "aa@gmail.com")
    assert Club.objects.get(name=clubname).name == newclub.name


def test_create_member():
    user = User.objects.get(firstName="sharon")
    establish(user, name="football", contact_mail=user.contactMail)
    assert Club.objects.get(name="football").name == "football"
    assert (
        ClubMembership.objects.get(clubName="football").contactMail == user.contactMail
    )
    assert ClubMembership.objects.get(clubName="football").role == "A"


def test_create_member_for_non_exist_user():
    user = addUser(firstName="ron", lastName="levi", contactMail="ron@gmail.com")
    with pytest.raises(ValidationError):
        establish(user, name="footballs", contact_mail=user.contactMail)


def test_join_club_without_exist_user():
    user = addUser(firstName="ron", lastName="levi", contactMail="ron@gmail.com")
    with pytest.raises(ValidationError):
        joinClubAsUser(user, Club.objects.first())


def test_join_club_without_exist_club():
    user = User.objects.get(firstName="sharon")
    club = None
    with pytest.raises(ValidationError):
        joinClubAsUser(user, club)
