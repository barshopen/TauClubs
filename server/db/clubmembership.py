from server.db.models import User, Club, ClubMembership


def createMembership(userEmail: str, club: Club, role):
    user = User.objects.get(contactMail=userEmail)
    membership = ClubMembership(
        member=user,
        memberName=f"{user.firstName} {user.lastName}",
        club=club,
        clubName=club.name,
        role=role,
    )
    return membership.save()


def createRegularMembership(userEmail: str, club):
    return createMembership(userEmail, club, "U")


def createAdminMembership(userEmail: str, club):
    return createMembership(userEmail, club, "A")
