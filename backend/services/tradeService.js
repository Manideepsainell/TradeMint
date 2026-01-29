import Holding from "../model/HoldingsModel.js";
import Order from "../model/OrdersModel.js";
import { calculateCharges } from "../utils/chargesCalculater.js";

/* ===========================
   ✅ BUY ORDER
=========================== */
export const executeBuyOrder = async ({ userId, name, qty, price }) => {
  name = name.replace(".NS", "").trim();

  qty = Number(qty);
  price = Number(price);

  // ✅ Save BUY order
  const order = await Order.create({
    userId,
    name,
    qty,
    price,
    mode: "BUY",
  });

  // ✅ Update holdings
  const existingHolding = await Holding.findOne({ userId, name });

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
      name,
      qty,
      avg: price,
      price,
      day: 0,
    });
  }

  return order;
};

/* ===========================
   ✅ SELL ORDER + BROKERAGE
=========================== */
export const executeSellOrder = async ({ userId, name, qty, price }) => {
  console.log("✅ EXECUTE SELL ORDER WITH BROKERAGE RUNNING");

  name = name.replace(".NS", "").trim();

  qty = Number(qty);
  price = Number(price);

  // ✅ Find holding
  const holding = await Holding.findOne({ userId, name });

  if (!holding) throw new Error("You do not own this stock");
  if (qty > holding.qty) throw new Error("Not enough quantity to sell");

  const buyPrice = Number(holding.avg);

  // ✅ Gross Profit
  const grossProfit = (price - buyPrice) * qty;

  // ✅ Charges
  const charges = calculateCharges({
    buyPrice,
    sellPrice: price,
    qty,
  });

  // ✅ Net Profit
  const netProfit = grossProfit - charges.totalCharges;

  // ✅ Save SELL order with breakdown
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

  // ✅ Update holdings
  holding.qty -= qty;

  if (holding.qty === 0) await holding.deleteOne();
  else await holding.save();

  return order;
};
