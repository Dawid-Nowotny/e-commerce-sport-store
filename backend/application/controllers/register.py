import os, sys
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)
from models.user import User
from .passwordManager import hash_password

from flask import Blueprint, jsonify, request

register_page = Blueprint('register_page', __name__, template_folder='templates')

@register_page.route('/api/register', methods=['POST'])
@register_page.route('/api/register', methods=['POST'])
async def register_confirm():
    submitted_data = request.get_json()
    email = submitted_data.get('username')
    password = submitted_data.get('password')

    existing_user = User.get_by_email(email)
    if existing_user:
        response_data = {
            'message': 'Użytkownik o tym adresie e-mail już istnieje',
            'success': False
        }
    else:
        hashed_password, salt = hash_password(password)
        user = User(name='', email=email, salt=salt, password=hashed_password, isAdmin=False)

        try:
            user.save()
            response_data = {
                'message': 'Zarejestrowano',
                'success': True
            }
        except:
            response_data = {
                'message': 'Błąd przy rejestracji',
                'success': False
            }

    response = jsonify(response_data)
    return response