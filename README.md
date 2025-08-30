# TFAWE E-Commerce Application

A full-stack e-commerce application built with React and Node.js, featuring user authentication, product management, shopping cart, order processing, and an admin panel.

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs for password hashing
- **File Upload**: Multer for image uploads
- **CORS**: Enabled for cross-origin requests
- **Environment Management**: dotenv
- **Testing**: Jest with Supertest

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Forms**: @formspree/react
- **Calendar Integration**: React Calendly
- **Linting**: ESLint
- **PostCSS**: Autoprefixer and PostCSS

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn
- MongoDB (local installation or cloud service like MongoDB Atlas)
- Git

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kenkeputa-project
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tfawe
JWT_SECRET=your_jwt_secret_here
```

- `PORT`: The port on which the backend server will run (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### 3. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory based on `.env.example` (if needed for production):

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional)

To populate the database with sample products:

```bash
cd ../backend
npm run seed
```

## Running the Application

### Development Mode

1. Start the backend server:

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

2. Start the frontend development server:

```bash
cd ../client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Build

1. Build the frontend:

```bash
cd client
npm run build
```

2. Start the backend in production:

```bash
cd ../backend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin only)
- `POST /api/products/upload` - Upload product image (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user's cart (Authenticated)
- `POST /api/cart/add` - Add item to cart (Authenticated)
- `POST /api/cart/remove` - Remove item from cart (Authenticated)
- `POST /api/cart/clear` - Clear cart (Authenticated)

### Orders
- `POST /api/orders` - Create new order (Authenticated)
- `GET /api/orders` - Get user's orders (Authenticated)
- `GET /api/orders/:id` - Get order by ID (Authenticated)
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Admin
- `GET /api/admin/orders` - Get all orders (Admin)
- `PUT /api/admin/orders/:id/status` - Update order status (Admin)
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/products` - Get all products (Admin)
- `POST /api/admin/products` - Create product (Admin)
- `PUT /api/admin/products/:id` - Update product (Admin)
- `DELETE /api/admin/products/:id` - Delete product (Admin)

### File Serving
- `GET /uploads/:filename` - Serve uploaded images

## Example API Requests

### User Registration
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Get Products
```bash
curl -X GET http://localhost:5000/api/products
```

### Add to Cart (requires authentication)
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"productId":"product_id_here","quantity":1}'
```

## Testing

Run backend tests:

```bash
cd backend
npm test
```

## Known Limitations

- **Payment Integration**: The application includes payment gateway logos (Stripe and Razorpay) but does not have actual payment processing implemented.
- **Real-time Features**: No real-time notifications or updates (e.g., WebSocket integration).
- **Database**: Assumes MongoDB is running locally or configured via environment variables.
- **Security**: Basic authentication; consider additional security measures for production.
- **Scalability**: Not optimized for high-traffic scenarios.
- **Error Handling**: Basic error handling; may need enhancement for edge cases.
- **File Upload**: Limited to image uploads; no validation for file types beyond basic checks.
- **Admin Panel**: Basic admin functionality; may require additional features for comprehensive management.

## Project Structure

```
kenkeputa-project/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── tests/
│   ├── public/uploads/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.