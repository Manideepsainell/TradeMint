import express from "express";
import yahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrderSchema, ordersQuerySchema } from "../validators/orderValidator.js";
import {fundsQuerySchema} from "../validators/fundsValidator.js";
import { getCachedPrice, setCachedPrice } from "../utils/priceCache.js";
import { createOrder, getOrders } from "../controllers/orderController.js";
import {
  getHoldings,
  getPositions,
} from "../controllers/portfolioController.js";
import { getPortfolioInsights } from "../controllers/insightsController.js";
import { getChargesReport } from "../controllers/reportController.js";
import { getFunds } from "../controllers/fundsController.js";
import protect from "../middlewares/authmiddleware.js";
import OrdersSchema from "../schemas/OrdersSchema.js";
 
const router = express.Router();

//
// HOLDINGS
//
router.get("/holdings", protect,asyncHandler(getHoldings));

//
//  POSITIONS
//
router.get("/positions", protect,asyncHandler(getPositions));

//
// ORDERS

  router.get(
    "/orders",
    protect,
    validateRequest(ordersQuerySchema,"query"),
    asyncHandler(getOrders));

// CREATE ORDER
//
router.post(
  "/orders",
  protect,
  validateRequest(createOrderSchema),
  asyncHandler(createOrder)
);

router.get("/insights", protect,asyncHandler(getPortfolioInsights));

router.get("/report/charges", protect, asyncHandler(getChargesReport));

router.get("/funds", protect,validateRequest(fundsQuerySchema,"query"), asyncHandler(getFunds));

export default router;
