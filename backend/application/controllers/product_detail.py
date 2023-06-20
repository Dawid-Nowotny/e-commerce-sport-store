from application.models.product import Product
from application.models.stock import Stock

from flask import Blueprint, jsonify, request

product_details = Blueprint('product_details', __name__, template_folder='templates')
product_details_edit = Blueprint('product_details_edit', __name__, template_folder='templates')

@product_details.route('/api/product-details', methods=['GET'])
def get_product_detail():
    id_p = str(request.args.get('productId'))

    product = Product.get_by_id(id_p)

    if product:
        product_dict = product.to_dict()

        if product_dict['category'] == "Ubranie":
            stock_list = Stock.get_by_product_id(id_p)
            sizes_and_amounts = {}
            for stock in stock_list:
                size_number = convert_size_to_number(stock.size)
                sizes_and_amounts[size_number] = stock.amount

        else:
            stock_list = Stock.get_by_product_id(id_p)
            sizes_and_amounts = {}
            for stock in stock_list:
                sizes_and_amounts[stock.size] = stock.amount

        product_dict['sizes_and_amounts'] = sizes_and_amounts

        return jsonify({'items': product_dict})
    else:
        return jsonify({'error': 'Produktu nie odnaleziono'})

def convert_size_to_number(size):
    size_mapping = {
        'XS': 1,
        'S': 2,
        'M': 3,
        'L': 4,
        'XL': 5,
        'XXL': 6
    }
    return size_mapping.get(size, size)

@product_details_edit.route('/api/admin/product-details-edit', methods=['GET'])
def get_details_for_edit():
    id_p = str(request.args.get('productId'))

    product = Product.get_by_id(id_p)

    if product:
        product_dict = product.to_dict_with_ids()

        return jsonify({'items': product_dict})
    else:
        return jsonify({'error': 'Produktu nie odnaleziono'})