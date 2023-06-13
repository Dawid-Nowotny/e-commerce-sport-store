import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.stripeConfig import key

models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.order import Order

from flask import Blueprint, jsonify, request, redirect
import stripe

stripe.api_key = key

payment = Blueprint('payment', __name__, template_folder='templates')

YOUR_DOMAIN = 'http://localhost:4200'

@payment.route('/api/payment', methods=['POST'])
async def process_payment():
    submitted_data = request.get_json()
    o_id = submitted_data.get('order_id')

    order = Order.get_by_id(o_id)
    order_price = int(order.price * 100)
    
    product_data = {
        'name': 'Nazwa produktu',
        'type': 'physical',
        'description': 'Opis produktu',
    }

    try:
        product = stripe.Product.create(
            name=product_data['name'],
            description=product_data['description'],
        )

        price = stripe.Price.create(
            unit_amount=order_price,
            currency='pln',
            product=product.id
        )
        
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': price.id,
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + '/success.html',
            cancel_url=YOUR_DOMAIN + '/cancel.html',
        )
        
        return jsonify({'url': checkout_session.url, 'code': 303})

    except stripe.StripeError as e:
        return str(e)