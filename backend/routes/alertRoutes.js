import express from "express";
import {
  createAlert,
  getAlerts,
  deleteAlert,
} from "../controllers/alertController.js";

import  protect from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/", protect, createAlert);
router.get("/", protect, getAlerts);
router.delete("/:id", protect, deleteAlert);

export default router;
