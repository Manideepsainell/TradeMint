import express from "express";
import {
  createAlert,
  getAlerts,
  deleteAlert,
} from "../controllers/alertController.js";
import  protect from "../middlewares/authmiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  createAlertSchema,
  alertIdParamSchema,
}from "../validators/alertValidator.js";


const router = express.Router();
router.post("/", protect, validateRequest(createAlertSchema), createAlert);
router.get("/", protect, getAlerts);
router.delete("/:id", protect, validateRequest(alertIdParamSchema,"params"), deleteAlert);

export default router;
