import asyncHandler from "../utils/asyncHandler.js";
import {
  getHoldingsService,
  getPositionsService,
} from "../services/portfolioService.js";

export const getHoldings = asyncHandler(async (req, res) => {
  const holdings = await getHoldingsService(req.user.id);

  res.json({
    success: true,
    message: "Holdings fetched successfully",
    data: holdings,
  });
});

export const getPositions = asyncHandler(async (req, res) => {
  const positions = await getPositionsService(req.user.id);

  res.json({
    success: true,
    message: "Positions fetched successfully",
    data: positions,
  });
});
