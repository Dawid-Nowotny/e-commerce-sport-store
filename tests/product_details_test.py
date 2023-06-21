import unittest
from flask import Flask
from backend.application.controllers.product_detail import product_details


class TestProductDetails(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(product_details)
        self.client = self.app.test_client()

    def test_get_product_detail_success(self):
        # Prawidłowe dane
        productId = '-NY-nJ5wBX8qBsIwGZJo'
    
        response = self.client.get(f'/api/product-details?productId={productId}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('items', data)
        self.assertNotIn('error', data)


    def test_get_product_detail_failure(self):
        # Produkt z nieistniejącym id
        productId = 'nieistniejacy'

        response = self.client.get(f'/api/product-details?productId={productId}')
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Produktu nie odnaleziono')

if __name__ == '__main__':
    unittest.main()
