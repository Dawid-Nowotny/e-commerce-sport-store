from config.pyrebaseManager import PyrebaseManager
pyrebase_manager = PyrebaseManager()

from flask import Blueprint, jsonify, request

login_page = Blueprint('login_page', __name__, template_folder='templates')

@login_page.route('/api/login', methods=['POST'])
def confirm_login():
    submitted_data = request.get_json()
    email = submitted_data.get('username')
    password = submitted_data.get('password')

    try:
        firebase = pyrebase_manager.get_firebase()
        auth = firebase.auth()
        user = auth.sign_in_with_email_and_password(email, password)

        uid = user['localId']
        return jsonify({'success': True, 'message': 'Zalogowano pomyślnie', 'user_id': uid, 'user_name': email})
    except:
        return jsonify({'success': False, 'error': 'Błąd logowania'})