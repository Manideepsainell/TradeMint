import Holding from "../model/HoldingsModel.js";
import Order from "../model/OrdersModel.js";
import Funds from "../model/FundsModel.js";

import { calculateCharges } from "../utils/chargesCalculater.js";
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

/* ===========================
   BUY ORDER
=========================== */
export const executeBuyOrder = async ({ userId, name, qty, price }) => {
  name = name.replace(".NS", "").trim();

  qty = Number(qty);
  price = Number(price);
  console.log("USER ID:", userId);
 console.log("TYPE:", typeof userId);
  const totalCost = qty * price;

let funds = await Funds.findOne({ userId });
console.log("FUNDS BEFORE:", funds);
if (!funds) {
  funds = await Funds.create({
    userId,
    openingBalance: 100000,
    availableMargin: 100000,
    usedMargin: 0,
  });
}

if (funds.availableMargin < totalCost) {
  throw new Error("Insufficient funds");
}

funds.availableMargin -= totalCost;
funds.usedMargin += totalCost;

await funds.save();
console.log("FUNDS AFTER SAVE:", funds);
  const order = await Order.create({
    userId,
    name,
    qty,
    price,
    mode: "BUY",
  });

  const existingHolding = await Holding.findOne({
    userId,
    symbol: name,
  });

  if (existingHolding) {
    const totalQty = existingHolding.qty + qty;

    const newAvg =
      (existingHolding.avg * existingHolding.qty + price * qty) / totalQty;

    existingHolding.qty = totalQty;
    existingHolding.avg = newAvg;
    existingHolding.price = price;

    await existingHolding.save();
  } else {
    await Holding.create({
      userId,
      symbol: name,
      qty,
      avg: price,
      price,
      day: 0,
      sector: SECTOR_MAP[name] || "UNKNOWN",
    });
  }

  return order;
};

/* ===========================
   SELL ORDER
=========================== */
export const executeSellOrder = async ({ userId, name, qty, price }) => {
  name = name.replace(".NS", "").trim();

  qty = Number(qty);
  price = Number(price);

  const holding = await Holding.findOne({
    userId,
    symbol: name,
  });

  if (!holding) throw new Error("You do not own this stock");
  if (qty > holding.qty) throw new Error("Not enough quantity to sell");

  const buyPrice = Number(holding.avg);

  const grossProfit = (price - buyPrice) * qty;

  const charges = calculateCharges({
    buyPrice,
    sellPrice: price,
    qty,
  });

  const netProfit = grossProfit - charges.totalCharges;
  const sellValue = qty * price;

let funds = await Funds.findOne({ userId });

if (!funds) {
  funds = await Funds.create({
    userId,
    openingBalance: 100000,
    availableMargin: 100000,
    usedMargin: 0,
  });
}

funds.availableMargin += sellValue;
funds.usedMargin = Math.max(0, funds.usedMargin - buyPrice * qty);

await funds.save();

  const order = await Order.create({
    userId,
    name,
    qty,
    price,
    mode: "SELL",
    grossProfit,
    netProfit,
    charges,
  });

  holding.qty -= qty;

  if (holding.qty === 0) await holding.deleteOne();
  else await holding.save();

  return order;
};