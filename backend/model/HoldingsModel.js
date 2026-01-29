// model/HoldingsModel.js

import mongoose from "mongoose";
import HoldingSchema from "../schemas/HoldingSchema.js";

export default mongoose.model("Holding", HoldingSchema);
