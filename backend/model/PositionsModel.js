// model/PositionsModel.js
import mongoose from "mongoose";
import PositionSchema from "../schemas/PositionsSchema.js";
import { model } from "mongoose";
export default model("Positions", PositionSchema);
