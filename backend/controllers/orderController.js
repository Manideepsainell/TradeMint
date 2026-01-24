import asyncHandler from "../utils/asyncHandler.js";
import { createOrderService } from "../services/orderService.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { name, qty, price, mode } = req.body;

  const order = await createOrderService({
    name,
    qty,
    price,
    mode,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

import { getOrdersService } from "../services/orderService.js";

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await getOrdersService(req.user.id);

  res.json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});
