import mongoose from "mongoose";
import dotenv from "dotenv";
import Funds from "../model/FundsModel.js";
import User from "../model/UserModel.js";

import Holding from "../model/HoldingsModel.js";
import Order from "../model/OrdersModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");

    // ⚠️ Replace with your real logged-in userId
        const userId = new mongoose.Types.ObjectId(
  "696e093068becef548822d43"
);

    // Clear existing
    await Holding.deleteMany({ });
    await Order.deleteMany({  });
  await Funds.deleteMany({});

    console.log("🗑 Old user data cleared");

    // ✅ Holdings Seed
    await Holding.insertMany([
      {
        userId,
        name: "TCS",
        qty: 5,
        avg: 3200,
        price: 3450,
        day: 1.2,
      },
      {
        userId,
        name: "INFY",
        qty: 10,
        avg: 1450,
        price: 1520,
        day: -0.6,
      },
    ]);

    console.log("✅ Holdings Seeded");
    // ✅ Funds Seed (Starting Balance)
await Funds.create({
  userId,
  openingBalance: 100000,
  availableMargin: 100000,
  usedMargin: 0,
});

console.log("✅ Funds Seeded");

    // ✅ Orders Seed
   await Order.insertMany([
  {
    userId,
    name: "TCS",
    qty: 5,
    price: 3200,
    mode: "BUY",       // ✅ required
    status: "COMPLETE",
  },
  {
    userId,
    name: "INFY",
    qty: 10,
    price: 1450,
    mode: "BUY",
    status: "COMPLETE",
  },
  {
    userId,
    name: "HDFC",
    qty: 6,
    price: 1600,
    mode: "SELL",
    status: "OPEN",
  },
]);

    console.log("✅ Orders Seeded");

    console.log("🎉 TradeMint Seed Data Added Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error.message);
    process.exit(1);
  }
};

seedData();
