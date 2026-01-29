import mongoose from "mongoose";
import OrdersSchema from "../schemas/OrdersSchema.js";

export default mongoose.model("Order", OrdersSchema);
