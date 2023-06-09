import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.brand import Brand
from models.category import Category

from flask import Blueprint, jsonify, request

product_details = Blueprint('product_details', __name__, template_folder='templates')

get_brand_and_category_lists = Blueprint('get_brand_and_category_lists', __name__, template_folder='templates')

@get_brand_and_category_lists.route('/api/admin/get-lists', methods=['POST'])
async def get_lists():
    categories = Category.get_all_with_ids()
    brands = Brand.get_all_with_ids()

    print(categories)
    print(brands)

    return jsonify({'categories': categories, 'brands': brands})