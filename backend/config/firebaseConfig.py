import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    cred = credentials.Certificate('Sklep-sportowy\\backend\\config\\sklep-sportowy-7c265-firebase-adminsdk-8iec3-2fabe67376.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'sklep-sportowy-7c265.appspot.com',
        'databaseURL': 'https://sklep-sportowy-7c265-default-rtdb.europe-west1.firebasedatabase.app/'
    })