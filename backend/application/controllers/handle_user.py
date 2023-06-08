import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager
from firebase_admin import auth, exceptions

firebase_manager = FirebaseManager()

def check_user_exists(user_id):
    try:
        user = auth.get_user(user_id)
        return True
    except exceptions.NotFoundError:
        return False