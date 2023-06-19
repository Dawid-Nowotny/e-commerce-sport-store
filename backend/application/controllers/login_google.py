import os
import sys
from flask import Blueprint, jsonify, request
from firebase_admin import auth, exceptions
import requests
models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, models_path)

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, backend_path)

from config.FirebaseManager import FirebaseManager
firebase_manager = FirebaseManager()

from config.pyrebaseManager import PyrebaseManager
pyrebase_manager = PyrebaseManager()

from config.login_google_config import client_id, client_secret

google_login_page = Blueprint('google_login_page', __name__, template_folder='templates')

@google_login_page.route('/api/login_google', methods=['POST'])
def login_google():

    code = request.get_json().get('code')
    
    try:
        exchanged_code = exchange_code(code)
        access_token = exchanged_code['access_token']
        token_info = get_token_info(access_token)

        uid = token_info['sub']
        email = token_info['email']
        custom_token = login_with_google(token_info)

        if custom_token == None:
            return jsonify({'success': False, 'message': 'Konto z takim emailem jest już zarejestrowane'})

        firebase = pyrebase_manager.get_firebase()
        auth = firebase.auth()
        auth.sign_in_with_custom_token(custom_token.decode())

        return jsonify({'success': True, 'message': 'Zalogowano pomyślnie', 'user_id': uid, 'user_name': email})
    except exceptions.FirebaseError as error:
        return jsonify({'success': False, 'error': str(error)})





def login_with_google(token_info):
        email = token_info['email']
        uid = token_info['sub']

        custom_token = auth.create_custom_token(uid)

        try:
            existing_user = auth.get_user(uid)
            print("Użytkownik google już istnieje w bazie danych")
            return custom_token
        except exceptions.NotFoundError:
            try:
                existing_user = auth.get_user_by_email(email)
                print("Konto z takim emailem jest już zarejestrowane")
                return None
            except exceptions.NotFoundError:
                print("Użytkownik nie istnieje w bazie danych - tworzenie nowego użytkownika")
                uid = create_user_with_google(email, uid)
                return custom_token
            



def get_id_token(access_token):
    response = auth.verify_id_token(access_token)
    return response["uid"]

@staticmethod
def get_token_info(access_token):
    tokeninfo_url = 'https://oauth2.googleapis.com/tokeninfo'
    params = {
        'access_token': access_token
    }

    response = requests.get(tokeninfo_url, params=params)

    if response.status_code == 200:
        token_info = response.json()
        return token_info
    else:
        print('Błąd podczas pobierania token_info')
        return None

def get_user_info(id_token):
    response = auth.get_user(id_token)
    return response


def create_user_with_google(email, uid):
    user = auth.create_user(email=email, uid=uid, email_verified=True)
    provider = auth.ProviderIdentifier(provider_id='google.com', provider_uid=uid)
    user.provider_data.append(provider)
    return user.uid


def exchange_code(code):
    token_url = 'https://oauth2.googleapis.com/token'
    redirect_uri = 'http://localhost:4200/login-google'
    data = {
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    response = requests.post(token_url, data=data)

    if response.status_code == 200:
        exchanged_code = response.json()
        return exchanged_code
    else:
        print('Błąd podczas wymiany kodu')
        return None

def get_user_profile(access_token):
    userinfo_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
    headers = {'Authorization': f'Bearer {access_token}'}

    response = requests.get(userinfo_url, headers=headers)

    if response.status_code == 200:
        user_info = response.json()
        return user_info
    else:
        print('Błąd podczas pobierania informacji o użytkowniku')
        return None