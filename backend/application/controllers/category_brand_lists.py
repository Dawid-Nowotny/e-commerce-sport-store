import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.brand import Brand
from models.category import Category
from models.product import Product

from flask import Blueprint, jsonify, request

product_details = Blueprint('product_details', __name__, template_folder='templates')

get_brand_and_category_lists = Blueprint('get_brand_and_category_lists', __name__, template_folder='templates')
get_category_type = Blueprint('get_category_type', __name__, template_folder='templates')

@get_brand_and_category_lists.route('/api/admin/get-lists', methods=['GET'])
async def get_lists():
    categories = Category.get_all_with_ids()
    brands = Brand.get_all_with_ids()

    return jsonify({'categories': categories, 'brands': brands})

@get_category_type.route('/api/admin/get-product-category', methods=['GET'])
async def get_type():
    product_id = request.args.get('id')
    product = Product.get_by_id(product_id)
    if product:
        category = Category.get_by_id(product.category_id)
        if category:
            return jsonify({'category': category.name})
        else:
            return jsonify({'message': 'Nie znaleziono kategorii dla podanego produktu.'})
    else:
        return jsonify({'message': 'Produkt o podanym ID nie istnieje.'})