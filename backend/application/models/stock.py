import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import db
from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

class Stock:
    def __init__(self, product_id, size, amount):
        self.product_id = product_id
        self.size = size
        self.amount = amount

    def __str__(self):
        return f"Stock(product_id='{self.product_id}', size='{self.size}', amount={self.amount})"

    def to_dict(self):
        return {
            'product_id': self.product_id,
            'size': self.size,
            'amount': self.amount
        }

    @staticmethod
    def from_dict(data):
        return Stock(data['product_id'], data['size'], data['amount'])

    def save(self):
        ref = db.reference('stock')
        stock_ref = ref.child(self.product_id)
        stock_ref.child(self.size).set(self.amount)

    @staticmethod
    def get_by_product_id(product_id):
        ref = db.reference('stock')
        snapshot = ref.child(product_id).get()
        if snapshot:
            stock_list = []
            for size, amount in snapshot.items():
                stock_list.append(Stock(product_id, size, amount))
            return stock_list
        else:
            return []

    @staticmethod
    def get_by_product_id_and_size(product_id, size):
        ref = db.reference('stock')
        snapshot = ref.child(product_id).child(size).get()
        if snapshot:
            return Stock(product_id, size, snapshot)
        else:
            return None
    
    def delete(self):
        ref = db.reference('stock')
        stock_ref = ref.child(self.product_id)
        stock_ref.child(self.size).delete()