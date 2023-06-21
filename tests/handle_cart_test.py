import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.handle_cart import add_to_cart, get_cart, delete_from_cart, increase_product_amount

class TestCart(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(add_to_cart)
        self.app.register_blueprint(get_cart)
        self.app.register_blueprint(delete_from_cart)
        self.app.register_blueprint(increase_product_amount)
        self.client = self.app.test_client()

    def test_handle_add_to_cart_success(self):
        # Dane testowe
        submitted_data = {
            'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1',
            'productId': '-NYNkYXIgZK35YFH0SCr',
            'size': '41'
        }

        response = self.client.post('/api/add-to-cart', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Produkt został dodany do koszyka')

    def test_handle_add_to_cart_failure(self):
        # Dane testowe z nieistniejącym użytkownikiem
        submitted_data = {
            'userId': '123',
            'productId': '-NYNkYXIgZK35YFH0SCr',
            'size': '41'
        }

        response = self.client.post('/api/add-to-cart', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Użytkownik o podanym identyfikatorze nie istnieje')

    def test_handle_get_cart_success(self):
        # Dane testowe
        user_id = 'PDDNzEvcrCSKMqYgDEFbPBBnnpU2'

        response = self.client.get(f'/api/get-cart?userId={user_id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('cart', data)
        self.assertIsInstance(data['cart'], list)
        self.assertIn('total_price', data)

    def test_handle_get_cart_failure(self):
        # # Dane testowe bez z nieistniejacym użytkownikiem
        user_id = '123'

        response = self.client.get(f'/api/get-cart?userId={user_id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Użytkownik o podanym identyfikatorze nie istnieje')
        

    def test_handle_delete_from_cart_success(self):
        # Dane testowe
        submitted_data = {
            'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1',
            'productId': '-NXGWPVXvXvVcxnJNtD_',
            'size': '36'
        }

        response = self.client.delete('/api/delete-from-cart', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Produkt został usunięty z koszyka')

    def test_handle_delete_from_cart_failure(self):
        # Dane testowe bez z nieistniejacym użytkownikiem
        submitted_data = {
            'userId': '123',
            'productId': '-NXGWPVXvXvVcxnJNtD_',
            'size': '36'
        }

        response = self.client.delete('/api/delete-from-cart', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Użytkownik o podanym identyfikatorze nie istnieje')

    def test_handle_increase_product_amount_success(self):
        # Dane testowe
        submitted_data = {
            'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1',
            'productId': '-NXGWPVXvXvVcxnJNtD_',
            'size': '36',
            'amount': 2
        }

        response = self.client.put('/api/set-product-amount', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Ilość produktu została zaktualizowana')

    def test_handle_increase_product_amount_failure(self):
        # Dane testowe bez z nieistniejacym użytkownikiem
        submitted_data = {
            'userId': '123',
            'productId': '-NXGWPVXvXvVcxnJNtD_',
            'size': '36',
            'amount': 2
        }

        response = self.client.put('/api/set-product-amount', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Użytkownik o podanym identyfikatorze nie istnieje')

if __name__ == '__main__':
    unittest.main()
