import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    mode: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ PROFIT FIELDS (MUST)
    grossProfit: {
      type: Number,
      default: 0,
    },

    netProfit: {
      type: Number,
      default: 0,
    },

    // ✅ CHARGES OBJECT (MUST)
    charges: {
      brokerage: { type: Number, default: 0 },
      stt: { type: Number, default: 0 },
      exchangeTxn: { type: Number, default: 0 },
      gst: { type: Number, default: 0 },
      sebi: { type: Number, default: 0 },
      stampDuty: { type: Number, default: 0 },
      totalCharges: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default OrdersSchema;
