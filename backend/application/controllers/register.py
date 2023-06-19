from firebase_admin import auth, exceptions
from flask import Blueprint, jsonify, request

register_page = Blueprint('register_page', __name__, template_folder='templates')

@register_page.route('/api/register', methods=['POST'])
def register_confirm():
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

            return jsonify({'success': True, 'message': 'Rejestracja powiodła się', 'user_id': uid, 'user_name': email})
        except:
            return jsonify({'success': False, 'message': 'Nieokreślony błąd.'})