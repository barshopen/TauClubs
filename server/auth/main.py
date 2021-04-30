# https://docs.authlib.org/en/latest/client/frameworks.html#frameworks-clients
# https://github.com/joegasewicz/react-google-oauth2.0
# https://realpython.com/flask-google-login/#creating-your-own-web-application
import os
from flask import Flask, redirect, request, url_for
from flask_login import (
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user,
    UserMixin
)

from authlib.integrations.flask_client import OAuth
from flask_sqlalchemy import SQLAlchemy
import json

# Flask app setup
app = Flask(__name__)
app.secret_key = "sharon"


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/users.db'
db = SQLAlchemy(app)
db.create_all()


# User session management setup
login_manager = LoginManager()
login_manager.init_app(app)

oauth = OAuth(app)

oauth.register(
    name='google',
    client_id=os.environ.get("GOOGLE_CLIENT_ID", None),
    client_secret=os.environ.get("GOOGLE_CLIENT_SECRET", None),
    # access_token_url='https://accounts.google.com/o/oauth2/token',
    # access_token_params=None,
    # authorize_url='https://accounts.google.com/o/oauth2/auth',
    # authorize_params=None,
    # api_base_url='https://www.googleapis.com/oauth2/v1/',
    # This is only needed if using openId to fetch user info
    # userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    # client_kwargs={'scope': 'openid email profile'},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        'scope': 'openid email profile'
    }
)
google = oauth.create_client('google')  # create the google oauth client


class User(UserMixin, db.Model):
    # primary keys are required by SQLAlchemy
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(1000))

    @staticmethod
    def create(user):
        db.session.add(user)
        db.session.commit()


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route("/")
def index():
    if current_user.is_authenticated:
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            "<div><p>Google Profile Picture:</p>"
            '<img src="{}" alt="Google profile pic"></img></div>'
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.name, current_user.email, current_user.profile_pic
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'
        # return ('<script src="https://apis.google.com/js/platform.js" async defer></script>'
        #       '<meta name="google-signin-client_id" content="18740809626-1et94g7dbvpmr4ajbc289d6p4rq35i7k.apps.googleusercontent.com">'
        #      '<div class="g-signin2"></div>')


@app.route("/login")
def login():
    return google.authorize_redirect(url_for('callback', _external=True))


@app.route("/login/callback")
def callback():
    # Access token from google (needed to get user info)
    token = google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token)

    if user_info["email_verified"]:
        unique_id = user_info["sub"]
        users_email = user_info["email"]
        users_name = user_info["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

        # Create a user in your db with the information provided
    # by Google

    user = User.query.filter_by(id=unique_id, email=users_email).first()

    # Doesn't exist? Add it to the database.
    if not user:
        user = User(id_=unique_id, name=users_name,
                    email=users_email)
        User.create(user)

    # Begin user session by logging the user in
    login_user(user, remember=True)

    # Send user back to homepage
    return redirect(url_for("index"))


@ app.route("/logout")
@ login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(ssl_context="adhoc")
