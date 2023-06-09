import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager
from firebase_admin import storage

models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.admin import Admin
from models.product import Product

from flask import Blueprint, jsonify, request
import uuid
from io import BytesIO
import datetime

product_details = Blueprint('product_details', __name__, template_folder='templates')

check_admin = Blueprint('check_admin', __name__, template_folder='templates')
add_new_product = Blueprint('add_new_product', __name__, template_folder='templates')

@check_admin.route('/api/admin', methods=['POST'])
async def bool_admin():
    submitted_data = request.get_json()
    user_id = submitted_data.get('userId')

    if user_id is None:
        return jsonify({'success': False, 'message': 'Nie podano identyfikatora użytkownika'})

    if Admin.is_admin(user_id):
        return jsonify({'isAdmin': True})
    else:
        return jsonify({'isAdmin': False})

@add_new_product.route('/api/admin/add-product', methods=['POST'])
async def new_product():
    p_id = request.form.get('id')
    brand_id = request.form.get('brand_id')
    category_id = request.form.get('category_id')
    description = request.form.get('description')
    name = request.form.get('name')
    price = request.form.get('price')

    images = request.files.getlist('images[]')

    print(brand_id)
    print(category_id)

    prod_images_dict = {}

    for image in images:
        image_name = f'{uuid.uuid4()}.jpg'

        image_data = BytesIO()
        image.save(image_data)
        image_data.seek(0)

        bucket = storage.bucket()
        blob = bucket.blob(image_name)
        blob.upload_from_file(image_data, content_type=image.content_type)

        try:
            image_url = blob.generate_signed_url(expiration=datetime.timedelta(days=7), version="v4")
            prod_images_dict[len(prod_images_dict)] = image_url
            print(image_url)
        except:
            return jsonify({'message': 'Produkt nie został dodany, błąd serwera'})

    product = Product(p_id, name, price, description, brand_id, category_id, prod_images_dict)
    product.original_save()

    return jsonify({'message': 'Produkt został dodany.'})