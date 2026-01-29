// schemas/HoldingSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;
const HoldingSchema = new Schema(
  {
    name: { type: String, required: true },

    qty: { type: Number, required: true },

    avg: { type: Number, required: true },   // ✅ add
    price: { type: Number, default: 0 },     // ✅ add
    day: { type: Number, default: 0 },       // ✅ add

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);



export default HoldingSchema;
