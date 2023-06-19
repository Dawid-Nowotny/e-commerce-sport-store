from firebase_admin import db

class Category:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Category(name='{self.name}')"

    def to_dict(self):
        return {
            'name': self.name
        }

    @staticmethod
    def from_dict(data):
        return Category(data['name'])

    def save(self):
        ref = db.reference('categories')
        new_category_ref = ref.push()
        new_category_ref.set(self.to_dict())

    @staticmethod
    def get_by_id(id):
        ref = db.reference('categories')
        snapshot = ref.child(id).get()
        if snapshot:
            return Category.from_dict(snapshot)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('categories')
        snapshot = ref.get()
        categories = [Category.from_dict(data) for data in snapshot.values()]
        return categories
    
    @staticmethod
    def get_all_with_ids():
        ref = db.reference('categories')
        snapshot = ref.get()
        categories = [{'id': category_id, 'name': data['name']} for category_id, data in snapshot.items()]
        return categories