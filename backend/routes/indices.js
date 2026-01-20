import express from "express";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

const router = express.Router();

// Symbols (Yahoo)
const SYMBOLS = {
  nifty: "^NSEI",
  sensex: "^BSESN",
};

router.get("/", async (req, res) => {
  try {
    const [niftyQuote, sensexQuote] = await Promise.all([
      yahooFinance.quote(SYMBOLS.nifty),
      yahooFinance.quote(SYMBOLS.sensex),
    ]);

    res.json({
      nifty: {
        symbol: niftyQuote.symbol,
        price: niftyQuote.regularMarketPrice,
        change: niftyQuote.regularMarketChange,
        changePercent: niftyQuote.regularMarketChangePercent,
      },
      sensex: {
        symbol: sensexQuote.symbol,
        price: sensexQuote.regularMarketPrice,
        change: sensexQuote.regularMarketChange,
        changePercent: sensexQuote.regularMarketChangePercent,
      },
      marketTime: niftyQuote.regularMarketTime,
    });
  } catch (err) {
    console.error("Indices fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch indices" });
  }
});

export default router;
