import React, { useMemo } from "react";

const PortfolioHero = ({ holdings = [], report = {} }) => {
  /* ============================================================
     HELPERS
  ============================================================ */

  const formatMoney = (value) => Number(value || 0).toFixed(2);

  /* ============================================================
     METRICS
  ============================================================ */

  const metrics = useMemo(() => {
    const investment = holdings.reduce(
      (acc, stock) => acc + stock.qty * stock.avg,
      0
    );

    const currentValue = holdings.reduce(
      (acc, stock) => acc + stock.qty * stock.price,
      0
    );

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

  const netProfit = report?.totalNetProfit || 0;
  const charges = report?.totalCharges || 0;

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="portfolio-hero">
      {/* Total Portfolio Value */}
      <div>
        <p className="hero-label">Total Portfolio Value</p>

        <h1 className="hero-value">
          ₹{formatMoney(metrics.currentValue)}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="hero-stats">
        {/* Investment */}
        <div>
          <p>Investment</p>
          <h3>₹{formatMoney(metrics.investment)}</h3>
        </div>

        {/* Gross P&L */}
        <div>
          <p>Gross P&amp;L</p>
          <h3 className={metrics.grossPnl >= 0 ? "profit" : "loss"}>
            ₹{formatMoney(metrics.grossPnl)}
          </h3>
        </div>

        {/* Return */}
        <div>
          <p>Return</p>
          <h3 className={metrics.grossPnl >= 0 ? "profit" : "loss"}>
            {metrics.returnPercent >= 0 ? "+" : ""}
            {metrics.returnPercent.toFixed(2)}%
          </h3>
        </div>

        {/* Charges */}
        <div>
          <p>Charges Paid</p>
          <h3>₹{formatMoney(charges)}</h3>
        </div>

        {/* Net Profit */}
        <div>
          <p>Net Profit</p>
          <h3 className={netProfit >= 0 ? "profit" : "loss"}>
            ₹{formatMoney(netProfit)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;
