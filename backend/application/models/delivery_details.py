from firebase_admin import db

class DeliveryDetails:
    def __init__(self, firstname, lastname, country, city, street, houseNumber, postcode, phoneNumber, user_id):
        self.firstname = firstname
        self.lastname = lastname
        self.country = country
        self.city = city
        self.street = street
        self.houseNumber = houseNumber
        self.postcode = postcode
        self.phoneNumber = phoneNumber
        self.user_id = user_id

    def __str__(self):
        return f"DeliveryDetails(firstname='{self.firstname}', lastname='{self.lastname}', country='{self.country}', " \
            f"city='{self.city}', street='{self.street}', houseNumber='{self.houseNumber}', " \
            f"postcode='{self.postcode}', phoneNumber='{self.phoneNumber}', user_id='{self.user_id}')"

    def to_dict(self):
        return {
            'firstname': self.firstname,
            'lastname': self.lastname,
            'country': self.country,
            'city': self.city,
            'street': self.street,
            'houseNumber': self.houseNumber,
            'postcode': self.postcode,
            'phoneNumber': self.phoneNumber,
            'user_id': self.user_id
        }

    @staticmethod
    def from_dict(data):
        return DeliveryDetails(data['firstname'], data['lastname'], data['country'], data['city'], data['street'],
                    data['houseNumber'], data['postcode'], data['phoneNumber'], data['user_id'])

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