import React from "react";
import './Hero.css'
function Hero() {
  return (
    <section className="support-hero">
      <div className="support-hero-inner">
        {/* Top Row */}
        <div className="support-hero-top">
          <p className="support-title">TradeMint Help Center</p>

          <a href="/dashboard" className="support-ticket-btn">
            Go to Dashboard
          </a>
        </div>

        {/* Search */}
        <div className="support-search">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>

          <input
            type="text"
            placeholder="Search: Orders, Holdings, Brokerage Charges, Alerts..."
          />
        </div>

        {/* Small Note */}
        <p className="support-note">
          Browse platform modules and learn how TradeMint works internally.
        </p>
      </div>
    </section>
  );
}

export default Hero;
