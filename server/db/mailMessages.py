def approve_user_message(full_name, club_name):
    subject = "Registration request confirmation"
    body = (
        f"Hi {full_name},\nYour application to join {club_name}"
        " club has been approved."
    )
    return subject, body


def remove_by_admin(full_name, club_name):
    subject = "Membership status"
    body = f"Hi {full_name},\nAn admin removed you from {club_name} club."
    return subject, body


def approve_manager_message(full_name, club_name):
    subject = "Membership status"
    body = (
        f"Hi {full_name},\nAn admin has added you as an admin to the club {club_name}."
    )
    return subject, body


def delete_club_message(club_name):
    subject = f"{club_name} club status"
    body = f"Hi,\nThe {club_name} club is closed."
    return subject, body


def user_to_manager_message(info, membername, userMail, clubName):
    body = (
        f"Hello,\nYou recieved a message about \n{clubName} Club\nFrom {membername},"
        f"{userMail}\n\n{info}."
    )
    return body
