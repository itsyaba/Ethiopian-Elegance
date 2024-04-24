# Ethiopian Elegance E-commerce Site

## Description

This is the README file for the Ethiopian Elegance ecommerce website. Ethiopian Elegance sells traditional Ethiopian clothing, jewelry, and home goods.

## Features

- Browse products by category
- View product details including photos, descriptions, colors
- Add products to a shopping cart
- Create an account to save cart and order history
- Checkout with shopping cart
- Make payments through Stripe integration
- View order history and status
- Admin portal to manage products, orders, and site content

## Tech Stack

- React
- Node.js
- MongoDB
- Express JS
- Stripe API
- Mantine UI
- Tabler Icon
- On render for hosting

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running

### Installation

1. Clone the repo

   git clone https://github.com/itsyaba/Ethiopian-Elegance.git

2. Install dependencies

   npm install

3. Configure environment variables in .env file
   
   - MONGO_URI=your_mongo_uri
   - STRIPE_SECRET_KEY=your_stripe_secret_key
   - NODE_ENV = development
   - PORT = 5000
   - JWT_SECRET = your_secret
   - JWT_EXPIRES_IN = 90d
   - PAYPAL_CLIENT_ID = your_paypal_client_id
   - PAGINATION_LIMIT=10

4. Start the app

   npm run dev

The app will now be running at http://localhost:5173

## Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes.
