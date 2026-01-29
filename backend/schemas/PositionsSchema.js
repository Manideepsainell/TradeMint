import mongoose from "mongoose";

const { Schema } = mongoose;

const PositionSchema = new Schema(
  {
    product: { type: String, default: "MIS" },

    name: { type: String, required: true },

    qty: { type: Number, required: true },

    avg: { type: Number, required: true },

    price: { type: Number, required: true },

    net: { type: String, default: "0%" },

    day: { type: String, default: "0%" },

    isLoss: { type: Boolean, default: false },

    // ✅ MUST ADD THIS
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default PositionSchema;
