import yahooFinance from "yahoo-finance2";
import Holdings from "../model/HoldingsModel.js";
import Positions from "../model/PositionsModel.js";
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
  if (!holdings.length) return [];

  return Promise.all(
    holdings.map(async (holding) => {
      const symbol = SYMBOL_MAP[holding.name] || `${holding.name}.NS`;
      const price = await getLivePrice(symbol, holding.avg);

      const curValue = price * holding.qty;
      const net = curValue - holding.avg * holding.qty;

      return {
        ...holding._doc,
        price,
        day: (price - holding.avg).toFixed(2),
        net: net.toFixed(2),
        isLoss: net < 0,
      };
    })
  );
};

export const getPositionsService = async (userId) => {
  const positions = await Positions.find({ userId });
  if (!positions.length) return [];

  return Promise.all(
    positions.map(async (position) => {
      const symbol = SYMBOL_MAP[position.name] || `${position.name}.NS`;
      const price = await getLivePrice(symbol, position.avg);

      const curValue = price * position.qty;
      const net = curValue - position.avg * position.qty;

      return {
        ...position._doc,
        price,
        day: (price - position.avg).toFixed(2),
        net: net.toFixed(2),
        isLoss: net < 0,
      };
    })
  );
};
