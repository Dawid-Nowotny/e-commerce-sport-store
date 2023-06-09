from flask import Flask
from flask_cors import CORS
from app import app

from application.controllers.login import login_page
from application.controllers.login_google import google_login_page
from application.controllers.register import register_page

from application.controllers.main_page import main_page_products
from application.controllers.product_detail import product_details
from application.controllers.handle_cart import add_to_cart, get_cart, delete_from_cart, increase_product_amount

app.register_blueprint(login_page)
app.register_blueprint(google_login_page)
app.register_blueprint(register_page)

app.register_blueprint(main_page_products)
app.register_blueprint(product_details)

app.register_blueprint(add_to_cart)
app.register_blueprint(get_cart)
app.register_blueprint(delete_from_cart)
app.register_blueprint(increase_product_amount)

if __name__ == '__main__':
    app.run(debug=False, port=5000, host='0.0.0.0')