import unittest
from flask import Flask
from backend.application.controllers.login import login_page


class TestLoginPage(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(login_page)
        self.client = self.app.test_client()

    def test_confirm_login_success(self):
        # Prawidłowe dane testowe
        submitted_data = {'username': 'sklepsportowy3@o2.pl', 'password': '123456'}
    
        response = self.client.post('/api/login', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('user_id', data)

    def test_confirm_login_failure(self):
        # Nieprawidłowe dane testowe
        submitted_data = {'username': 'wrongemail@wp.pl', 'password': 'wrongpassword'}

        response = self.client.post('/api/login', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Błąd logowania')

if __name__ == '__main__':
    unittest.main()
