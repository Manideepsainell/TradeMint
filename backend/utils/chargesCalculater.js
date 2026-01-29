export const calculateCharges = ({ buyPrice, sellPrice, qty }) => {
  const turnover = (buyPrice + sellPrice) * qty;

  const brokerage = 20;
  const stt = sellPrice * qty * 0.00025;
  const exchangeTxn = turnover * 0.0000345;
  const gst = (brokerage + exchangeTxn) * 0.18;
  const sebi = turnover * 0.000001;
  const stampDuty = buyPrice * qty * 0.00003;

  const totalCharges =
    brokerage + stt + exchangeTxn + gst + sebi + stampDuty;

  return {
    brokerage,
    stt,
    exchangeTxn,
    gst,
    sebi,
    stampDuty,
    totalCharges,
  };
};
