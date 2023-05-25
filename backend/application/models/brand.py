import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

class Brand:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Brand(name='{self.name}')"

    def to_dict(self):
        return {
            'name': self.name
        }

    @staticmethod
    def from_dict(data):
        return Brand(data['name'])

    def save(self):
        ref = db.reference('brands')
        new_brand_ref = ref.push()
        new_brand_ref.set(self.to_dict())

    @staticmethod
    def get_by_id(id):
        ref = db.reference('brands')
        snapshot = ref.child(id).get()
        if snapshot:
            return Brand.from_dict(snapshot)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('brands')
        snapshot = ref.get()
        brands = [Brand.from_dict(data) for data in snapshot.values()]
        return brands