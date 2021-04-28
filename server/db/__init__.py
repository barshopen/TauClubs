from os import path
from flask import Blueprint, json

STATIC_FOLDER_NAME = 'mock-api'

db_app = Blueprint(
    "db_app",
    __name__,
    url_prefix="/db",
    static_folder=path.join(path.dirname(__file__), STATIC_FOLDER_NAME))


@db_app.route('/clubs')
def clubs():
    return db_app.send_static_file('clubs.json')


@db_app.route('/messages')
def messages():
    return db_app.send_static_file('messages.json')


@db_app.route('/upcoming_events')
def upcoming_events():
    return db_app.send_static_file('upcoming_events.json')


@db_app.route('/users')
def users():
    return db_app.send_static_file('users.json')
