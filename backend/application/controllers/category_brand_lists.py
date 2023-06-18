from application.models.brand import Brand
from application.models.category import Category
from application.models.product import Product

from flask import Blueprint, jsonify, request

get_brand_and_category_lists = Blueprint('get_brand_and_category_lists', __name__, template_folder='templates')
get_category_type = Blueprint('get_category_type', __name__, template_folder='templates')

@get_brand_and_category_lists.route('/api/get-lists', methods=['GET'])
def get_lists():
    categories = Category.get_all_with_ids()
    brands = Brand.get_all_with_ids()

    return jsonify({'categories': categories, 'brands': brands})

@get_category_type.route('/api/admin/get-product-category', methods=['GET'])
def get_type():
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