import Holding from "../model/HoldingsModel.js";

export const getPerformanceHistory = async (req, res) => {
  const userId = req.user.id;

  const holdings = await Holding.find({ userId });

  if (!holdings.length) {
    return res.json({ success: true, data: [] });
  }

  // Fake historical timeline (for demo purpose)
  // In real apps this comes from price history APIs
  const days = 7;
  const history = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const totalInvested = holdings.reduce(
      (sum, stock) => sum + stock.avg * stock.qty,
      0
    );

    // simulate market movement
    const variation = 1 + (Math.random() * 0.1 - 0.05);
    const currentValue = holdings.reduce(
      (sum, stock) => sum + stock.price * stock.qty * variation,
      0
    );

    history.push({
      date: date.toISOString().split("T")[0],
      invested: Math.round(totalInvested),
      value: Math.round(currentValue),
      profit: Math.round(currentValue - totalInvested),
    });
  }

  res.json({ success: true, data: history });
};
