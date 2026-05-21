import Orders from "../model/OrdersModel.js";
import Holdings from "../model/HoldingsModel.js";

const SECTOR_MAP = {
  RELIANCE: "ENERGY",
  TCS: "IT",
  INFY: "IT",
  HDFCBANK: "BANKING",
  ICICIBANK: "BANKING",
  ITC: "FMCG",
  KOTAKBANK: "BANKING",
  SBIN: "BANKING",
};

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
export const createOrderService = async ({
  name,
  qty,
  price,
  mode,
  userId,
}) => {
  // SELL rule
  if (mode === "SELL") {
   const holding = await Holdings.findOne({
  symbol: name,
  userId,
});

    if (!holding || holding.qty < qty) {
      throw new Error("Insufficient holdings to sell");
    }
  }

  const newOrder = await Orders.create({
    name,
    qty,
    price,
    mode,
    userId,
  });

  // Update holdings
  if (mode === "BUY") {
  const existingHolding = await Holdings.findOne({
    symbol: name,
    userId,
  });

  if (existingHolding) {
    existingHolding.qty += qty;
    existingHolding.price = price;
    await existingHolding.save();
  } else {
    await Holdings.create({
      symbol: name,
      qty,
      avg: price,
      price,
      sector: SECTOR_MAP[name] || "UNKNOWN",
      userId,
    });
  }
}

  if (mode === "SELL") {
    await Holdings.findOneAndUpdate(
      { symbol: name, userId },
      { $inc: { qty: -qty } }
    );
  }

  return newOrder;
};

import yahooFinance from "yahoo-finance2";
import { getCachedPrice, setCachedPrice } from "../utils/priceCache.js";


export const getOrdersService = async (userId) => {
  const orders = await Orders.find({ userId }).sort({
    createdAt: -1,
  });

  if (!orders.length) return [];

  const updatedOrders = await Promise.all(
    orders.map(async (order) => {
      const symbol = SYMBOL_MAP[order.name] || `${order.name}.NS`;

      let price = getCachedPrice(symbol);

      if (!price) {
        try {
          const quote = await yahooFinance.quote(symbol);
          price = quote.regularMarketPrice;
          setCachedPrice(symbol, price);
        } catch (err) {
          price = order.price;
        }
      }

      return { ...order._doc, price };
    })
  );

  return updatedOrders;
};
