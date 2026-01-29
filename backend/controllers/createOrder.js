import asyncHandler from "../utils/asyncHandler.js";
import {
  executeBuyOrder,
  executeSellOrder,
} from "../services/tradeService.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { name, qty, price, mode } = req.body;

  let order;

  // ✅ BUY
  if (mode === "BUY") {
    order = await executeBuyOrder({
      userId: req.user.id,
      name,
      qty,
      price,
    });
  }

  // ✅ SELL
  else if (mode === "SELL") {
    order = await executeSellOrder({
      userId: req.user.id,
      name,
      qty,
      price,
    });
  }

  // ✅ Invalid mode
  else {
    return res.status(400).json({
      success: false,
      message: "Invalid order mode. Use BUY or SELL",
    });
  }

  res.status(201).json({
    success: true,
    message: `${mode} Order placed successfully`,
    data: order,
  });
});
