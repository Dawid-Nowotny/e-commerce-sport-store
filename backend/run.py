from app import app
from apscheduler.schedulers.background import BackgroundScheduler

from application.controllers.login import login_page
from application.controllers.logout import logout
from application.controllers.login_google import google_login_page
from application.controllers.register import register_page

from application.controllers.main_page import main_page_products, main_page_products_filtered
from application.controllers.product_detail import product_details, product_details_edit
from application.controllers.handle_cart import add_to_cart, get_cart, delete_from_cart, increase_product_amount

from application.controllers.handle_admin_operation import check_admin, add_new_product, edit_product, delete_product, append_stock, get_user_orders, change_payment_status
from application.controllers.category_brand_lists import get_brand_and_category_lists, get_category_type

from application.controllers.delivery import add_delivery_details
from application.controllers.order_hanler import add_order, get_order_user_list
from application.controllers.payment import payment
from application.controllers.payment_result import payment_success, payment_failure

from application.controllers.search import search

from application.controllers.scheduler import payment_exp

scheduler = BackgroundScheduler(daemon=True)
scheduler.add_job(payment_exp, 'interval', hours=24)
scheduler.start()

app.register_blueprint(login_page)
app.register_blueprint(google_login_page)
app.register_blueprint(logout)
app.register_blueprint(register_page)

app.register_blueprint(main_page_products)
app.register_blueprint(main_page_products_filtered)

app.register_blueprint(product_details)
app.register_blueprint(product_details_edit)

app.register_blueprint(add_to_cart)
app.register_blueprint(get_cart)
app.register_blueprint(delete_from_cart)
app.register_blueprint(increase_product_amount)

app.register_blueprint(check_admin)
app.register_blueprint(add_new_product)
app.register_blueprint(edit_product)
app.register_blueprint(delete_product)
app.register_blueprint(append_stock)
app.register_blueprint(get_user_orders)
app.register_blueprint(change_payment_status)

app.register_blueprint(get_brand_and_category_lists)
app.register_blueprint(get_category_type)

app.register_blueprint(add_delivery_details)
app.register_blueprint(add_order)
app.register_blueprint(get_order_user_list)

app.register_blueprint(payment)
app.register_blueprint(payment_success)
app.register_blueprint(payment_failure)

app.register_blueprint(search)

if __name__ == '__main__':
    app.run(debug=False, port=5000, host='0.0.0.0')