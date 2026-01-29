import asyncHandler from "../utils/asyncHandler.js";
import Order from "../model/OrdersModel.js";
import {
  executeBuyOrder,
  executeSellOrder,
} from "../services/tradeService.js";

/* ✅ CREATE ORDER */
export const createOrder = asyncHandler(async (req, res) => {
  
  const { name, qty, price, mode } = req.body;

  let order;

  if (mode === "BUY") {
    order = await executeBuyOrder({
      userId: req.user.id,
      name,
      qty,
      price,
    });
  } else if (mode === "SELL") {
    order = await executeSellOrder({
      userId: req.user.id,
      name,
      qty,
      price,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid mode. Use BUY or SELL",
    });
  }

  res.status(201).json({
    success: true,
    message: `${mode} order placed successfully`,
    data: order,
  });
});

/* ✅ GET ORDERS */
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});
