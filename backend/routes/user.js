import express from "express";
import yahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrderSchema } from "../validators/orderValidator.js";
import { getCachedPrice, setCachedPrice } from "../utils/priceCache.js";
import { createOrder, getOrders } from "../controllers/orderController.js";
import {
  getHoldings,
  getPositions,
} from "../controllers/portfolioController.js";

import protect from "../middlewares/authmiddleware.js";

const router = express.Router();

//
// HOLDINGS
//
router.get("/holdings", protect, getHoldings);

//
//  POSITIONS
//
router.get("/positions", protect, getPositions);

//
// ORDERS

  router.get("/orders", protect, getOrders);


//
// CREATE ORDER
//
router.post(
  "/orders",
  protect,
  validateRequest(createOrderSchema),
  createOrder
);

export default router;
