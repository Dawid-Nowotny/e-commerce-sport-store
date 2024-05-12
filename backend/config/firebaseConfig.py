import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    cred = credentials.Certificate('config\\sklep-sportowy.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': '',
        'databaseURL': ''
    })