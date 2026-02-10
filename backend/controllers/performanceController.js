import Order from "../model/OrdersModel.js";
import Holding from "../model/HoldingsModel.js";

export const getPerformanceSummary = async (req, res) => {
  const userId = req.user.id;

  const holdings = await Holding.find({ userId });
  const sellOrders = await Order.find({ userId, mode: "SELL" });

  // 💰 Cost of current holdings
  const totalInvested = holdings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  // 📈 Current market value of holdings
  const currentValue = holdings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  // 🟢 Unrealized Profit (open positions)
  const unrealizedProfit = holdings.reduce(
    (sum, stock) => sum + (stock.price - stock.avg) * stock.qty,
    0
  );

  // 🔵 Realized Profit (closed trades)
  const realizedProfit = sellOrders.reduce(
    (sum, order) => sum + (order.netProfit || 0),
    0
  );

  // 💸 Charges paid on closed trades
  const chargesPaid = sellOrders.reduce(
    (sum, order) => sum + (order.charges?.totalCharges || 0),
    0
  );

  // 🧮 Total Portfolio Profit
  const totalReturn = realizedProfit + unrealizedProfit;

  // 📊 Return percentage based on invested capital still in market
  // 📊 Overall return percentage
const returnPercent =
  totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;


  res.json({
    success: true,
    data: {
      totalInvested,
      currentValue,
      realizedProfit,
      unrealizedProfit,
      totalReturn,
      returnPercent,
      chargesPaid,
    },
  });
};
