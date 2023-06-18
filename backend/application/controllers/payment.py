from application.models.order import Order
from application.models.product import Product

from flask import Blueprint, jsonify, request

import stripe
import stripe.error
from config.stripeConfig import key

stripe.api_key = key

payment = Blueprint('payment', __name__, template_folder='templates')

YOUR_DOMAIN = 'http://localhost:4200'

@payment.route('/api/payment', methods=['POST'])
def process_payment():
    submitted_data = request.get_json()
    o_id = submitted_data.get('order_id')

    order = Order.get_by_id(o_id)

    try:
        line_items = []

        for product_data in order.products:
            product_id = product_data['id']
            product = Product.get_by_id(product_id)

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

        checkout_session = stripe.checkout.Session.create(
            line_items=line_items,
            mode='payment',
            success_url=YOUR_DOMAIN + '/payment-success',
            cancel_url=YOUR_DOMAIN + '/payment-cancel',
        )

        return jsonify({'url': checkout_session.url, 'code': 303})

    except stripe.error.StripeError as e:
        return str(e)