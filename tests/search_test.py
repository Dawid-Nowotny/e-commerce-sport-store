import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.search import search

class TestSearch(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(search)
        self.client = self.app.test_client()

    def test_get_search_results_success(self):
        # Dane testowe
        product_name = 'Korki'

        response = self.client.get(f'/api/search?name={product_name}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertIsInstance(data['items'], list)
        self.assertNotEqual(len(data['items']), 0)

    def test_get_search_results_failure(self):
        # Dane testowe dla nieistniejącej nazwy
        product_name = 'nonexisting'

        response = self.client.get(f'/api/search?name={product_name}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertIsInstance(data['items'], list)
        self.assertEqual(len(data['items']), 0)

if __name__ == '__main__':
    unittest.main()
