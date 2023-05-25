import hashlib
import secrets

def hash_password(password):
    salt = secrets.token_hex(16)
    hashed_password = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode(),
        salt.encode(),
        100000
    ).hex()
    return hashed_password, salt

def verify_password(password, hashed_password, salt):
    new_hashed_password = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode(),
        salt.encode(),
        100000
    ).hex()
    return new_hashed_password == hashed_password