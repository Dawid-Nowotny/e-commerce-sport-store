import os, sys, datetime
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

class Order:
    def __init__(self, user_id, delivery_data_id, products, price, payment_status, date_exp=None):
        self.user_id = user_id
        self.delivery_data_id = delivery_data_id
        self.products = products
        self.price = price
        self.payment_status = payment_status
        if date_exp is None:
            self.date_exp = datetime.datetime.now() + datetime.timedelta(hours=24)
        else:
            self.date_exp = date_exp

    def __str__(self):
        return f"Order(user_id='{self.user_id}', delivery_data_id='{self.delivery_data_id}', " \
               f"products={self.products}, price={self.price}, payment_status='{self.payment_status}', " \
               f"date='{self.date_exp}')"

    def to_dict(self):
        order_dict = {
            'user_id': self.user_id,
            'delivery_data_id': self.delivery_data_id,
            'products': self.products,
            'price': self.price,
            'payment_status': self.payment_status,
            'date': self.date_exp.isoformat()
        }

        if hasattr(self, 'order_id'):
            order_dict['order_id'] = self.order_id

        return order_dict

    @staticmethod
    def from_dict(data):
        order = Order(data['user_id'], data['delivery_data_id'], data['products'], data['price'], data['payment_status'])
        if 'date' in data:
            order.date_exp = datetime.datetime.fromisoformat(data['date'])
        return order

    def save(self):
        if hasattr(self, 'order_id'):
            ref = db.reference('orders')
            ref.child(self.order_id).set(self.to_dict())
        else:
            ref = db.reference('orders')
            new_order_ref = ref.push(self.to_dict())
            self.order_id = new_order_ref.key
            return self.order_id

    @staticmethod
    def get_by_id(id):
        ref = db.reference('orders')
        snapshot = ref.child(id).get()
        if snapshot:
            order = Order.from_dict(snapshot)
            order.order_id = id
            return order
        else:
            return None

    @staticmethod
    def get_all():
        ref = db.reference('orders')
        snapshot = ref.get()
        orders = [Order.from_dict(data) for data in snapshot.values()]
        for i, order in enumerate(orders):
            order.order_id = list(snapshot.keys())[i]
        return orders