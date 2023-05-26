from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
from application.controllers.login import login_page
from application.controllers.register import register_page

app.register_blueprint(login_page)
app.register_blueprint(register_page)

if __name__ == '__main__':
    app.run(debug=False, port=5000, host='0.0.0.0')