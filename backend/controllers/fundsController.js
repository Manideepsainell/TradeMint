import asyncHandler from "../utils/asyncHandler.js";
import Funds from "../model/FundsModel.js";

export const getFunds = asyncHandler(async (req, res) => {
  const funds = await Funds.findOne({ userId: req.user.id });

  res.json({
    success: true,
    data: funds,
  });
});
