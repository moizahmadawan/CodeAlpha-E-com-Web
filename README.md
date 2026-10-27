# CodeAlpha Task 1 — Simple E-commerce Store

A responsive demo storefront built to meet the CodeAlpha Full Stack Development Task 1 brief. Frontend: HTML, CSS, vanilla JavaScript. Backend: Node.js + Express. Database: MongoDB with Mongoose.

## Features

- Product listing, category filtering, search, and product details in the catalogue cards
- Shopping cart with quantity controls and subtotal (cart persists in browser local storage)
- User registration and login using bcrypt password hashing and JWT sessions
- Order checkout and server-side order creation
- MongoDB collections/models for products, users, and orders
- Server checks product stock and calculates prices from database records, rather than trusting client prices
- Responsive layout for desktop and mobile
- Seed products are automatically added when the database is empty

## Requirements

- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- npm

## Run on Windows / VS Code PowerShell

1. Extract the project and open the `CodeAlpha_Ecommerce` folder in VS Code.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create your local environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Open `.env` and set `MONGODB_URI` and `JWT_SECRET`. For local MongoDB, the example URI is ready to use if MongoDB is running. Replace the JWT secret with a long random value. Never upload `.env` to GitHub.
5. Start the application:

   ```powershell
   npm start
   ```

6. Visit <http://localhost:5000>.

### Development mode

```powershell
npm run dev
```

## Environment variables

| Variable | Purpose |
|---|---|
| `PORT` | Server port; defaults to `5000` |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign login tokens; set a private, long random value |

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API status |
| GET | `/api/products` | List products; optional `?category=Fashion` and `?search=bag` |
| GET | `/api/products/:id` | Get one product by MongoDB ID |
| POST | `/api/auth/register` | Register `{ "name", "email", "password" }` |
| POST | `/api/auth/login` | Sign in with `{ "email", "password" }` |
| POST | `/api/orders` | Create an order; requires `Authorization: Bearer <token>` |
| GET | `/api/orders/mine` | List signed-in user's orders |

Order request example:

```json
{
  "shipping": {
    "fullName": "Alex Morgan",
    "email": "alex@example.com",
    "address": "12 Example Street",
    "city": "Lahore",
    "phone": "+92 300 0000000"
  },
  "items": [{ "productId": "MONGODB_PRODUCT_ID", "quantity": 2 }]
}
```

## Test checklist

- [ ] Start MongoDB and confirm the terminal prints `MongoDB connected`.
- [ ] Open the homepage and confirm the sample products appear.
- [ ] Search for a product and filter by category.
- [ ] Add products to the bag; update quantity and remove an item.
- [ ] Register a new account, then sign out and sign back in.
- [ ] Add an item, proceed to checkout, complete shipping details, and place a test order.
- [ ] Confirm the order appears in MongoDB's `orders` collection.
- [ ] Test the layout at mobile and desktop widths.

## Notes and limitations

- This is an internship/demo project, not a production commerce platform.
- Checkout records an order but does **not** charge a payment method. Do not enter real payment information.
- Product images are loaded from Unsplash and therefore require internet access; replace image URLs with locally hosted assets if preferred.
- Newsletter signup is a visual frontend demonstration and does not store email addresses.
- For reliable multi-document transactions, use a MongoDB replica set (MongoDB Atlas provides this). If a local standalone MongoDB server rejects transactions, configure a local replica set or adapt the order flow for your development environment.
- Before production use, add rate limiting, email verification, CSRF/security headers, a proper payment provider, order cancellation/refund rules, logging, tests, and deployment secrets management.

## Suggested repository name

`CodeAlpha_SimpleEcommerceStore`

## GitHub upload (PowerShell)

Create an empty GitHub repository named `CodeAlpha_SimpleEcommerceStore`, then run these commands from this folder:

```powershell
git init
git add .
git commit -m "Build CodeAlpha Task 1 e-commerce store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/CodeAlpha_SimpleEcommerceStore.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Keep `.env` untracked and never commit secrets.
