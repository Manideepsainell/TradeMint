import React, { useEffect, useState } from "react";
import api from "../api/axios";

const PortfolioAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     FETCH ALERTS
  ============================================================ */

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/user/insights");

        setAlerts(res.data?.data?.alerts || []);
      } catch (err) {
        console.error("Alerts Fetch Error:", err);
        setError("Unable to load alerts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return (
      <div className="summary-card alerts-card">
        <div className="title">Smart Alerts</div>
        <p className="empty-note">Loading alerts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-card alerts-card">
        <div className="title">Smart Alerts</div>
        <p className="empty-note">{error}</p>
      </div>
    );
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="summary-card alerts-card">
      <div className="title">Smart Alerts</div>

      {alerts.length === 0 ? (
        <p className="empty-note">No alerts triggered yet ⚡</p>
      ) : (
        <ul className="alerts-list">
          {alerts.map((msg) => (
            <li key={msg.slice(0, 25)}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioAlerts;
