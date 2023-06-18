from firebase_admin import auth, exceptions

def check_user_exists(user_id):
    try:
        user = auth.get_user(user_id)
        return True
    except exceptions.NotFoundError:
        return False