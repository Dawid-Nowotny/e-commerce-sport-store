from application.models.product import Product

from flask import Blueprint, jsonify, request

search = Blueprint('search', __name__, template_folder='templates')

@search.route('/api/search', methods=['GET'])
def get_search_results():
    p_name = request.args.get('name')
    
    all_products = Product.get_all()
    all_products.reverse()
    matching_products = []
    
    for product in all_products:
        if p_name.lower() in product.name.lower():
            matching_products.append(product)

    num_matching_products = len(matching_products)

    if num_matching_products >= 5:
        return jsonify({'items': [product.to_dict() for product in matching_products[:5]]})
    else:
        return jsonify({'items': [product.to_dict() for product in matching_products]})