import express from "express";
import YahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";

const yahooFinance = new YahooFinance();
const router = express.Router();

const watchlistSymbols = ["RELIANCE.NS", "TCS.NS", "INFY.NS"];

// Sensex (sample)
const sensexNseSymbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "LT.NS"
];

// Nifty (sample)
const niftyNseSymbols = [
  "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "SBIN.NS", "LT.NS", "HCLTECH.NS"
];

async function fetchStocks(symbols) {
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);

        // ✅ sometimes Yahoo returns undefined/null
        if (!quote) {
          return { symbol, error: "No quote data returned" };
        }

        return {
          symbol: quote.symbol || symbol,
          price: quote.regularMarketPrice ?? 0,
          change: quote.regularMarketChange ?? 0,
          changePercent: quote.regularMarketChangePercent ?? 0,
          open: quote.regularMarketOpen ?? 0,
          high: quote.regularMarketDayHigh ?? 0,
          low: quote.regularMarketDayLow ?? 0,
          previousClose: quote.regularMarketPreviousClose ?? 0,
          marketTime: quote.regularMarketTime ?? null,
        };
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error.message);
        return { symbol, error: "Failed to fetch" };
      }
    })
  );

  return results;
}

// ✅ Route for Sensex (frontend expects /api/stocks/sensex)
router.get("/sensex", async (req, res) => {
  const data = await fetchStocks(sensexNseSymbols);
  res.json(data);
});

// ✅ Route for Nifty (frontend expects /api/stocks/nifty)
router.get("/nifty", async (req, res) => {
  const data = await fetchStocks(niftyNseSymbols);
  res.json(data);
});

// ✅ Watchlist
router.get("/watchlist", async (req, res) => {
  try {
    const data = await fetchStocks(watchlistSymbols);
    res.json(data);
  } catch (error) {
    console.error("Error fetching watchlist:", error.message);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

// ✅ Single stock route (keep last!)
router.get("/:symbol", async (req, res) => {
  try {
    const input = req.params.symbol.toUpperCase();

    const nseMap = {
      RELIANCE: "RELIANCE.NS",
      TCS: "TCS.NS",
      INFY: "INFY.NS",
      HDFCBANK: "HDFCBANK.NS",
      ICICIBANK: "ICICIBANK.NS",
      ITC: "ITC.NS",
      KOTAKBANK: "KOTAKBANK.NS",
      SBIN: "SBIN.NS",
    };

    const symbol = nseMap[input] || `${input}.NS`;

    const quote = await yahooFinance.quote(symbol);

    if (!quote) {
      return res.status(404).json({ error: "No quote returned", symbol });
    }

    res.json({
      symbol: quote.symbol || symbol,
      price: quote.regularMarketPrice ?? 0,
      change: quote.regularMarketChange ?? 0,
      changePercent: quote.regularMarketChangePercent ?? 0,
      open: quote.regularMarketOpen ?? 0,
      high: quote.regularMarketDayHigh ?? 0,
      low: quote.regularMarketDayLow ?? 0,
      previousClose: quote.regularMarketPreviousClose ?? 0,
      marketTime: quote.regularMarketTime ?? null,
    });
  } catch (error) {
    console.error("Error fetching Yahoo Finance stock:", error.message);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
