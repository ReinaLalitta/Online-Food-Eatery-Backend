# 🍽️ Online-Food-Store-Eatery Backend

This repository contains the backend services for the **Online-Food-Store-Eatery** web application. The backend is responsible for handling user authentication, managing orders, interacting with the database, and providing APIs for the frontend.

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [API Endpoints](#api-endpoints)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## 📖 Project Overview

The **Online-Food-Store-Eatery Backend** serves as the backbone for the web application. It is built using Node.js and Express.js to manage the communication between the frontend and the database, ensuring that users can create accounts, place orders, and manage their shopping carts.

This backend handles:
- User authentication (login/signup)
- Food menu management
- Order management and status tracking
- Interaction with the database for user and order data

## 🛠️ Technologies Used

- [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)](https://nodejs.org/) - For building the server-side of the application.
- [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) - For creating RESTful APIs.
- [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/) - For storing user and order data.
- [![JWT](https://img.shields.io/badge/JSON_Web_Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/) - For handling secure user authentication.
- [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/) - For real-time data handling and authentication.
- [![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://www.heroku.com/) - For cloud deployment and hosting.

## 📝 API Endpoints

### Authentication
- `POST /api/signup` - Create a new user account
- `POST /api/login` - Log in a user and issue JWT

### Menu
- `GET /api/menu` - Get the list of available food items
- `POST /api/menu` - Add new food items (admin only)
- `PUT /api/menu/:id` - Update a food item (admin only)
- `DELETE /api/menu/:id` - Remove a food item (admin only)

### Orders
- `POST /api/orders` - Place a new order
- `GET /api/orders/:userId` - Retrieve all orders for a user
- `GET /api/orders` - Retrieve all orders (admin only)

### Cart
- `POST /api/cart` - Add an item to the cart
- `GET /api/cart/:userId` - Get the cart for a user
- `DELETE /api/cart/:userId/:itemId` - Remove an item from the cart

## ⚙️ Installation

To get the backend running locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourusername/online-food-store-eatery-backend

# Navigate into the backend directory
cd online-food-store-eatery-backend

# Install the necessary dependencies
npm install
🌍 Environment Variables
Create a .env file in the root directory of your project and add the following variables:

bash
Copy code
PORT=5000
DATABASE_URL=mysql://user:password@localhost:3306/online_food_store
JWT_SECRET=your_jwt_secret_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
Make sure to replace the placeholders with actual values.

🚀 Usage
To start the backend server, run the following command:

bash
Copy code
# Start the backend server
npm start
The server will be accessible at http://localhost:5000.

🤝 Contributing
If you'd like to contribute, please follow these steps:

Fork this repository.
Create a feature branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add feature').
Push to the branch (git push origin feature-branch).
Open a Pull Request.
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
For any inquiries or feedback, please reach out to me at lalittaruby@gmail.com.

Made with ❤️ by Purity Elna Lutta