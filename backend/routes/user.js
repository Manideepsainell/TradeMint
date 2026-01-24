import express from "express";
import yahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrderSchema } from "../validators/orderValidator.js";

import protect from "../middlewares/authmiddleware.js";
import { HoldingsModel } from "../model/HoldingsModel.js";
import { PositionsModel } from "../model/PositionsModel.js";
import { OrdersModel } from "../model/OrdersModel.js";

const router = express.Router();

// helper symbolMap (reuse across routes)
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

// ✅ Holdings
router.get("/holdings", protect, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({ userId: req.user.id });
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

// ✅ Positions
router.get("/positions", protect, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({ userId: req.user.id });
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


router.get(
  "/orders",
  protect,
  asyncHandler(async (req, res) => {
    const allOrders = await OrdersModel.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    if (!allOrders || allOrders.length === 0) {
      return res.json([]);
    }

    const updatedOrders = await Promise.all(
      allOrders.map(async (order) => {
        const symbol = SYMBOL_MAP[order.name] || `${order.name}.NS`;
        const quote = await yahooFinance.quote(symbol);

        return { ...order._doc, price: quote.regularMarketPrice };
      })
    );

    res.json(updatedOrders);
  })
);


// Create new order
router.post(
  "/orders",
  protect,
  validateRequest(createOrderSchema),
  asyncHandler(async (req, res) => {
    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
      userId: req.user.id,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  })
);


export default router;
