import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.product import Product
from models.stock import Stock
from models.products_redis import ProductRedis
from .handle_user import check_user_exists

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from app import redis_client

from flask import Blueprint, jsonify, request
import json

add_to_cart = Blueprint('add_to_cart', __name__, template_folder='templates')

@add_to_cart.route('/api/add-to-cart', methods=['POST'])
async def handle_add():
    submitted_data = request.get_json()
    user_id = submitted_data.get('userId')
    product_id = submitted_data.get('productId')
    size = submitted_data.get('size')

    if user_id is None:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})

    if check_user_exists(user_id):
        existing_data = redis_client.get(user_id)
        if existing_data:
            existing_products = json.loads(existing_data.decode())
        else:
            existing_products = []

        product = ProductRedis(product_id, size)
        existing_products.append(product.to_json())

        updated_data = json.dumps(existing_products)

        redis_client.set(user_id, updated_data)

        return jsonify({'success': True, 'message': 'Produkt został dodany do koszyka'})
    else:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})