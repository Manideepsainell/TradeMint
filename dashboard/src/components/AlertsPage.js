import React from "react";
import PortfolioAlerts from "./PortfolioAlerts";
import PriceAlerts from "./PriceAlerts";

const AlertsPage = () => {
  return (
    <div className="alerts-page">
      {/* Header */}
      <div className="summary-header">
        <h2>Alerts ⚡</h2>
        <p>Manage smart insights and custom price alerts.</p>
      </div>

      {/* Grid Layout */}
      <div className="dashboard-grid">
        {/* Smart Insights */}
        <PortfolioAlerts />

        {/* Price Alerts */}
        <PriceAlerts />
      </div>
    </div>
  );
};

export default AlertsPage;
