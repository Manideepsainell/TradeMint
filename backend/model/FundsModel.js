import mongoose from "mongoose";
import FundsSchema from "../schemas/FundsSchema.js";

export default mongoose.model("Funds", FundsSchema);
