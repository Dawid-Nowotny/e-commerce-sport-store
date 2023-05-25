import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

class Address:
    def __init__(self, country, city, street, house_number, postcode, phone_number, user_id):
        self.country = country
        self.city = city
        self.street = street
        self.house_number = house_number
        self.postcode = postcode
        self.phone_number = phone_number
        self.user_id = user_id

    def __str__(self):
        return f"Address(country='{self.country}', city='{self.city}', street='{self.street}', " \
               f"house_number='{self.house_number}', postcode='{self.postcode}', " \
               f"phone_number='{self.phone_number}', user_id='{self.user_id}')"

    def to_dict(self):
        return {
            'country': self.country,
            'city': self.city,
            'street': self.street,
            'house_number': self.house_number,
            'postcode': self.postcode,
            'phone_number': self.phone_number,
            'user_id': self.user_id
        }

    @staticmethod
    def from_dict(data):
        return Address(data['country'], data['city'], data['street'], data['house_number'], data['postcode'],
                       data['phone_number'], data['user_id'])

    def save(self):
        ref = db.reference('addresses')
        new_address_ref = ref.push()
        new_address_ref.set(self.to_dict())

    @staticmethod
    def get_by_id(id):
        ref = db.reference('addresses')
        snapshot = ref.child(id).get()
        if snapshot:
            return Address.from_dict(snapshot)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('addresses')
        snapshot = ref.get()
        addresses = [Address.from_dict(data) for data in snapshot.values()]
        return addresses