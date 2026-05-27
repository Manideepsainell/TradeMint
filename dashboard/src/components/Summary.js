import React, { useEffect,useState } from "react";
import api from "../api/axios";

import PortfolioHero from "./PortfolioHero";
import RecentOrders from "./RecentOrders";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdWarningAmber } from "react-icons/md";

const Summary = () => {
const [performance, setPerformance] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [performanceRes, riskRes] = await Promise.all([
  api.get("/api/performance"),
  api.get("/api/risk-alerts"),
]);
        setPerformance(performanceRes.data?.data || null);
        setRiskAlerts(riskRes.data?.alerts || []);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError("Unable to load dashboard data. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="route-loading">
        Loading your TradeMint dashboard...
      </div>
    );
  }

  if (error) {
    return <div className="route-loading">{error}</div>;
  }

  return (
    <>
      <div className="summary-header">
        <h2>Portfolio Overview</h2>
      </div>

      <PortfolioHero
  performance={performance}
/>
      {riskAlerts.length > 0 && (
        <div className="risk-banner-wrapper">
          {riskAlerts.map((alert, index) => (
            <div key={index} className={`risk-banner ${alert.severity}`}>
              <div className="risk-icon">
                {alert.severity === "high" ? (
                  <FaExclamationTriangle />
                ) : (
                  <MdWarningAmber />
                )}
              </div>

              <div className="risk-content">
                <div className="risk-title">
                  {alert.type === "HIGH_EXPOSURE"
                    ? "High Stock Concentration Risk"
                    : alert.type === "SECTOR_CONCENTRATION"
                    ? "Sector Concentration Warning"
                    : "Low Diversification Warning"}
                </div>

                <div className="risk-message">{alert.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="dashboard-grid">
        <RecentOrders />
      </div>
    </>
  );
};

export default Summary;