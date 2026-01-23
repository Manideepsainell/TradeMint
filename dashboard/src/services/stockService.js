import api from "../api/axios";

// ✅ cookie auth automatically handled by api instance
export const fetchSensex = async () => {
  const res = await api.get("/api/stocks/sensex");
  return res.data;
};

// ✅ Fetch all Nifty 50 stocks
export const fetchNifty = async () => {
  const res = await api.get("/api/stocks/nifty");
  return res.data;
};

// ✅ Fetch single stock by symbol
export const fetchStock = async (symbol) => {
  const res = await api.get(`/api/stocks/${symbol}`);
  return res.data;
};
