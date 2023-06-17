import os, sys
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

from flask import Blueprint, jsonify, request
from app import redis_client

logout = Blueprint('logout', __name__, template_folder='templates')

@logout.route('/api/logout', methods=['PUT'])
async def logout_user():
    user_id = request.get_data('user_id')

    if user_id is None:
        return jsonify({'success': False, 'message': 'Nie podano identyfikatora użytkownika'})

    redis_client.delete(user_id)
    
    return jsonify({'success': True, 'message': 'Użytkownik został wylogowany'})