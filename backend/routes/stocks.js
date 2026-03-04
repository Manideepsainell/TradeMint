import express from "express";
import YahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";

const yahooFinance = new YahooFinance();
const router = express.Router();

// 🔥 In-memory route cache
let routeCache = {
  sensex: { data: null, timestamp: 0 },
  nifty: { data: null, timestamp: 0 },
  watchlist: { data: null, timestamp: 0 }
};

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const watchlistSymbols = ["RELIANCE.NS", "TCS.NS", "INFY.NS"];

const sensexNseSymbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "SBIN.NS", "BHARTIARTL.NS", "LT.NS"
];

const niftyNseSymbols = [
  "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "SBIN.NS", "LT.NS", "HCLTECH.NS"
];

async function fetchStocks(symbols) {
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);

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
async function fetchStocks(symbols) {
  try {
    const quotes = await yahooFinance.quote(symbols);

    return quotes.map((quote) => ({
      symbol: quote.symbol,
      price: quote.regularMarketPrice ?? 0,
      change: quote.regularMarketChange ?? 0,
      changePercent: quote.regularMarketChangePercent ?? 0,
      open: quote.regularMarketOpen ?? 0,
      high: quote.regularMarketDayHigh ?? 0,
      low: quote.regularMarketDayLow ?? 0,
      previousClose: quote.regularMarketPreviousClose ?? 0,
      marketTime: quote.regularMarketTime ?? null,
    }));

  } catch (error) {
    console.error("Yahoo batch fetch failed:", error.message);

    return symbols.map(symbol => ({
      symbol,
      error: "Failed to fetch"
    }));
  }
}

//Sensex
router.get("/sensex", asyncHandler(async (req, res) => {
  await handleCachedRoute("sensex", sensexNseSymbols, res);
}));

// Nifty
router.get("/nifty", asyncHandler(async (req, res) => {
  await handleCachedRoute("nifty", niftyNseSymbols, res);
}));

// Watchlist
router.get("/watchlist", asyncHandler(async (req, res) => {
  await handleCachedRoute("watchlist", watchlistSymbols, res);
}));

// Single stock (no heavy caching needed)
router.get("/:symbol", asyncHandler(async (req, res) => {
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
}));


export default router;

  