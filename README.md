# ProHouse: Real Estate Rental Platform

## Project Overview

ProHouse is a modern real estate rental platform designed to simplify property transactions for owners and tenants. It aims to integrate cryptocurrency payments, offering a secure and scalable solution for the rental market. This platform leverages Web3 technologies to provide a decentralized and transparent experience.

## Features

- **Multi-currency Crypto Payment System:** Securely pay rent or make deposits using various cryptocurrencies.
- **Property Listings:** Browse and discover a wide range of rental properties.
- **Dynamic Filtering:** Filter properties by various categories.
- **Developer Showcase:** View information about real estate developers.
- **User Authentication:** Secure user registration, login, and profile management.
- **Shopping Cart:** Add and manage properties in a virtual cart.
- **Order Management:** Track and manage rental orders.
- **Admin Panel:** Tools for administrators to manage products, users, and orders.

## Technologies Used

### Frontend
- React.js
- Bootstrap (for styling)
- Swiper (for carousels)
- Framer Motion (for animations)

### Backend
- Node.js (Express.js)
- MongoDB (via Mongoose)
- Cloudinary (for image storage)
- JSON Web Tokens (JWT) (for authentication)
- Paytm (for payment processing - placeholder for now)
- SendGrid (for email services - placeholder for now)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB instance (local or cloud-based)
- Cloudinary account (for image uploads)
- Paytm Merchant account (for payment gateway - optional, mock payments available)
- SendGrid account (for email services - optional)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ProHouse.git
    cd ProHouse
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `server/` directory and add the following environment variables. You can use `server/config/config.env.example` as a template.

    ```
    PORT=4001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRE=5d
    COOKIE_EXPIRE=5
    CLOUDINARY_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    PAYTM_MID=your_paytm_merchant_id
    PAYTM_MERCHANT_KEY=your_paytm_merchant_key
    PAYTM_WEBSITE=WEBSTAGING
    PAYTM_CHANNEL_ID=WEB
    PAYTM_INDUSTRY_TYPE=Retail
    PAYTM_CUST_ID=your_paytm_customer_id
    SENDGRID_API_KEY=your_sendgrid_api_key
    SENDGRID_ORDER_TEMPLATEID=your_sendgrid_order_template_id
    SENDGRID_RESET_TEMPLATEID=your_sendgrid_reset_template_id
    ALLOW_GUEST_CHECKOUT=true # Set to false to disable guest checkout
    SKIP_CLOUDINARY_UPLOADS=false # Set to true to skip Cloudinary uploads in development
    MOCK_PAYMENTS=true # Set to true to enable mock payments in development
    ```

### Running the Application

To run both the frontend and backend concurrently:

```bash
npm start
```

-   The frontend will run on `http://localhost:3000`.
-   The backend API will run on `http://localhost:4001`.

Alternatively, you can run them separately:

**Run Backend Only:**
```bash
npm run start:backend
```

**Run Frontend Only:**
```bash
npm run start:frontend
```

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### User Management
-   `POST /api/v1/register`: Register a new user.
-   `POST /api/v1/login`: Log in a user.
-   `GET /api/v1/logout`: Log out the current user.
-   `GET /api/v1/me`: Get details of the logged-in user.
-   `PUT /api/v1/password/update`: Update user password.
-   `PUT /api/v1/me/update`: Update user profile.
-   `POST /api/v1/password/forgot`: Request a password reset.
-   `PUT /api/v1/password/reset/:token`: Reset password using token.

### Product Management
-   `GET /api/v1/products`: Get all products (with search, filter, pagination).
-   `GET /api/v1/products/all`: Get all products (for sliders, etc.).
-   `GET /api/v1/products/categories`: Get all product categories.
-   `GET /api/v1/product/:id`: Get details of a single product.
-   `PUT /api/v1/review`: Create or update a product review.

### Admin - Product Management
-   `GET /api/v1/admin/products`: Get all products (admin only).
-   `POST /api/v1/admin/product/new`: Create a new product (admin only).
-   `PUT /api/v1/admin/product/:id`: Update a product (admin only).
-   `DELETE /api/v1/admin/product/:id`: Delete a product (admin only).
-   `GET /api/v1/admin/reviews`: Get all reviews for a product (admin only).
-   `DELETE /api/v1/admin/reviews`: Delete a product review (admin only).

### Order Management
-   `POST /api/v1/order/new`: Create a new order.
-   `GET /api/v1/order/:id`: Get details of a single order.
-   `GET /api/v1/orders/me`: Get orders of the logged-in user.

### Admin - Order Management
-   `GET /api/v1/admin/orders`: Get all orders (admin only).
-   `PUT /api/v1/admin/order/:id`: Update order status (admin only).
-   `DELETE /api/v1/admin/order/:id`: Delete an order (admin only).

### Payment
-   `POST /api/v1/payment/process`: Process a payment.
-   `POST /api/v1/callback`: Paytm callback URL.
-   `GET /api/v1/payment/status/:id`: Get payment status.

### Cart
-   `GET /api/v1/cart`: Get all items in the user's cart.
-   `POST /api/v1/cart/new`: Add an item to the cart.
-   `DELETE /api/v1/cart/:id`: Remove an item from the cart.

### Developers
-   `GET /api/v1/developers`: Get all developers.

### Admin - Developers
-   `POST /api/v1/admin/developer/new`: Create a new developer (admin only).
-   `GET /api/v1/admin/developer/:id`: Get details of a single developer (admin only).
-   `PUT /api/v1/admin/developer/:id`: Update a developer (admin only).
-   `DELETE /api/v1/admin/developer/:id`: Delete a developer (admin only).

### Static Pages
-   `GET /api/v1/aboutus`: About Us page content.
-   `GET /api/v1/partners`: Partners page content.
-   `GET /api/v1/properties`: Properties page content.
-   `GET /api/v1/join`: Join page content.