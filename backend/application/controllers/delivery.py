from .handle_user import check_user_exists
from application.models.delivery_details import DeliveryDetails

from flask import Blueprint, jsonify, request

add_delivery_details = Blueprint('add_delivery_details', __name__, template_folder='templates')

@add_delivery_details.route('/api/delivery-data', methods=['POST'])
def set_address():
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

    if user_id is None or not check_user_exists(user_id):
        return jsonify({'success': False, 'message': 'Nie podano identyfikatora użytkownika'})
    
    address = DeliveryDetails(name, surname, country, city, street, house_number, postcode, phone_number, user_id)

    id_dd = address.save()

    return jsonify({'success': True, 'message': 'Dodano adres pomyślnie', 'delivery_id': id_dd})