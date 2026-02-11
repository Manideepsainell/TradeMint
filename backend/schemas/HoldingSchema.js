import mongoose from "mongoose";

const { Schema } = mongoose;

const HoldingSchema = new Schema(
  {
    symbol: { type: String, required: true, uppercase: true, trim: true },
    qty: { type: Number, required: true, min: 0 },
    avg: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    day: { type: Number, default: 0 },
    sector: { type: String, required: true, uppercase: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default HoldingSchema; // ✅ ONLY schema
