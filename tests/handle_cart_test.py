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

    def test_handle_add_success(self):
        # Prawidłowe dane testowe
        submitted_data = {'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1', 'productId': '-NXGWNfiHvUbR8-VohQu', 'size': 'M'}
    
        response = self.client.post('/api/add-to-cart', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Produkt został dodany do koszyka')

    def test_handle_add_user_not_exist(self):
        # Użytkownik nie istnieje
        submitted_data = {'userId': 'wrongId', 'productId': '456', 'size': 'M'}

        response = self.client.post('/api/add-to-cart', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Użytkownik o podanym identyfikatorze nie istnieje')

    def test_handle_get_success(self):
        # Prawidłowe dane testowe
        query_params = {'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1'}
    
        response = self.client.get('/api/get-cart', query_string=query_params)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('cart', data)
        self.assertIn('total_price', data)

    def test_handle_get_user_not_exist(self):
        # Użytkownik nie istnieje
        query_params = {'userId': 'wrongId'}

        response = self.client.get('/api/get-cart', query_string=query_params)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Użytkownik o podanym identyfikatorze nie istnieje')

    def test_handle_delete_success(self):
        # Prawidłowe dane testowe
        submitted_data = {'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1', 'productId': '-XGWNfiHvUbR8-VohQu', 'size': 'M'}

        response = self.client.delete('/api/delete-from-cart', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Produkt został usunięty z koszyka')

    """
    def test_handle_delete_empty_cart(self):
        # Pusty koszyk
        submitted_data = {'userId': '123', 'productId': '456', 'size': 'M'}

        response = self.client.delete('/api/delete-from-cart', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Koszyk jest pusty')
    """
    def test_handle_increase_success(self):
        # Prawidłowe dane testowe
        submitted_data = {'userId': 'ClRjyx0YoEgM2m2U53VEIQVB4hp1', 'productId': '-NXGWNfiHvUbR8-VohQu', 'size': 'M', 'amount': 5}

        response = self.client.put('/api/set-product-amount', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Ilość produktu została zaktualizowana')

    """
    def test_handle_increase_empty_cart(self):
        # Pusty koszyk
        submitted_data = {'userId': '123', 'productId': '456', 'size': 'M', 'amount': 5}

        response = self.client.put('/api/set-product-amount', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Koszyk jest pusty')
    """

if __name__ == '__main__':
    unittest.main()
