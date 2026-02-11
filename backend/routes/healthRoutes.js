import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import { getPortfolioHealth } from "../controllers/healthController.js";

const router = express.Router();

router.get("/portfolio-health", authMiddleware, getPortfolioHealth);

export default router;
