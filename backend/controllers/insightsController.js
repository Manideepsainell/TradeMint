import asyncHandler from "../utils/asyncHandler.js";
import Holding from "../model/HoldingsModel.js";

export const getPortfolioInsights = asyncHandler(async (req, res) => {
  const holdings = await Holding.find({ userId: req.user.id });

  if (!holdings.length) {
    return res.json({
      success: true,
      data: {
        alerts: ["No holdings yet. Start trading to see insights ✅"],
      },
    });
  }

  const totalValue = holdings.reduce(
    (sum, stock) => sum + stock.qty * stock.price,
    0
  );

  let alerts = [];

  holdings.forEach((stock) => {
    const value = stock.qty * stock.price;
    const exposure = (value / totalValue) * 100;

    if (exposure > 40) {
      alerts.push(
        `⚠️ High Exposure: ${stock.name} is ${exposure.toFixed(
          1
        )}% of your portfolio`
      );
    }

    if (Number(stock.day) < -3) {
      alerts.push(
        `⚠️ ${stock.name} dropped ${stock.day}% today. Consider risk management`
      );
    }
  });

  if (!alerts.length) {
    alerts.push("✅ Portfolio looks healthy and balanced today!");
  }

  res.json({
    success: true,
    data: { alerts },
  });
});
