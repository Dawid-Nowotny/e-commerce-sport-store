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
get_cart = Blueprint('get_cart', __name__, template_folder='templates')
delete_from_cart = Blueprint('delete_from_cart', __name__, template_folder='templates')
increase_product_amount = Blueprint('increase_product_amount', __name__, template_folder='templates')

@add_to_cart.route('/api/add-to-cart', methods=['POST'])
async def handle_add():
    submitted_data = request.get_json()
    user_id = submitted_data.get('userId')
    product_id = submitted_data.get('productId')
    size = submitted_data.get('size')
    amount = 1

    if user_id is None:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})

    if check_user_exists(user_id):
        existing_data = redis_client.get(user_id)
        if existing_data:
            existing_products = json.loads(existing_data.decode())
        else:
            existing_products = []

        for existing_product in existing_products:
            if existing_product['product'] == product_id and existing_product['size'] == size:
                existing_product['amount'] += 1
                break
        else:
            product = ProductRedis(product_id, size, amount)
            existing_products.append(product.to_json())

        updated_data = json.dumps(existing_products)
        redis_client.set(user_id, updated_data)

        return jsonify({'success': True, 'message': 'Produkt został dodany do koszyka'})
    else:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})
    
@get_cart.route('/api/get-cart', methods=['GET'])
async def handle_get():
    user_id = request.args.get('userId')
    
    if user_id is None:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})
    
    if check_user_exists(user_id):
        existing_data = redis_client.get(user_id)
        if existing_data:
            existing_products = json.loads(existing_data.decode())
            
            cart = []
            total_price = 0
            
            for product_data in existing_products:
                product_id = product_data.get('product')
                product = Product.get_by_id(product_id)
                stock = Stock.get_by_product_id_and_size(product_id, product_data.get('size'))
                
                price = float(product.price) * int(product_data.get('amount'))
                total_price += price
                
                cart.append({
                    'id': product_id,
                    'name': product.name,
                    'size': product_data.get('size'),
                    'price': round(product.price * product_data.get('amount'),2),
                    'amount': product_data.get('amount'),
                    'stock_amount': stock.amount if stock else None,
                })

            return jsonify({'success': True, 'cart': cart, 'total_price': round(total_price, 2)})
        else:
            return jsonify({'success': True, 'cart': [], 'total_price': 0})
    else:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})
    
@delete_from_cart.route('/api/delete-from-cart', methods=['DELETE'])
async def handle_delete():
    submitted_data = request.get_json()
    user_id = submitted_data.get('userId')
    product_id = submitted_data.get('productId')
    size = submitted_data.get('size')

    if user_id is None:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})

    existing_data = redis_client.get(user_id)
    if existing_data:
        existing_products = json.loads(existing_data.decode())
        for existing_product in existing_products:
            if existing_product['product'] == product_id and existing_product['size'] == size:
                existing_products.remove(existing_product)
                break

        updated_data = json.dumps(existing_products)
        redis_client.set(user_id, updated_data)

        return jsonify({'success': True, 'message': 'Produkt został usunięty z koszyka'})
    else:
        return jsonify({'success': True, 'message': 'Koszyk jest pusty'})
    
@increase_product_amount.route('/api/set-product-amount', methods=['PUT'])
async def handle_increase():
    submitted_data = request.get_json()
    user_id = submitted_data.get('userId')
    product_id = submitted_data.get('productId')
    size = submitted_data.get('size')
    amount = int(submitted_data.get('amount'))

    if user_id is None:
        return jsonify({'success': False, 'message': 'Użytkownik o podanym identyfikatorze nie istnieje'})

    existing_data = redis_client.get(user_id)
    if existing_data:
        existing_products = json.loads(existing_data.decode())

        for existing_product in existing_products:
            if existing_product['product'] == product_id and existing_product['size'] == size:
                existing_product['amount'] = amount
                break

        updated_data = json.dumps(existing_products)
        redis_client.set(user_id, updated_data)

        return jsonify({'success': True, 'message': 'Ilość produktu została zaktualizowana'})
    else:
        return jsonify({'success': True, 'message': 'Koszyk jest pusty'})
