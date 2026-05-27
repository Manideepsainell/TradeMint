import React from "react";

const PortfolioHero = ({ performance = {}, health }) => {
  const formatMoney = (value) =>
    `₹${Number(value || 0).toFixed(2)}`;

  const getHealthColor = (score) => {
    if (score >= 70) return "good";
    if (score >= 40) return "average";
    return "poor";
  };

  const totalInvested = Number(performance?.totalInvested || 0);
  const currentValue = Number(performance?.currentValue || 0);
  const unrealizedProfit = Number(performance?.unrealizedProfit || 0);
  const realizedProfit = Number(performance?.realizedProfit || 0);
  const totalReturn = Number(performance?.totalReturn || 0);
  const returnPercent = Number(performance?.returnPercent || 0);
  const chargesPaid = Number(performance?.chargesPaid || 0);

  return (
    <div className="portfolio-hero">
      {/* Total Portfolio Value */}
      <div>
        <p className="hero-label">Total Portfolio Value</p>
        <h1 className="hero-value">
          {formatMoney(currentValue)}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="hero-stats">
        {/* Investment */}
        <div>
          <p>Investment</p>
          <h3>{formatMoney(totalInvested)}</h3>
        </div>

        {/* Open P&L */}
        <div>
          <p>Open P&amp;L</p>
          <h3 className={unrealizedProfit >= 0 ? "profit" : "loss"}>
            {formatMoney(unrealizedProfit)}
          </h3>
        </div>

        {/* Return */}
        <div>
          <p>Return</p>
          <h3 className={totalReturn >= 0 ? "profit" : "loss"}>
            {returnPercent >= 0 ? "+" : ""}
            {returnPercent.toFixed(2)}%
          </h3>
        </div>

        {/* Health Score */}
        {health && (
          <div className="stat-block health-block">
            <p className="stat-label">Health</p>
            <div
              className={`health-score-inline ${getHealthColor(
                health.score
              )}`}
            >
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
          <h3 className="stat-value">
            {formatMoney(chargesPaid)}
          </h3>
        </div>

        {/* Closed Profit */}
        <div>
          <p>Closed Profit</p>
          <h3 className={realizedProfit >= 0 ? "profit" : "loss"}>
            {formatMoney(realizedProfit)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHero;