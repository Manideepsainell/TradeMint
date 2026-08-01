# TradeMint 🚀

TradeMint is a full-stack MERN trading simulation app where users can buy/sell stocks and track their portfolio.

I built this project to understand how backend systems handle order execution, authentication, and API-based data fetching.

> Originally started as [Stock-Trading-Platform](https://github.com/Manideepsainell/Stock-Trading-Platform) — a first attempt at learning the MERN stack. 
> After a few months away from it, I came back and rebuilt the backend from scratch: proper validation, centralized error handling, caching, and a controller-service architecture instead of logic scattered across route handlers.
---

## ✨ Features

- User authentication (JWT with HTTP-only cookies)
- Buy/Sell stock simulation
- Portfolio tracking (holdings, orders)
- Profit/Loss calculation
- External API integration for stock prices
- In-memory caching to reduce repeated API calls

---

## 🔄 How Order Execution Works

When a user places a buy order:

1. Frontend sends stock symbol and quantity to backend
2. Backend verifies user using JWT from HTTP-only cookie
3. Fetches current stock price from external API
4. Checks if user has enough balance
5. If valid:
   - Deducts balance
   - Updates holdings
   - Stores order in database
6. Sends updated data back to frontend

---

## ⚡ Caching (Performance Optimization)

While testing, I noticed that every request was hitting the stock price API repeatedly.

To fix this:

- I created a simple in-memory cache using a JavaScript object
- Stored stock symbol as key and price with timestamp as value
- Before calling API, I check if cached data is within 30 seconds
- If yes → return cached value  
- If no → fetch new data and update cache  

This reduced unnecessary API calls and improved response time.

---

## 🔐 Authentication

- On login, backend generates a JWT
- Token is stored in an HTTP-only cookie
- Middleware verifies token for protected routes
- Extracted userId is used for user-specific data (orders, holdings)

---

## 🧠 Backend Structure

The backend is organized as:

Routes → Controllers → Services → Models

- Routes handle API endpoints  
- Controllers handle request/response  
- Services contain business logic (order execution, portfolio updates)  
- Models define MongoDB schemas  

---

## 🛠 Tech Stack

### Frontend
- React.js
- Bootstrap

### Backend
- Node.js
- Express.js
- JWT (HTTP-only cookies)
- Zod (validation)
- In-memory caching

### Database
- MongoDB (Mongoose)

### Tools
- Git & GitHub
- Postman
- Vercel (frontend)
- Render (backend)

---

## 📂 Project Structure

```
TradeMint/
│
├── backend/     # Node.js + Express API
└── dashboard/   # React frontend
```

---

## ⚙️ Setup Instructions

### Clone repo
```
git clone https://github.com/Manideepsainell/TradeMint.git
cd TradeMint
```

---

### Backend setup
```
cd backend
npm install
```

Create `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
```

Run backend:
```
npm start
```

---

### Frontend setup
```
cd dashboard
npm install
npm start
```

---

## 🔌 Key APIs

### Auth
- POST /api/auth/signup  
- POST /api/auth/login  
- GET /api/auth/me  
- POST /api/auth/logout  

### Trading
- GET /api/orders  
- GET /api/holdings  
- GET /api/positions  

---

## 📌 Note

This is a simulation project built for learning purposes.  
It does not execute real trades.

---

## 👨‍💻 Author

Manideep Sai Nellutla  
GitHub: https://github.com/Manideepsainell  
LinkedIn: https://linkedin.com/in/manideep-sai-97681a330
