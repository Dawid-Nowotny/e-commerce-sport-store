from firebase_admin import db

class DeliveryDetails:
    def __init__(self, name, surname, country, city, street, house_number, postcode, phone_number, user_id):
        self.name = name
        self.surname = surname
        self.country = country
        self.city = city
        self.street = street
        self.house_number = house_number
        self.postcode = postcode
        self.phone_number = phone_number
        self.user_id = user_id

    def __str__(self):
        return f"Address(name='{self.name}', surname='{self.surname}', country='{self.country}', " \
               f"city='{self.city}', street='{self.street}', house_number='{self.house_number}', " \
               f"postcode='{self.postcode}', phone_number='{self.phone_number}', user_id='{self.user_id}')"

    def to_dict(self):
        return {
            'name': self.name,
            'surname': self.surname,
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
        return DeliveryDetails(data['name'], data['surname'], data['country'], data['city'], data['street'],
                       data['house_number'], data['postcode'], data['phone_number'], data['user_id'])

    def save(self):
        ref = db.reference('addresses')
        new_address_ref = ref.push(self.to_dict())
        new_address_id = new_address_ref.key
        return new_address_id

    @staticmethod
    def get_by_id(id):
        ref = db.reference('addresses')
        snapshot = ref.child(id).get()
        if snapshot:
            return DeliveryDetails.from_dict(snapshot)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('addresses')
        snapshot = ref.get()
        addresses = [DeliveryDetails.from_dict(data) for data in snapshot.values()]
        return addresses