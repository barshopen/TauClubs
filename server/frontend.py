from flask import Blueprint

frontend = Blueprint("frontend", __name__, static_folder="__staticbuild__")


@frontend.route("/", methods=['GET'])
def home():
    return frontend.send_static_file('index.html')
