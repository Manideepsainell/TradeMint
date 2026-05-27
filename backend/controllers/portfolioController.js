import asyncHandler from "../utils/asyncHandler.js";
import {getHoldingsService} from "../services/portfolioService.js";

export const getHoldings = asyncHandler(async (req, res) => {
  const holdings = await getHoldingsService(req.user.id);

  res.json({
    success: true,
    message: "Holdings fetched successfully",
    data: holdings,
  });
});
