import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)
from models.user import User

from flask import Blueprint,jsonify, request

login_page = Blueprint('simple_page', __name__, template_folder='templates')

@login_page.route('/api/login', methods=['POST'])
async def confirm_login():
    submitted_data = request.get_json()
    email = submitted_data.get('username')
    password = submitted_data.get('password')

    user = User.get_by_email(email)

    if user and user.password == password:
        response_data = {
        'message': 'Zalogowano',
        'success': True
        }
    else:
        response_data = {
        'message': 'wiadomosc',
        'success': False
        }

    response = jsonify(response_data)
    return response