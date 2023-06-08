import os, sys
#models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
#sys.path.insert(0, models_path)

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from firebase_admin import auth, exceptions
from config.FirebaseManager import FirebaseManager
firebase_manager = FirebaseManager()

from flask import Blueprint, jsonify, request

register_page = Blueprint('register_page', __name__, template_folder='templates')

@register_page.route('/api/register', methods=['POST'])
async def register_confirm():
    submitted_data = request.get_json()
    email = submitted_data.get('username')
    password = submitted_data.get('password')

    try:
        existing_user = auth.get_user_by_email(email)
        return jsonify({'success': False, 'message': 'Konto z takim emailem jest już zarejestrowane'})
    except ValueError:
        return jsonify({'success': False, 'message': 'Nieprawidłowy adres e-mail.'})
    except exceptions.NotFoundError:
        try:
            user = auth.create_user(
                email=email,
                password=password
            )

            uid = user.uid

            return jsonify({'success': True, 'message': 'Rejestracja powiodła się', 'user_id': uid})
        except:
            return jsonify({'success': False, 'message': 'Nieokreślony błąd.'})