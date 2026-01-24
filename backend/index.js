// index.js (ESM)
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import stockRoutes from "./routes/stocks.js";
import indicesRoutes from "./routes/indices.js";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

// ✅ Allowed Frontend Origins (Local + Amplify)
const allowedOrigins = [
  "http://localhost:3000", // local React
  "https://main.d1z91v4h87g5dz.amplifyapp.com", // Amplify current
];

// ================== MIDDLEWARE ==================
app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow requests like Postman or server-to-server
      if (!origin) return callback(null, true);

      // ✅ Allow only whitelisted origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true, // ✅ Allow cookies / sessions
  })
);

app.use(express.json());
app.use(cookieParser());

// ================== ROUTES ==================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/indices", indicesRoutes);
app.use("/api/summary", (await import("./routes/summary.js")).default);

// ================== DB CONNECTION ==================
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ================== ERROR HANDLER (LAST) ==================
app.use(errorHandler);
