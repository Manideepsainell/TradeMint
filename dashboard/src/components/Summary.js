import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import PortfolioHero from "./PortfolioHero";
import PortfolioAlerts from "./PortfolioAlerts";
import RecentOrders from "./RecentOrders";
import PositionsSummary from "./PositionsSummary";
import PriceAlerts from "./PriceAlerts";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState(null);
  const [report, setReport] = useState({
    totalCharges: 0,
    totalNetProfit: 0,
  });

  const [loading, setLoading] = useState(true);

  /* ============================================================
     FETCH DASHBOARD DATA
  ============================================================ */

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
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
      percentage:
        investment > 0 ? ((pnl / investment) * 100).toFixed(2) : 0,
    };
  }, [holdings]);

  /* ============================================================
     LOADING STATE
  ============================================================ */

  if (loading) {
    return (
      <div className="route-loading">
        Loading your TradeMint dashboard...
      </div>
    );
  }

  /* ============================================================
     UI RENDER
  ============================================================ */

  return (
    <div className="summary-container">
      {/* Header */}
      <div className="summary-header">
        <h2>Hi bro 👋</h2>
        <p>Here’s your portfolio overview.</p>
      </div>

      {/* Hero Card */}
      <PortfolioHero holdings={holdings} report={report} />

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Equity Card */}
        <div className="summary-card">
          <div className="title">Equity</div>

          <div className="data">
            <div>
              <p>Margin available</p>
              <p className="imp colored">
                ₹{funds?.availableMargin?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div>
              <p>Margin used</p>
              <p className="imp">
                ₹{funds?.usedMargin?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div>
              <p>Opening balance</p>
              <p className="imp">
                ₹{funds?.openingBalance?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        </div>

        {/* Holdings Card */}
        <div className="summary-card">
          <div className="title">Holdings ({portfolio.count})</div>

          <div className="data">
            <div>
              <p>Total P&L</p>
              <p className={`imp ${portfolio.pnl >= 0 ? "profit" : "loss"}`}>
                ₹{portfolio.pnl.toFixed(2)}
                <span className="small-text">
                  ({portfolio.pnl >= 0 ? "+" : ""}
                  {portfolio.percentage}%)
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
