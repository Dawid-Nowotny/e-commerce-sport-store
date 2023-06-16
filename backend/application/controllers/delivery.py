import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from models.delivery_details import DeliveryDetails

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager
firebase_manager = FirebaseManager()

from flask import Blueprint, jsonify, request

add_delivery_details = Blueprint('add_delivery_details', __name__, template_folder='templates')

@add_delivery_details.route('/api/delivery-data', methods=['POST'])
async def set_address():
    submitted_data = request.get_json()
    name = submitted_data.get('firstname')
    surname = submitted_data.get('lastname')
    country = submitted_data.get('country')
    city = submitted_data.get('city')
    street = submitted_data.get('street')
    house_number = submitted_data.get('houseNumber')
    postcode = submitted_data.get('postcode')
    phone_number = submitted_data.get('phoneNumber')
    user_id = submitted_data.get('user_id')

    address = DeliveryDetails(name, surname, country, city, street, house_number, postcode, phone_number, user_id)

    id_dd = address.save()

    return jsonify({'success': True, 'message': 'Dodano adres pomyślnie', 'delivery_id': id_dd})