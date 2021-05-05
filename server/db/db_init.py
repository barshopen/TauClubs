import os
import dotenv
from flask_mongoengine import MongoEngine
#from .users import User
#from .clubs import Club
#from .events import Event
#from .tags import Tag
#from .messages import Message


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
