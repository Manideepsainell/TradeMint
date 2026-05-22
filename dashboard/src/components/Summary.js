import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import PortfolioHero from "./PortfolioHero";
import RecentOrders from "./RecentOrders";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdWarningAmber } from "react-icons/md";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [report, setReport] = useState({
    totalCharges: 0,
    totalNetProfit: 0,
  });

  const [loading, setLoading] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [holdingsRes, reportRes, riskRes] = await Promise.all([
          api.get("/api/user/holdings"),
          api.get("/api/user/report/charges"),
          api.get("/api/risk-alerts"),
        ]);

        setHoldings(holdingsRes.data?.data || []);
        setReport(reportRes.data?.data || {});
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

  const portfolio = useMemo(() => {
    const investment = holdings.reduce(
      (acc, stock) => acc + stock.qty * stock.avg,
      0
    );

    const currentValue = holdings.reduce(
      (acc, stock) => acc + stock.qty * stock.price,
      0
    );

    const pnl = currentValue - investment;

    return {
      investment,
      currentValue,
      pnl,
      percentage: investment > 0 ? (pnl / investment) * 100 : 0,
    };
  }, [holdings]);

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
        holdings={holdings}
        report={report}
        portfolio={portfolio}
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