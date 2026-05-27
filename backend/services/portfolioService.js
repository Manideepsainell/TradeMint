import yahooFinance from "yahoo-finance2";
import Holdings from "../model/HoldingsModel.js";
import { getCachedPrice, setCachedPrice } from "../utils/priceCache.js";

const SYMBOL_MAP = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  INFY: "INFY.NS",
  HDFCBANK: "HDFCBANK.NS",
  ICICIBANK: "ICICIBANK.NS",
  ITC: "ITC.NS",
  KOTAKBANK: "KOTAKBANK.NS",
  SBIN: "SBIN.NS",
};

const getLivePrice = async (symbol, fallbackPrice) => {
  let price = getCachedPrice(symbol);

  if (!price) {
    try {
      const quote = await yahooFinance.quote(symbol);
      price = quote.regularMarketPrice;
      setCachedPrice(symbol, price);
    } catch {
      price = fallbackPrice;
    }
  }

  return price;
};
export const getHoldingsService = async (userId) => {
  const holdings = await Holdings.find({ userId });

  if (!holdings || holdings.length === 0) return [];

  return Promise.all(
    holdings.map(async (holding) => {
      const symbol = SYMBOL_MAP[holding.symbol] || `${holding.symbol}.NS`;
      const price = await getLivePrice(symbol, holding.avg);

      const curValue = price * holding.qty;
      const net = curValue - holding.avg * holding.qty;

     return {
  ...holding._doc,
  name: holding.symbol,
  price,
  day: (price - holding.avg).toFixed(2),
  net: net.toFixed(2),
  isLoss: net < 0,
};
    })
  );
};

