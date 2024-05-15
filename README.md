# E-Commerce Platform
This project is an e-commerce platform developed using Flask, Angular, and Firebase. It enables users to browse and purchase a variety of sports-related products. The platform offers essential features such as user registration, product catalog, shopping cart functionality, checkout process, order history, and administrator panel for store management. Secure online transactions are facilitated through the integration of the Stripe payment system.

## Screenshots
| Main page | Product detail | Cart |
| -------|--------------|-----------------|
| <img src="https://github.com/ayaseshi/e-commerce-sport-store/assets/93731073/840bccd0-24a7-490e-b24a-e859a0bd0e77" width="400">  | <img src="https://github.com/ayaseshi/e-commerce-sport-store/assets/93731073/d680b232-93af-43e2-94fe-cf3af343b62a)" width="400"> | <img src="https://github.com/ayaseshi/e-commerce-sport-store/assets/93731073/74c2e2bf-05c7-44ea-93f1-a31686307679" width="400"> |

| Payment successful | Order history | Admin panel |
| ---------------|------------------|-----------------|
| <img src="https://github.com/ayaseshi/e-commerce-sport-store/assets/93731073/d545fb1b-fcdf-4391-8000-92cecc2d5883" width="400"> | <img src="https://github.com/ayaseshi/e-commerce-sport-store/assets/93731073/d340f947-2a8b-4b6c-bbe6-52629edea75e" width="400"> | <img src="https://github.com/ayaseshi/e-commerce-sport-store/assets/93731073/f40d0c6d-f6fd-405c-b54e-1bb6f4b39124" width="400"> |

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites
- Python 3.8 or later
- Pip
- Node.js + npm: ^14.20.0 || ^16.13.0 || ^18.10.0
- Angular CLI: Angular version 15.2.x
- Google Account with Firebase Access: You'll need a Google account with access to Firebase to configure the backend. Obtain the Firebase configuration files and keys.
- Stripe Account: Obtain a Stripe account and API keys for payment processing.

### Installing
Clone the repository:
```bash
git clone https://github.com/Dawid-Nowotny/e-commerce-sport-store.git
```
    
#### Backend
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
    
2. Open the files located in the `backend/config` directory and fill in the necessary access keys.
   
3. (Optional) Create a virtual environment (recommended):
    ```bash
    # Windows
    python -m venv venv

    # Linux/macOS
    python3 -m venv venv
    ```

    Activate the virtual environment
    ```bash
    # Windows
    venv\Scripts\activate
    
    # Linux/macOS
    source venv/bin/activate
    ```

4. Install the required dependencies using pip:
    ```bash
    pip install -r requirements.txt
    ```

5. Run the application:
   ```bash
   python run.py
   ```

#### Frontend
1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the Angular application:
    ```bash
    ng serve
    ```
   
## Functionality

- Create an account 
- Log in
    - via email & password
    - via google account
- Log out
- Product Catalog
- Product Search
- Product Filtering
- Shopping Cart
- Checkout Process
- Order History
- Administrator Panel
- Store Management
- Integrated Payment System via Stripe
