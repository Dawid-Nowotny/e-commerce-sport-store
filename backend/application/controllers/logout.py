from flask import Blueprint, jsonify, request
from app import redis_client
from .handle_user import check_user_exists

logout = Blueprint('logout', __name__, template_folder='templates')

@logout.route('/api/logout', methods=['PUT'])
def logout_user():
    user_id = request.get_data('user_id')

    if user_id is None or not check_user_exists(user_id):
        return jsonify({'success': False, 'message': 'Nie podano identyfikatora użytkownika'})

    redis_client.delete(user_id)
    
    return jsonify({'success': True, 'message': 'Użytkownik został wylogowany'})