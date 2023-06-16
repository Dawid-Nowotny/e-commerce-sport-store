import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.delivery_details import DeliveryDetails
from models.order import Order
from models.product import Product
from models.stock import Stock

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager
firebase_manager = FirebaseManager()

from app import redis_client

from flask import Blueprint, jsonify, request
import json

add_order = Blueprint('add_order', __name__, template_folder='templates')
get_order_user_list = Blueprint('get_order_user_list', __name__, template_folder='templates')

@add_order.route('/api/add-order', methods=['POST'])
async def create_order():
    submitted_data = request.get_json()
    user_id = submitted_data.get('user_id')
    del_id = submitted_data.get('delivery_id')

    if user_id is None:
        return jsonify({'success': False, 'message': 'Nie podano identyfikatora użytkownika'})

    delivery_details = DeliveryDetails.get_by_id(del_id)

    if delivery_details is None:
        return jsonify({'success': False, 'message': 'Nie znaleziono szczegółów dostawy dla podanego identyfikatora użytkownika'})

    existing_data = redis_client.get(user_id)
    if existing_data:
        existing_data = json.loads(existing_data)
        total_price = 0
        products = []
        is_any_product_unavailable = False

        for product_data in existing_data:
            product_id = product_data.get('product')
            product = Product.get_by_id(product_id)
            size = product_data.get('size')
            amount = product_data.get('amount')

            stock = Stock.get_by_product_id_and_size(product_id, size)
            if stock is None or stock.amount < amount:
                is_any_product_unavailable = True
                break

            price = float(product.price) * amount
            total_price += price
            product_dict = {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'size': size,
                'amount': amount,
            }
            products.append(product_dict)

        if is_any_product_unavailable:
            return jsonify({'success': False, 'message': 'Jeden lub więcej produktów jest niedostępnych'})

        for product_data in existing_data:
            product_id = product_data.get('product')
            size = product_data.get('size')
            amount = product_data.get('amount')
            stock = Stock.get_by_product_id_and_size(product_id, size)
            stock.amount -= amount
            stock.save()

        o = Order(user_id, del_id, products, total_price, "Not paid")
        o_id = o.save()

        return jsonify({'success': True, 'message': 'Zamówienie zostało dodane', 'order_id': o_id})
    else:
        return jsonify({'success': False, 'message': 'W koszyku nie ma żadnego produktu'})

@get_order_user_list.route('/api/get-orders', methods=['GET'])
async def get_orders():
    user_id = request.args.get('user_id')

    if user_id is None:
        return jsonify({'success': False, 'message': 'Brak identyfikatora użytkownika'})

    orders = Order.get_all()
    user_orders = []

    for order in orders:
        if order.user_id == user_id:
            user_orders.append(order)

    user_orders_data = [order.to_dict() for order in user_orders]

    return jsonify({'success': True, 'orders': user_orders_data})