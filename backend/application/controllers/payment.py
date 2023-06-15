import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.stripeConfig import key

models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.order import Order
from models.product import Product
from models.stock import Stock

from flask import Blueprint, jsonify, request, redirect
import stripe
import stripe.error

stripe.api_key = key

payment = Blueprint('payment', __name__, template_folder='templates')

YOUR_DOMAIN = 'http://localhost:4200'

@payment.route('/api/payment', methods=['POST'])
async def process_payment():
    submitted_data = request.get_json()
    o_id = submitted_data.get('order_id')

    order = Order.get_by_id(o_id)

    try:
        line_items = []
        insufficient_stock = []

        for product_data in order.products:
            product_id = product_data['id']
            product = Product.get_by_id(product_id)

            stock = Stock.get_by_product_id_and_size(product_id, product_data.get('size'))

            if stock and stock.amount >= product_data.get('amount'):
                product_data = {
                    'name': product.name,
                    'type': 'physical',
                    'description': product.description,
                    'images': product.prod_images,
                    'quantity': product_data.get('amount')
                }

                stripe_product = stripe.Product.create(
                    name=product_data['name'],
                    description=product_data['description'],
                    images=product_data['images']
                )

                price = stripe.Price.create(
                    unit_amount=int(product.price * 100),
                    currency='pln',
                    product=stripe_product.id
                )

                line_item = {
                    'price': price.id,
                    'quantity': product_data['quantity']
                }
                line_items.append(line_item)

                stock.amount -= product_data['quantity']
                stock.save()
            else:
                insufficient_stock.append({
                    'product_id': product_id,
                    'size': product_data.get('size')
                })

        if insufficient_stock:
            return jsonify({'success': False, 'message': 'Niedostępne produkty', 'insufficient_stock': insufficient_stock})

        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            success_url=YOUR_DOMAIN + '/success.html',
            cancel_url=YOUR_DOMAIN + '/cancel.html',
        )

        return jsonify({'url': checkout_session.url, 'code': 303})

    except stripe.error.StripeError as e:
        return str(e)