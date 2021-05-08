from os import path
import os
from flask import Blueprint, json
import dotenv
from flask_mongoengine import MongoEngine
#from .users import User
#from .clubs import Club
#from .events import Event
#from .tags import Tag
#from .messages import Message


STATIC_FOLDER_NAME = 'mock-api'

db_app = Blueprint(
    "db_app",
    __name__,
    url_prefix="/db",)

dotenv.load_dotenv()
MONGO_DB_HOST_USER = os.getenv('MONGO_DB_HOST_USER')
MONGO_DB_HOST_PASSWORD = os.getenv('MONGO_DB_HOST_PASSWORD')
MONGO_DB_CLUSTER_URL = os.getenv('MONGO_DB_CLUSTER_URL')
MONGO_DB_CLUSTER_DB_NAME = os.getenv('MONGO_DB_CLUSTER_DB_NAME')
MONGO_DB_PARAMS = "retryWrites=true&w=majority"

URL_HOST = f"mongodb+srv://{MONGO_DB_HOST_USER}:{MONGO_DB_HOST_PASSWORD}@{MONGO_DB_CLUSTER_URL}/" \
    f"{MONGO_DB_CLUSTER_DB_NAME}?{MONGO_DB_PARAMS}"


def initdb(app):
    mongodb = MongoEngine()
    app.config['MONGODB_SETTINGS'] = {
        'host': URL_HOST
    }
    mongodb.init_app(app)
   # t = Tag(name="bar", color="s") example create
    # t.save() save to the collection Tag
    # temp = Tag.objects.get(name="zolty") query
    # print(temp.name)


def initdb(app):
    dotenv.load_dotenv()
    mongodb = MongoEngine()
    app.config['MONGODB_SETTINGS'] = {
        'host': os.getenv('MONGO_DB_HOST')}
    mongodb.init_app(app)
   # t = Tag(name="bar", color="s") example create
    # t.save() save to the collection Tag
    # temp = Tag.objects.get(name="zolty") query
    # print(temp.name)


def get_json_data(filename):
    pathname = path.join(path.dirname(__file__), STATIC_FOLDER_NAME, filename)
    with open(pathname, "r") as f:
        return json.load(f)


def filter_by_id(data, data_id):
    if data_id:
        d = json.dumps([x for x in data if x['id'] == data_id][0])
        return d
    return json.dumps(data)


@db_app.route('/clubs', defaults={'club_id': ''})
@db_app.route('/clubs/<club_id>')
def clubs(club_id):
    data = get_json_data('clubs.json')
    return filter_by_id(data, club_id)


@db_app.route('/messages')
@db_app.route('/messages/<message_id>')
def messages(message_id: str = ""):
    data = get_json_data('messages.json')
    return filter_by_id(data, message_id)


@db_app.route('/upcoming_events')
@db_app.route('/upcoming_events/<event_id>')
def upcoming_events(event_id: str = ""):
    data = get_json_data('upcoming_events.json')
    return filter_by_id(data, event_id)


@db_app.route('/users')
@db_app.route('/users/<user_id>')
def users(user_id: str = ""):
    data = get_json_data('users.json')
    return filter_by_id(data, user_id)


@db_app.route('/check')
@db_app.route('/users/<user_id>')
def check():
    return 'check'
