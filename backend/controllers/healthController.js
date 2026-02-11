import Holding from "../model/HoldingsModel.js";

export const getPortfolioHealth = async (req, res) => {
  try {
    const userId = req.user.id;
    const holdings = await Holding.find({ userId });

    if (!holdings.length) {
      return res.json({ score: 0 });
    }

    const totalValue = holdings.reduce(
      (sum, stock) => sum + stock.price * stock.qty,
      0
    );

    // -------- STOCK CONCENTRATION --------
    let maxStockPercent = 0;

    holdings.forEach(stock => {
      const value = stock.price * stock.qty;
      const percent = (value / totalValue) * 100;
      if (percent > maxStockPercent) maxStockPercent = percent;
    });

    let stockScore = 40;
    if (maxStockPercent > 50) stockScore = 10;
    else if (maxStockPercent > 30) stockScore = 25;

    // -------- SECTOR DIVERSIFICATION --------
    const sectorMap = {};

    holdings.forEach(stock => {
      const value = stock.price * stock.qty;
      sectorMap[stock.sector] = (sectorMap[stock.sector] || 0) + value;
    });

    let maxSectorPercent = 0;
    Object.values(sectorMap).forEach(value => {
      const percent = (value / totalValue) * 100;
      if (percent > maxSectorPercent) maxSectorPercent = percent;
    });

    let sectorScore = 30;
    if (maxSectorPercent > 70) sectorScore = 5;
    else if (maxSectorPercent > 50) sectorScore = 15;

    // -------- DIVERSIFICATION --------
    const count = holdings.length;
    let diversificationScore = 30;
    if (count < 3) diversificationScore = 5;
    else if (count <= 5) diversificationScore = 20;

    const finalScore = stockScore + sectorScore + diversificationScore;

    res.json({
      score: finalScore,
      breakdown: {
        stockScore,
        sectorScore,
        diversificationScore,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to calculate portfolio health" });
  }
};
