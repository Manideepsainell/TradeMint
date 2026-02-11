import express from "express";
import { getRiskAlerts } from "../controllers/riskController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/risk-alerts", authMiddleware, getRiskAlerts);

export default router;
