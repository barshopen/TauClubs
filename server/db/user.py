from mongoengine import Document, StringField, EmailField,URLField
from .models import User, Club, ClubMembership
from mongoengine.queryset.visitor import Q


def create_user(firstName,lastName,contactMail,picture):
    user=User(firstName=firstName,lastName=lastName,contactMail=contactMail,picture=picture)
    user.save()
    return user

def listOfClubsPerUser(user):
    return ClubMembership.objects.get(member=user).to_json()
    
