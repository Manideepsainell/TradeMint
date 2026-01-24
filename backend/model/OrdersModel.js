// model/OrdersModel.js
import { model } from "mongoose";
import OrdersSchema from "../schemas/OrdersSchema.js";


export default model("Orders", OrdersSchema);
