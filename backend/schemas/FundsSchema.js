import mongoose from "mongoose";

const FundsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    openingBalance: {
      type: Number,
      default: 100000, // ✅ demo starting funds
    },

    availableMargin: {
      type: Number,
      default: 100000,
    },

    usedMargin: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default FundsSchema;
