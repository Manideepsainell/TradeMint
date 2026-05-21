import Orders from "../model/OrdersModel.js";
import Holdings from "../model/HoldingsModel.js";
import yahooFinance from "yahoo-finance2";
import { getCachedPrice, setCachedPrice } from "../utils/priceCache.js";

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
  const normalizedName = name.replace(".NS", "");

  if (mode === "SELL") {
    const holding = await Holdings.findOne({
      symbol: normalizedName,
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

  if (mode === "BUY") {
    const existingHolding = await Holdings.findOne({
      symbol: normalizedName,
      userId,
    });

    if (existingHolding) {
      existingHolding.qty += qty;
      existingHolding.price = price;
      await existingHolding.save();
    } else {
      await Holdings.create({
        symbol: normalizedName,
        qty,
        avg: price,
        price,
        sector: SECTOR_MAP[normalizedName] || "UNKNOWN",
        userId,
      });
    }
  }

  if (mode === "SELL") {
    await Holdings.findOneAndUpdate(
      { symbol: normalizedName, userId },
      { $inc: { qty: -qty } }
    );
  }

  return newOrder;
};

export const getOrdersService = async (userId) => {
  const orders = await Orders.find({ userId }).sort({
    createdAt: -1,
  });

  if (!orders.length) return [];

  const updatedOrders = await Promise.all(
    orders.map(async (order) => {
      const normalizedName = order.name.replace(".NS", "");
      const symbol = SYMBOL_MAP[normalizedName] || order.name;

      let price = getCachedPrice(symbol);

      if (!price) {
        try {
          const quote = await yahooFinance.quote(symbol);
          price = quote.regularMarketPrice;
          setCachedPrice(symbol, price);
        } catch {
          price = order.price;
        }
      }

      return { ...order._doc, price };
    })
  );

  return updatedOrders;
};