// index.js (ESM)
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import summaryRoutes from "./routes/summary.js";
// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import stockRoutes from "./routes/stocks.js";
import indicesRoutes from "./routes/indices.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import alertRoutes from "./routes/alertRoutes.js";


const app = express();

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";


// ================== MIDDLEWARE ==================
const allowedOrigins = [
  "http://localhost:3000",
  "https://main.d1z91v4h87g5dz.amplifyapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// ================== ROUTES ==================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/indices", indicesRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/alerts", alertRoutes);


// ================== DB CONNECTION ==================
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ================== ERROR HANDLER (LAST) ==================
app.use(errorHandler);
