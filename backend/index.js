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
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";


// ================== MIDDLEWARE ==================
app.use(
  cors({
    origin: CLIENT_URL,        // ✅ ENV-based frontend URL
    credentials: true,         // ✅ allow cookies
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
