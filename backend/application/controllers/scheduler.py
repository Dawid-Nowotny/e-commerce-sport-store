import os, sys, datetime
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.order import Order
from .payment_result import restore_stock

def payment_exp():
    orders = Order.get_all()
    current_time = datetime.datetime.now()

    for order in orders:
        if current_time > order.date_exp and order.payment_status == "Not paid":
            order.payment_status = "Cancelled"
            order.save()
            restore_stock(order)