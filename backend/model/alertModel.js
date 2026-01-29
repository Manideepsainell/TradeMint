import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },

    condition: {
      type: String,
      enum: ["ABOVE", "BELOW"],
      required: true,
    },

    targetPrice: {
      type: Number,
      required: true,
    },

    triggered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
