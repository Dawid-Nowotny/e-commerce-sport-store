from firebase_admin import db

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
    
    @staticmethod
    def get_all_with_ids():
        ref = db.reference('brands')
        snapshot = ref.get()
        brands = [{'id': brand_id, 'name': data['name']} for brand_id, data in snapshot.items()]
        return brands