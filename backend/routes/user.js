import express from "express";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrderSchema, ordersQuerySchema } from "../validators/orderValidator.js";
import { fundsQuerySchema } from "../validators/fundsValidator.js";

import { createOrder, getOrders } from "../controllers/orderController.js";
import { getHoldings} from "../controllers/portfolioController.js";
import { getPortfolioInsights } from "../controllers/insightsController.js";
import { getChargesReport } from "../controllers/reportController.js";
import { getFunds } from "../controllers/fundsController.js";
import protect from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/holdings", protect, getHoldings);

router.get(
  "/orders",
  protect,
  validateRequest(ordersQuerySchema, "query"),
  getOrders
);

router.post(
  "/orders",
  protect,
  validateRequest(createOrderSchema),
  createOrder
);

router.get("/insights", protect, getPortfolioInsights);
router.get("/report/charges", protect, getChargesReport);

router.get(
  "/funds",
  protect,
  validateRequest(fundsQuerySchema, "query"),
  getFunds
);

export default router;
