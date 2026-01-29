import React, { useEffect, useState } from "react";
import api from "../api/axios";

const PortfolioAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  /* ============================================================
     FETCH ALERTS
  ============================================================ */

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/api/user/insights");
        setAlerts(res.data?.data?.alerts || []);
      } catch (err) {
        console.error("Alerts Fetch Error:", err);
      }
    };

    fetchAlerts();
  }, []);

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="summary-card alerts-card">
      <div className="title">Smart Alerts</div>

      {alerts.length === 0 ? (
        <p className="empty-note">No alerts right now ⚡</p>
      ) : (
        <ul className="alerts-list">
          {alerts.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioAlerts;
