import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.product import Product

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

from flask import Blueprint, jsonify, request

main_page_products = Blueprint('main_page_products', __name__, template_folder='templates')

@main_page_products.route('/api/products', methods=['POST'])
async def get_products():
    submitted_data = request.get_json()
    pageIndex = submitted_data.get('pageIndex')
    pageSize = submitted_data.get('pageSize')

    start_index = pageIndex * pageSize
    end_index = start_index + pageSize

    products = Product.get_recently_added(end_index)
    products = products[start_index:end_index]

    products_dict = [product.to_dict() for product in products]
    return jsonify({'items': products_dict, 'totalItems': Product.get_product_count()})