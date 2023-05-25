import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

class User:
    def __init__(self, name, email, login, password, isAdmin):
        self.name = name
        self.email = email
        self.login = login
        self.password = password
        self.isAdmin = isAdmin

    def __str__(self):
        return f"User(name='{self.name}', email='{self.email}', login='{self.login}', password='{self.password}', isAdmin={self.isAdmin})"

    def to_dict(self):
        return {
            'name': self.name,
            'email': self.email,
            'login': self.login,
            'password': self.password,
            'isAdmin': self.isAdmin
        }

    @staticmethod
    def from_dict(data):
        return User(data['name'], data['email'], data['login'], data['password'], data['isAdmin'])

    def save(self):
        ref = db.reference('users')
        new_user_ref = ref.push()
        new_user_ref.set(self.to_dict())

    @staticmethod
    def get_by_email(email):
        ref = db.reference('users')
        snapshot = ref.order_by_child('email').equal_to(email).get()
        if snapshot:
            user_data = next(iter(snapshot.values()))
            return User.from_dict(user_data)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('users')
        snapshot = ref.get()
        users = [User.from_dict(data) for data in snapshot.values()]
        return users