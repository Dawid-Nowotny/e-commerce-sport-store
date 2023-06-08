import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

from .brand import Brand
from .category import Category

firebase_manager = FirebaseManager()

class Product:
    def __init__(self, id, name, price, description, characteristics, brand_id, category_id, prod_images):
        self.id = id
        self.name = name
        self.price = price
        self.description = description
        self.characteristics = characteristics
        self.brand_id = brand_id
        self.category_id = category_id
        self.prod_images = prod_images

    def __str__(self):
        return f"Product(id='{self.id}', name='{self.name}', price={self.price}, description='{self.description}', " \
            f"characteristics={self.characteristics}, brand_id='{self.brand_id}', " \
            f"category_id='{self.category_id}', prod_images={self.prod_images})"

    def to_dict(self):
        brand = Brand.get_by_id(self.brand_id)
        brand_name = brand.name if brand else None

        category = Category.get_by_id(self.category_id)
        category_name = category.name if category else None

        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'characteristics': self.characteristics,
            'brand': brand_name,
            'category': category_name,
            'prod_images': self.prod_images
        }

    @staticmethod
    def from_dict(id, data):
        return Product(
            id=id,
            name=data['name'],
            price=data['price'],
            description=data['description'],
            characteristics=data['characteristics'],
            brand_id=data['brand_id'],
            category_id=data['category_id'],
            prod_images=data['prod_images']
        )

    def save(self):
        ref = db.reference('products')
        if self.id:
            ref.child(self.id).set(self.to_dict())
        else:
            new_product_ref = ref.push()
            self.id = new_product_ref.key
            new_product_ref.set(self.to_dict())

    @staticmethod
    def get_by_id(id):
        ref = db.reference('products')
        snapshot = ref.child(id).get()
        if snapshot:
            return Product.from_dict(id, snapshot)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('products')
        snapshot = ref.get()
        products = [Product.from_dict(id, data) for id, data in snapshot.items()]
        return products

    @staticmethod
    def get_recently_added(count):
        ref = db.reference('products')
        snapshot = ref.order_by_key().limit_to_last(count).get()
        products = [Product.from_dict(id, data) for id, data in snapshot.items()]
        products.reverse()
        return products

    @staticmethod
    def get_product_count():
        ref = db.reference('products')
        snapshot = ref.get()
        product_count = len(snapshot)
        return product_count