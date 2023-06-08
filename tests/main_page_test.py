import unittest
from flask import Flask
from backend.application.controllers.main_page import main_page_products

class TestMainPageProducts(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(main_page_products)
        self.client = self.app.test_client()

    def test_get_products_success(self):
        # Prawidłowe dane
        submitted_data = {'pageIndex': 1, 'pageSize': 10}

        response = self.client.post('/api/products', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertIn('totalItems', data)
        self.assertNotEqual(data['items'], [])


    def test_get_products_failure(self):
        # Numer strony za duży żeby zwróciło pustą liste produktów
        submitted_data = {'pageIndex': 999, 'pageSize': 10}

        response = self.client.post('/api/products', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertIn('totalItems', data)
        self.assertEqual(data['items'], [])

if __name__ == '__main__':
    unittest.main()