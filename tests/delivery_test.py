import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.delivery import add_delivery_details


class TestDeliveryDetails(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(add_delivery_details)
        self.client = self.app.test_client()

    def test_set_address_success(self):
        # Prawidłowe dane testowe
        submitted_data = {
            'firstname': '1231',
            'lastname': '212',
            'country': '13',
            'city': '123',
            'street': '13',
            'houseNumber': '123',
            'postcode': '323',
            'phoneNumber': '23',
            'user_id': 'PDDNzEvcrCSKMqYgDEFbPBBnnpU2'
        }
    
        response = self.client.post('/api/delivery-data', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Dodano adres pomyślnie')
        self.assertIn('delivery_id', data)
        self.assertIsInstance(data['delivery_id'], str)


if __name__ == '__main__':
    unittest.main()
