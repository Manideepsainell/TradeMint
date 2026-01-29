import asyncHandler from "../utils/asyncHandler.js";
import Order from "../model/OrdersModel.js";

export const getChargesReport = asyncHandler(async (req, res) => {
  // ✅ only SELL orders have charges + net profit
  const sellOrders = await Order.find({
    userId: req.user.id,
    mode: "SELL",
  });

  const totalCharges = sellOrders.reduce(
    (sum, order) => sum + (order.charges?.totalCharges || 0),
    0
  );

  const totalNetProfit = sellOrders.reduce(
    (sum, order) => sum + (order.netProfit || 0),
    0
  );

  res.json({
    success: true,
    data: {
      totalCharges,
      totalNetProfit,
    },
  });
});
