import express from "express";
import YahooFinance from "yahoo-finance2";


import asyncHandler from "../utils/asyncHandler.js";


const yahooFinance = new YahooFinance();

const router = express.Router();

const SYMBOLS = {
  nifty: "^NSEI",
  sensex: "^BSESN",
};

// 🔥 In-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const now = Date.now();

    // ✅ Serve cached data if valid
    if (cache.data && now - cache.timestamp < CACHE_TTL) {
      return res.json(cache.data);
    }

    try {
      const [niftyQuote, sensexQuote] = await Promise.all([
        yahooFinance.quote(SYMBOLS.nifty),
        yahooFinance.quote(SYMBOLS.sensex),
      ]);

      const freshData = {
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
      };

      // 🔥 Update cache
      cache = {
        data: freshData,
        timestamp: now,
      };

      return res.json(freshData);

    } catch (error) {
      console.error("Yahoo fetch failed:", error.message);

      // ✅ If Yahoo fails, serve stale cache instead of crashing
      if (cache.data) {
       return res.json(cache.data);
      }

      return res.status(500).json({
        message: "Failed to fetch indices",
      });
    }
  })
);

export default router;