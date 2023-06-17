import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.main_page import main_page_products, main_page_products_filtered

class TestProducts(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(main_page_products)
        self.app.register_blueprint(main_page_products_filtered)
        self.client = self.app.test_client()

    def test_get_products_success(self):
        # Dane testowe
        pageIndex = 0
        pageSize = 10

        response = self.client.get(f'/api/products?pageIndex={pageIndex}&pageSize={pageSize}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertIsInstance(data['items'], list)
        self.assertIn('totalItems', data)

    def test_get_products_filtered_success(self):
        # Dane testowe
        pageIndex = 1
        pageSize = 15
        price_order = 'asc'
        category_id = '-NXG8RXJvHD7XbWsLnT6'
        minPrice = '10'
        maxPrice = '50'

        response = self.client.get(f'/api/filtered-products?pageIndex={pageIndex}&pageSize={pageSize}&priceOrder={price_order}&category={category_id}&minPrice={minPrice}&maxPrice={maxPrice}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertIsInstance(data['items'], list)
        self.assertIn('totalItems', data)

if __name__ == '__main__':
    unittest.main()
