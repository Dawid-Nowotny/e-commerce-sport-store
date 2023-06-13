import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

class Order:
    def __init__(self, user_id, delivery_data_id, products, price):
        self.user_id = user_id
        self.delivery_data_id = delivery_data_id
        self.products = products
        self.price = price
        self.payment_status = "Not paid"

    def __str__(self):
        return f"Order(user_id='{self.user_id}', delivery_data_id='{self.delivery_data_id}', " \
               f"products={self.products}, price={self.price}, payment_status='{self.payment_status}')"

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'delivery_data_id': self.delivery_data_id,
            'products': self.products,
            'price': self.price,
            'payment_status': self.payment_status
        }

    @staticmethod
    def from_dict(data):
        return Order(data['user_id'], data['delivery_data_id'], data['products'], data['price'])

    def save(self):
        ref = db.reference('orders')
        new_order_ref = ref.push(self.to_dict())
        new_order_id = new_order_ref.key
        return new_order_id

    @staticmethod
    def get_by_id(id):
        ref = db.reference('orders')
        snapshot = ref.child(id).get()
        if snapshot:
            return Order.from_dict(snapshot)
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('orders')
        snapshot = ref.get()
        orders = [Order.from_dict(data) for data in snapshot.values()]
        return orders