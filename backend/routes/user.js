import express from "express";
import yahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrderSchema } from "../validators/orderValidator.js";
import { getCachedPrice, setCachedPrice } from "../utils/priceCache.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

import protect from "../middlewares/authmiddleware.js";

// ✅ DEFAULT model imports
import Holdings from "../model/HoldingsModel.js";
import Positions from "../model/PositionsModel.js";
import Orders from "../model/OrdersModel.js";

const router = express.Router();

// helper symbol map
const SYMBOL_MAP = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  INFY: "INFY.NS",
  HDFCBANK: "HDFCBANK.NS",
  ICICIBANK: "ICICIBANK.NS",
  ITC: "ITC.NS",
  KOTAKBANK: "KOTAKBANK.NS",
  SBIN: "SBIN.NS",
};

//
// ✅ HOLDINGS
//
router.get("/holdings", protect, async (req, res) => {
  try {
    const allHoldings = await Holdings.find({ userId: req.user.id });
    if (!allHoldings || allHoldings.length === 0) return res.json([]);

    const updatedHoldings = await Promise.all(
      allHoldings.map(async (holding) => {
        const symbol = SYMBOL_MAP[holding.name] || `${holding.name}.NS`;
        const quote = await yahooFinance.quote(symbol);

        const curValue = quote.regularMarketPrice * holding.qty;
        const net = curValue - holding.avg * holding.qty;

        return {
          ...holding._doc,
          price: quote.regularMarketPrice,
          day: quote.regularMarketChange.toFixed(2),
          net: net.toFixed(2),
          isLoss: net < 0,
        };
      })
    );

    res.json(updatedHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err.message);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

//
// ✅ POSITIONS
//
router.get("/positions", protect, async (req, res) => {
  try {
    const allPositions = await Positions.find({ userId: req.user.id });
    if (!allPositions || allPositions.length === 0) return res.json([]);

    const updatedPositions = await Promise.all(
      allPositions.map(async (position) => {
        const symbol = SYMBOL_MAP[position.name] || `${position.name}.NS`;
        const quote = await yahooFinance.quote(symbol);

        const curValue = quote.regularMarketPrice * position.qty;
        const net = curValue - position.avg * position.qty;

        return {
          ...position._doc,
          price: quote.regularMarketPrice,
          day: quote.regularMarketChange.toFixed(2),
          net: net.toFixed(2),
          isLoss: net < 0,
        };
      })
    );

    res.json(updatedPositions);
  } catch (err) {
    console.error("Error fetching positions:", err.message);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

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
