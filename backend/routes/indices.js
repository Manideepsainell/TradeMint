import express from "express";
import YahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";

const yahooFinance = new YahooFinance();
const router = express.Router();

// Symbols (Yahoo)
const SYMBOLS = {
  nifty: "^NSEI",
  sensex: "^BSESN",
};

router.get(
  "/",
  asyncHandler(async (req, res) => {
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
  })
);

export default router;
