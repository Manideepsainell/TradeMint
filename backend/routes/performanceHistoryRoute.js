import express from "express";
import protect from "../middlewares/authmiddleware.js";
import { getPerformanceHistory } from "../controllers/performanceHistoryController.js";

const router = express.Router();

router.get("/", protect, getPerformanceHistory);

export default router;
