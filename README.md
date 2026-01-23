****# TradeMint 🚀  
A Zerodha-inspired full stack stock trading dashboard built with the MERN stack.

TradeMint allows users to securely sign up/login, manage holdings & positions, place orders, and track portfolio value using live market prices.

---

## ✨ Features

### ✅ Authentication & Security
- Secure **JWT cookie-based authentication** (`httpOnly`)
- Protected routes (frontend + backend)
- Session restore using `/auth/me`
- Logout support

### 📈 Trading Dashboard
- Portfolio overview (investment value, current value, overall P&L)
- Holdings, positions, and orders management
- Watchlist support
- Market indices view (NIFTY / SENSEX)

### ⚙️ Backend APIs
- REST APIs for:
  - Orders
  - Holdings
  - Positions
  - Watchlist
- User-level data separation using `userId`
- Modular middleware-based architecture

### 🌐 Live Market Pricing
- Integrated **Yahoo Finance API** for real-time quote data
- Dynamic portfolio updates based on live prices

---

## 🛠 Tech Stack

**Frontend (Dashboard):**
- React.js
- React Router
- Bootstrap

**Backend:**
- Node.js
- Express.js
- JWT Authentication (cookie-based)
- Middleware architecture

**Database:**
- MongoDB + Mongoose

**Tools:**
- Git & GitHub
- Postman

---

## 📂 Project Structure
TradeMint/
│
├── backend/ # Node.js + Express API
└── dashboard/ # React frontend


---

## ⚡ Getting Started

### 1) Clone the Repository
```bash
git clone https://github.com/Manideepsainell/TradeMint.git
cd TradeMint

🔧 Backend Setup
2) Install Dependencies
cd backend
npm install


3) Setup Environment Variables

Create a .env file inside backend/:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

4) Run Backend
npm start


Backend will run at:
http://localhost:8000

5) Install Dependencies
cd ../dashboard
npm install

6) Run Frontend
npm start


Frontend will run at:
http://localhost:3000
```

🔑 API Highlights
Auth

POST /api/auth/signup — Register

POST /api/auth/login — Login

GET /api/auth/me — Session restore

POST /api/auth/logout — Logout

Trading Data

GET /api/orders

GET /api/holdings

GET /api/positions

GET /api/watchlist

📌 Roadmap / Improvements

Planned production upgrades:

Input validation (Zod/Joi)

Central error handling middleware

Quote caching (performance improvement)

Better loading & error UI on dashboard

Deployment (Render/Vercel)

👨‍💻 Author

Manideep Sai Nellutla

GitHub: https://github.com/Manideepsainell

LinkedIn: https://linkedin.com/in/manideep-sai-97681a330
⭐ If you like this project, consider giving it a star!
----
