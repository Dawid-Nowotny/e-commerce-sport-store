import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.category_brand_lists import get_brand_and_category_lists

class TestProductDetails(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(get_brand_and_category_lists)
        self.client = self.app.test_client()

    def test_get_lists_success(self):
        response = self.client.get('/api/get-lists')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('categories', data)
        self.assertIn('brands', data)
        self.assertIsInstance(data['categories'], list)
        self.assertIsInstance(data['brands'], list)

if __name__ == '__main__':
    unittest.main()
