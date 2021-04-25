from flask import Blueprint, render_template, Flask

app = Flask(__name__)


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


frontend = Blueprint("frontend", __name__, static_folder="")


@app.route('/')
def helloWorld():
    return 'Hello, World!'  # sda
