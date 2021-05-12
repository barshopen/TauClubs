from mongoengine import Document, StringField, ReferenceField,EmailField,URLField,DateTimeField,ListField,UUIDField
import datetime
from bson.objectid import ObjectId
import json
from mongoengine.queryset.visitor import Q
from .models import User, Club , Tag, ClubMembership, ROLES


def createMembership(user,club,role):
    membership=ClubMembership(club=club,clubName=club.name,member=user,memberFirstName=user.firstName,memberLastName=user.lastName, role=ROLES)
    membership.save()

def createRegularMembership(user,club):
    createMembership(user,club,ROLES['U'])


def createAdminMembership(user,club):
    createMembership(user,club,ROLES['A'])
