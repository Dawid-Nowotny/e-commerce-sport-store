import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.stock import Stock
from models.product import Product

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager

firebase_manager = FirebaseManager()

from flask import Blueprint, jsonify, request

main_page_products = Blueprint('main_page_products', __name__, template_folder='templates')
main_page_products_filtered = Blueprint('main_page_products_filtered', __name__, template_folder='templates')

@main_page_products.route('/api/products', methods=['GET'])
async def get_products():
    pageIndex = int(request.args.get('pageIndex'))
    pageSize = int(request.args.get('pageSize'))

    start_index = pageIndex * pageSize
    end_index = start_index + pageSize

    products = Product.get_recently_added(end_index)
    products = products[start_index:end_index]

    products_dict = [product.to_dict() for product in products]
    return jsonify({'items': products_dict, 'totalItems': Product.get_product_count()})

@main_page_products_filtered.route('/api/filtered-products', methods=['GET'])
async def get_products_filtered():
    pageIndex = int(request.args.get('pageIndex'))
    pageSize = int(request.args.get('pageSize'))
    price_order = str(request.args.get('priceOrder'))
    category_id = str(request.args.get('category'))
    brand_id = str(request.args.get('brand'))
    size = str(request.args.get('size'))
    minPrice = str(request.args.get('minPrice'))
    maxPrice = str(request.args.get('maxPrice'))

    start_index = pageIndex * pageSize
    end_index = start_index + pageSize

    products = Product.get_all()

    lengths = []
    if price_order == 'asc':
        products.sort(key=lambda p: float(p.price))
        prod_len = Product.get_product_count()
    elif price_order == 'desc':
        products.sort(key=lambda p: float(p.price), reverse=True)
        prod_len = Product.get_product_count()
    else:
        products.reverse()
        prod_len = Product.get_product_count()

    lengths.append(prod_len)

    if category_id != 'None':
        products = [product for product in products if product.category_id == category_id]
        prod_len_CB = len(products)

    if brand_id != 'None':
        products = [product for product in products if product.brand_id == brand_id]
        prod_len_CB = len(products)

    if size != 'None':
        filtered_products = []
        for product in products:
            sizes_and_amounts = get_sizes_and_amounts(product.id)
            if size in sizes_and_amounts:
                filtered_products.append(product)
        products = filtered_products
        prod_len_CB = len(products)

    if minPrice != 'None':
        products = filter_by_min_price(products, float(minPrice))
        prod_len_CB = len(products)

    if maxPrice != 'None':
        products = filter_by_max_price(products, float(maxPrice))
        prod_len_CB = len(products)
    
    try:
        lengths.append(prod_len_CB)
    except:
        pass

    products = products[start_index:end_index]
    products_dict = [product.to_dict() for product in products]

    return jsonify({'items': products_dict, 'totalItems': min(lengths)})

def get_sizes_and_amounts(id):
        stock_list = Stock.get_by_product_id(id)
        sizes_and_amounts = {}
        for stock in stock_list:
            sizes_and_amounts[stock.size] = stock.amount
        return sizes_and_amounts

def filter_by_min_price(products, minPrice):
    filtered_products = []
    for product in products:
        if float(product.price) >= minPrice:
            filtered_products.append(product)
    return filtered_products

def filter_by_max_price(products, maxPrice):
    filtered_products = []
    for product in products:
        if float(product.price) <= maxPrice:
            filtered_products.append(product)
    return filtered_products