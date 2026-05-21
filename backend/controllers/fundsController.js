import asyncHandler from "../utils/asyncHandler.js";
import Funds from "../model/FundsModel.js";
export const getFunds = asyncHandler(async (req, res) => {
 let funds = await Funds.findOne({ userId: req.user.id });


  if (!funds) {
    funds = {
      balance: 0,
      used: 0,
      transactions: [],
    };
  }

  res.json({
    success: true,
    data: funds,
  });
});
