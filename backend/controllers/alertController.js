import Alert from "../model/alertModel.js";

/* =============================
   CREATE ALERT
============================= */
export const createAlert = async (req, res) => {
  const { symbol, condition, targetPrice } = req.body;

  const alert = await Alert.create({
user: req.user.id,

    symbol,
    condition,
    targetPrice,
  });
  console.log("USER:", req.user);


  res.json({ success: true, data: alert });
};

/* =============================
   GET ALERTS
============================= */
export const getAlerts = async (req, res) => {
  const alerts = await Alert.find({
    user: req.user.id,

    triggered: false,
  }).sort({ createdAt: -1 });

  res.json({ success: true, data: alerts });
};

/* =============================
   DELETE ALERT
============================= */
export const deleteAlert = async (req, res) => {
  await Alert.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "Alert removed" });
};

