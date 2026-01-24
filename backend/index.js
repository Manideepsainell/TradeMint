// index.js (ESM)
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import yahooFinance from 'yahoo-finance2';
import indicesRoutes from "./routes/indices.js";
import userRoutes from "./routes/user.js";
import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stocks.js';
import protect from './middlewares/authmiddleware.js';
import errorHandler from "./middlewares/errorMiddleware.js";

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://main.dni04gzwer7ho.amplifyapp.com",
  "https://main.dnhat8qvs6b5l.amplifyapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.options(/.*/, cors());


app.use(cookieParser());
app.use(express.json());

// ===== Auth & Stock Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/summary", (await import('./routes/summary.js')).default); // lazy import if summary exports default
app.use("/api/indices", indicesRoutes);
app.use("/api/user", userRoutes);


// ===== Database Connect =====
mongoose.connect(uri)
  .then(() => {
    console.log("✅ DB connected");
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ DB connection failed:", err));

// ===== User Data Routes =====

// helper symbolMap (reuse across routes)
const SYMBOL_MAP = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  INFY: "INFY.NS",
  HDFCBANK: "HDFCBANK.NS",
  ICICIBANK: "ICICIBANK.NS",
  ITC: "ITC.NS",
  KOTAKBANK: "KOTAKBANK.NS",
  SBIN: "SBIN.NS",
};

// ===== Global Error Handler (MUST be last) =====
app.use(errorHandler);
