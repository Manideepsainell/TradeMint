import React from "react";
import Summary from "./Summary";
import PortfolioGrowthChart from "./PortfolioGrowthChart";
const Dashboard = () => {
  return (
    <div className="summary-container">
      <Summary />
     <div className="analytics-section">
      <div className="analytics-wrapper">
    <PortfolioGrowthChart />
  </div>
</div>

    </div>
  );
};

export default Dashboard;
