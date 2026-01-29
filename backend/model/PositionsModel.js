import mongoose from "mongoose";
import PositionSchema from "../schemas/PositionsSchema.js";

export default mongoose.model("Position", PositionSchema);
