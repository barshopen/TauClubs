def approve_user_message(full_name, club_name):
    subject = "Registration request confirmation"
    body = (
        f"Hi {full_name},\nYour application to join {club_name}"
        " club has been approved."
    )
    return subject, body


def remove_by_admin(full_name, club_name):
    subject = "Membership status"
    body = f"Hi {full_name},\n An admin removed you from {club_name} club."
    return subject, body


def approve_manager(full_name, club_name):
    subject = "Membership status"
    body = f"Hi {full_name},\n An admin added you as admin to {club_name} club."
    return subject, body


def delete_club(club_name):
    subject = f"{club_name} club status"
    body = f"Hi,\n The {club_name} club has been closed."
    return subject, body
