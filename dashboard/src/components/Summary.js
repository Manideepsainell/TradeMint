import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import PortfolioHero from "./PortfolioHero";
import PortfolioAlerts from "./PortfolioAlerts";
import RecentOrders from "./RecentOrders";
import PositionsSummary from "./PositionsSummary";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState(null);
  const [report, setReport] = useState({
    totalCharges: 0,
    totalNetProfit: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     FETCH DASHBOARD DATA
  ============================================================ */

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [holdingsRes, fundsRes, reportRes] = await Promise.all([
          api.get("/api/user/holdings"),
          api.get("/api/user/funds"),
          api.get("/api/user/report/charges"),
        ]);

        setHoldings(holdingsRes.data?.data || []);
        setFunds(fundsRes.data?.data || null);
        setReport(reportRes.data?.data || {});
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setError("Unable to load dashboard data. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* ============================================================
     PORTFOLIO METRICS
  ============================================================ */

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
      count: holdings.length,
      investment,
      currentValue,
      pnl,
      percentage: investment > 0 ? (pnl / investment) * 100 : 0,
    };
  }, [holdings]);

  /* ============================================================
     UI STATES
  ============================================================ */

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

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="summary-container">
      {/* ✅ Professional Header */}
      <div className="summary-header">
        <h2>Portfolio Overview</h2>
        <p>Track your holdings, funds, positions and recent trades.</p>
      </div>

      {/* ✅ Hero Portfolio Card */}
      <PortfolioHero holdings={holdings} report={report} />

      {/* ✅ Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Equity Card */}
        <div className="summary-card">
          <div className="title">Equity</div>

          <div className="data">
            <div>
              <p>Margin available</p>
              <p className="imp colored">
                ₹{Number(funds?.availableMargin || 0).toFixed(2)}
              </p>
            </div>

            <div>
              <p>Margin used</p>
              <p className="imp">
                ₹{Number(funds?.usedMargin || 0).toFixed(2)}
              </p>
            </div>

            <div>
              <p>Opening balance</p>
              <p className="imp">
                ₹{Number(funds?.openingBalance || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Holdings Card */}
        <div className="summary-card">
          <div className="title">Holdings ({portfolio.count})</div>

          <div className="data">
            <div>
              <p>Total P&amp;L</p>
              <p className={`imp ${portfolio.pnl >= 0 ? "profit" : "loss"}`}>
                ₹{portfolio.pnl.toFixed(2)}
                <span className="small-text">
                  ({portfolio.pnl >= 0 ? "+" : ""}
                  {portfolio.percentage.toFixed(2)}%)
                </span>
              </p>
            </div>

            <div>
              <p>Current value</p>
              <p className="imp">
                ₹{portfolio.currentValue.toFixed(2)}
              </p>
            </div>

            <div>
              <p>Total investment</p>
              <p className="imp">
                ₹{portfolio.investment.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <PortfolioAlerts />

        {/* Recent Orders */}
        <RecentOrders />

        {/* Positions Summary */}
        <PositionsSummary />
      </div>
    </div>
  );
};

export default Summary;
