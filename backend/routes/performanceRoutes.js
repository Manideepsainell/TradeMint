import express from "express";
import protect from "../middlewares/authmiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getPerformanceSummary } from "../controllers/performanceController.js";

const router = express.Router();

router.get("/", protect, asyncHandler(getPerformanceSummary));

export default router;
