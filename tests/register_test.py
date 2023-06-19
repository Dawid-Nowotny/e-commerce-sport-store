import unittest
from flask import Flask
from backend.application.controllers.register import register_page


class TestRegisterPage(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(register_page)
        self.client = self.app.test_client()

    def test_register_confirm_success(self):
        # Prawidłowe dane
        submitted_data = {'username': 'vorixal1@rockdian.com', 'password': '123123'}
    
        response = self.client.post('/api/register', json=submitted_data)

        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])
        self.assertIn('user_id', data)

    def test_register_confirm_existing_user(self):
        # Istniejący użytkownik
        submitted_data = {'username': 'sklepsportowy3@o2.pl', 'password': '123456'}

        response = self.client.post('/api/register', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Konto z takim emailem jest już zarejestrowane')

    def test_register_confirm_invalid_email(self):
        # Nieprawidłowy adres email
        submitted_data = {'username': 'invalidemail', 'password': 'password'}

        response = self.client.post('/api/register', json=submitted_data)
    
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertFalse(data['success'])
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Nieprawidłowy adres e-mail.')


if __name__ == '__main__':
    unittest.main()
