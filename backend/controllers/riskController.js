import Holding from "../model/HoldingsModel.js";

export const getRiskAlerts = async (req, res) => {
  try {
    const userId = req.user.id;

    const holdings = await Holding.find({ userId: userId });

    if (!holdings.length) {
      return res.json({ alerts: [] });
    }

    const alerts = [];

    // 1️⃣ Calculate total portfolio value
    const totalValue = holdings.reduce(
      (sum, stock) => sum + stock.price * stock.qty,
      0
    );

    // 2️⃣ HIGH EXPOSURE CHECK
    holdings.forEach((stock) => {
      const stockValue = stock.price * stock.qty;
     const exposurePercent = Number(((stockValue / totalValue) * 100).toFixed(1));

      if (exposurePercent > 40) {
        alerts.push({
  type: "HIGH_EXPOSURE",
  severity: "high",
  message: `${stock.symbol} makes up ${exposurePercent}% of your portfolio. Consider reducing concentration.`,
});

      }
    });

    // 3️⃣ SECTOR CONCENTRATION CHECK
    const sectorMap = {};

    holdings.forEach((stock) => {
      const value = stock.price * stock.qty;
      sectorMap[stock.sector] = (sectorMap[stock.sector] || 0) + value;
    });

    Object.entries(sectorMap).forEach(([sector, value]) => {
     const percent = Number(((value / totalValue) * 100).toFixed(1));

if (percent > 60) {
  alerts.push({
    type: "SECTOR_CONCENTRATION",
    severity: "medium",
    message: `${percent}% of your portfolio is in ${sector} sector. Diversification recommended.`,
  });
}

    });

    // 4️⃣ TOO FEW STOCKS
    if (holdings.length < 3) {
      alerts.push({
  type: "LOW_DIVERSIFICATION",
  severity: "medium",
  message: `You hold only ${holdings.length} stocks. Consider adding more stocks to diversify risk.`,
});

    }

    res.json({ alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate risk alerts" });
  }
};
