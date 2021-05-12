from mongoengine import Document, StringField, ReferenceField,EmailField,URLField,DateTimeField,ListField,UUIDField
import datetime
from bson.objectid import ObjectId
import json
from mongoengine.queryset.visitor import Q
from .models import User, Club , Tag
