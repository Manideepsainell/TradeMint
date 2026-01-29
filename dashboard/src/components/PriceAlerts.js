import React, { useEffect, useState } from "react";
import api from "../api/axios";

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [condition, setCondition] = useState("ABOVE");
  const [price, setPrice] = useState("");

  /* Fetch Alerts */
  const loadAlerts = async () => {
    const res = await api.get("/api/alerts");
    setAlerts(res.data?.data || []);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  /* Create Alert */
  const handleCreate = async () => {
    if (!symbol || !price) return;

    await api.post("/api/alerts", {
      symbol,
      condition,
      targetPrice: Number(price),
    });

    setSymbol("");
    setPrice("");
    loadAlerts();
  };

  /* Delete Alert */
  const handleDelete = async (id) => {
    await api.delete(`/api/alerts/${id}`);
    loadAlerts();
  };

  return (
    <div className="summary-card">
      <div className="title">Price Alerts</div>

      {/* Create */}
      <div className="alert-form">
        <input
          placeholder="Symbol (INFY)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="ABOVE">Above</option>
          <option value="BELOW">Below</option>
        </select>

        <input
          placeholder="Target Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={handleCreate}>Add</button>
      </div>

      {/* List */}
      <ul className="alerts-list">
        {alerts.map((a) => (
          <li key={a._id}>
            {a.symbol} {a.condition} ₹{a.targetPrice}
            <button onClick={() => handleDelete(a._id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceAlerts;
