import React, { useMemo } from "react";

const PortfolioHero = ({ holdings = [], report = {} ,health}) => {
  /* ============================================================
     HELPERS
  ============================================================ */

  const formatMoney = (value) =>
    `₹${Number(value || 0).toFixed(2)}`;

  /* ============================================================
     PORTFOLIO METRICS (Single Loop Optimized)
  ============================================================ */

  const metrics = useMemo(() => {
    let investment = 0;
    let currentValue = 0;

    holdings.forEach((stock) => {
      const qty = Number(stock.qty || 0);
      const avg = Number(stock.avg || 0);
      const price = Number(stock.price || 0);

      investment += qty * avg;
      currentValue += qty * price;
    });

    const grossPnl = currentValue - investment;
    const returnPercent =
      investment > 0 ? (grossPnl / investment) * 100 : 0;

    return {
      investment,
      currentValue,
      grossPnl,
      returnPercent,
    };
  }, [holdings]);

  const getHealthColor = (score) => {
  if (score >= 70) return "good";
  if (score >= 40) return "average";
  return "poor";
};


  /* ============================================================
     REPORT METRICS
  ============================================================ */

  const totalCharges = Number(report?.totalCharges || 0);
  const netProfit = Number(report?.totalNetProfit || 0);

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="portfolio-hero">
      {/* ✅ Total Portfolio Value */}
      <div>
        <p className="hero-label">Total Portfolio Value</p>

        <h1 className="hero-value">
          {formatMoney(metrics.currentValue)}
        </h1>
      </div>




      {/* ✅ Stats Grid */}
      <div className="hero-stats">
        {/* Investment */}
        <div>
          <p>Investment</p>
          <h3>{formatMoney(metrics.investment)}</h3>
        </div>

        {/* Gross P&L */}
        <div>
          <p>Gross P&amp;L</p>
          <h3 className={metrics.grossPnl >= 0 ? "profit" : "loss"}>
            {formatMoney(metrics.grossPnl)}
          </h3>
        </div>

        {/* Return Percentage */}
        <div>
          <p>Return</p>
          <h3 className={metrics.grossPnl >= 0 ? "profit" : "loss"}>
            {metrics.returnPercent >= 0 ? "+" : ""}
            {metrics.returnPercent.toFixed(2)}%
          </h3>
        </div>

       {/* Health Score */}
{health && (
  <div className="stat-block health-block">
    <p className="stat-label">Health</p>
    <div className={`health-score-inline ${getHealthColor(health.score)}`}>
      {health.score}
    </div>
    <p className="health-status">
      {health.score >= 70
        ? "Well Diversified"
        : health.score >= 40
        ? "Moderate Risk"
        : "High Risk"}
    </p>
  </div>
)}

{/* Charges Paid */}
<div className="stat-block">
  <p className="stat-label">Charges Paid</p>
  <h3 className="stat-value">{formatMoney(totalCharges)}</h3>
</div>


        {/* Net Profit */}
        <div>
          <p>Net Profit</p>
          <h3 className={netProfit >= 0 ? "profit" : "loss"}>
            {formatMoney(netProfit)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;
