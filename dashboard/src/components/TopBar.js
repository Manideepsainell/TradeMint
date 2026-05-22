import React from "react";
import "../styles/topbar.css";

const TopBar = () => {
  const isMarketOpen = false;

  return (
    <header className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="topbar-index-box">
          <p className="topbar-index-title">NIFTY 50</p>
          <p className="topbar-index-price">25,293</p>
          <p className="topbar-index-change up">+0.32%</p>
        </div>

        <div className="topbar-index-box">
          <p className="topbar-index-title">SENSEX</p>
          <p className="topbar-index-price">71,583</p>
          <p className="topbar-index-change down">-0.18%</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="topbar-center">
        <p className="topbar-greet">
          Good Evening, <span>Nikhil</span> 👋
        </p>

        <p className="topbar-subline">
          Thu, 21 May • Market{" "}
          <span className={isMarketOpen ? "market-open" : "market-closed"}>
            {isMarketOpen ? "Open" : "Closed"}
          </span>
        </p>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <button className="theme-toggle">
          <span className="toggle-icon">🌙</span>
        </button>

        <button className="logout-btn">Logout</button>
      </div>
    </header>
  );
};

export default TopBar;