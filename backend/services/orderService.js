import Orders from "../model/OrdersModel.js";
import Holdings from "../model/HoldingsModel.js";

export const createOrderService = async ({
  name,
  qty,
  price,
  mode,
  userId,
}) => {
  // SELL rule
  if (mode === "SELL") {
    const holding = await Holdings.findOne({ name, userId });

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
    await Holdings.findOneAndUpdate(
      { name, userId },
      { $inc: { qty } },
      { upsert: true }
    );
  }

  if (mode === "SELL") {
    await Holdings.findOneAndUpdate(
      { name, userId },
      { $inc: { qty: -qty } }
    );
  }

  return newOrder;
};

import yahooFinance from "yahoo-finance2";
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
