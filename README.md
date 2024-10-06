# Webshop eCommerce Platform

A full-featured eCommerce shop built using the MERN stack and Redux Toolkit.

## Features

- Full-featured shopping cart with quantity management
- Product reviews and ratings
- Top products carousel
- Product pagination and search
- User profile with order history
- Admin product, user, and order management
- Mark orders as delivered
- Checkout process (shipping, payment method, etc.)
- PayPal/credit card integration
- Custom database seeder script

## Technologies Used

- **Front End**: React with functional components & hooks, Redux Toolkit, React-Bootstrap, React Router
- **Back End**: Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Integration**: PayPal API
- **Deployment**: Render, Netlify, or similar

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/webshop.git
   cd webshop
   ```

2. **Install dependencies for both backend and frontend:**

   ```bash
   npm install
   cd frontend
   npm install
   ```

3. **Create a `.env` file in the root with the following:**

   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PAYPAL_CLIENT_ID=your-paypal-client-id
   ```

4. **Run the server and client:**

   ```bash
   # Run backend and frontend simultaneously
   npm run dev
   ```

## Live Demo

[View the deployed project](https://webshop-swd1.onrender.com/)

## License

This project is licensed under the MIT License.

---

**Note**: Feel free to customize the `.env` variables and update the deployment link accordingly.
