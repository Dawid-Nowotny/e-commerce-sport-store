import unittest
from flask import Flask
from flask.testing import FlaskClient
from backend.application.controllers.payment import payment

class TestPayment(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(payment)
        self.client = self.app.test_client()

    def test_process_payment(self):
        # Dane testowe
        order_id = '-NY9T18k7zVoCjXoEoXz'

        # Tworzenie żądania POST dla obsługi płatności
        response = self.client.post('/api/payment', json={'order_id': order_id})

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('url', data)
        self.assertIn('code', data)


if __name__ == '__main__':
    unittest.main()
