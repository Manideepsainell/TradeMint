import express from "express";
import YahooFinance from "yahoo-finance2";
import asyncHandler from "../utils/asyncHandler.js";
import { mockStocks } from "../data/mockStocks.js";
const yahooFinance = new YahooFinance();
const router = express.Router();

let routeCache = {
  sensex: { data: null, timestamp: 0 },
  nifty: { data: null, timestamp: 0 },
  watchlist: { data: null, timestamp: 0 }
};

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const watchlistSymbols = ["RELIANCE.NS", "TCS.NS", "INFY.NS"];

const sensexNseSymbols = [
  "RELIANCE.NS","TCS.NS","HDFCBANK.NS","INFY.NS","ICICIBANK.NS",
  "ITC.NS","KOTAKBANK.NS","SBIN.NS","BHARTIARTL.NS","LT.NS"
];

const niftyNseSymbols = [
  "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
  "ITC.NS","KOTAKBANK.NS","SBIN.NS","LT.NS","HCLTECH.NS"
];


async function fetchStocks(symbols) {
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
}

//  CACHE HANDLER
async function handleCachedRoute(key, symbols, res) {
  const now = Date.now();

  if (
    routeCache[key].data &&
    now - routeCache[key].timestamp < CACHE_TTL
  ) {
    return res.json(routeCache[key].data);
  }

  try {
    const data = await fetchStocks(symbols);

    routeCache[key] = {
      data,
      timestamp: now
    };

    return res.json(data);

  } catch (error) {
  console.error(`${key} fetch failed:`, error.message);

  // return mock data instead
  return res.json(mockStocks[key] || []);
}  }



//  ROUTES
router.get("/sensex", asyncHandler(async (req, res) => {
  await handleCachedRoute("sensex", sensexNseSymbols, res);
}));

router.get("/nifty", asyncHandler(async (req, res) => {
  await handleCachedRoute("nifty", niftyNseSymbols, res);
}));

router.get("/watchlist", asyncHandler(async (req, res) => {
  await handleCachedRoute("watchlist", watchlistSymbols, res);
}));


//  SINGLE STOCK
router.get("/:symbol", asyncHandler(async (req, res) => {

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

  try {
    const quote = await yahooFinance.quote(symbol);

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
    console.error("Single stock fetch failed:", error.message);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }

}));

export default router;