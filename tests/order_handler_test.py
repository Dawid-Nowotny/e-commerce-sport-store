import json
import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.order_hanler import add_order, get_order_user_list
from backend.app import redis_client

class TestAddOrder(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(add_order)
        self.app.register_blueprint(get_order_user_list)
        self.app.redis_client = redis_client
        self.client = self.app.test_client()

    def test_create_order_success(self):
        # Dane testowe
        user_id = 'ClRjyx0YoEgM2m2U53VEIQVB4hp1'
        delivery_id = '-NXoiih-RDm6VQ-aIRih'
        existing_data = [
            {
                'product': '-NXGWPVXvXvVcxnJNtD_',
                'size': '42',
                'amount': 1
            }
        ]

        # Dodawanie danych do Redis
        self.app.redis_client.set(user_id, json.dumps(existing_data))

        # Tworzenie zamówienia
        data = {
            'user_id': user_id,
            'delivery_id': delivery_id
        }
        response = self.client.post('/api/add-order', json=data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('order_id', data)

    def test_create_order_failure(self):
        # Dane testowe bez user_id
        user_id = None
        delivery_id = 'delivery_id'

        data = {
            'user_id': user_id,
            'delivery_id': delivery_id
        }
        response = self.client.post('/api/add-order', json=data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Nie podano identyfikatora użytkownika')

class TestGetOrderUserList(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(get_order_user_list)
        self.client = self.app.test_client()

    def test_get_orders_success(self):
        # Dane testowe bez user_id
        user_id = 'ClRjyx0YoEgM2m2U53VEIQVB4hp1'

        # Pobieranie listy zamówień użytkownika
        response = self.client.get(f'/api/get-orders?user_id={user_id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('orders', data)
        self.assertIsInstance(data['orders'], list)

    def test_get_orders_failure(self):
        # Dane testowe
        user_id = None

        response = self.client.get(f'/api/get-orders?user_id={user_id}')

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Brak identyfikatora użytkownika')


if __name__ == '__main__':
    unittest.main()
