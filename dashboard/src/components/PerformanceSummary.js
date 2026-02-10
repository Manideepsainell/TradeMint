

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/performanceSummary.css";
console.log("PerformanceSummary mounted");

const PerformanceSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPerformance = async () => {
    try {
      console.log("Calling performance API...");
      const res = await api.get("/api/performance");
      console.log("Performance API response:", res.data);
      setData(res.data?.data || null);
    } catch (err) {
      console.error("Performance fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPerformance();
}, []);

  if (loading) return <div className="perf-card">Loading performance...</div>;
  if (!data) return null;

  const {
    totalInvested,
    currentValue,
    totalReturn,
    returnPercent,
    realizedProfit,
    unrealizedProfit,
    chargesPaid,
  } = data;

  return (
    <div className="perf-card">
      <div className="perf-header">
        <h3>Portfolio Performance</h3>
        <span className={`perf-badge ${returnPercent >= 0 ? "up" : "down"}`}>
          {returnPercent.toFixed(2)}%
        </span>
      </div>

      <p className="perf-gain">
        {totalReturn >= 0 ? "+" : ""}
        ₹{totalReturn.toFixed(2)} Total Gain
      </p>

      <div className="perf-grid">
        <div>
          <label>Invested</label>
          <p>₹{totalInvested.toFixed(2)}</p>
        </div>

        <div>
          <label>Current Value</label>
          <p>₹{currentValue.toFixed(2)}</p>
        </div>

        <div>
          <label>Realized</label>
          <p className={realizedProfit >= 0 ? "profit" : "loss"}>
            ₹{realizedProfit.toFixed(2)}
          </p>
        </div>

        <div>
          <label>Unrealized</label>
          <p className={unrealizedProfit >= 0 ? "profit" : "loss"}>
            ₹{unrealizedProfit.toFixed(2)}
          </p>
        </div>

        <div>
          <label>Charges</label>
          <p className="loss">₹{chargesPaid.toFixed(2)}</p>
        </div>
      </div>
    </div>
    
  );
};



export default PerformanceSummary;
