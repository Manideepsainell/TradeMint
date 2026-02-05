import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="support-hero">
      <div className="support-hero-inner">
        {/* Top Row */}
        <div className="support-hero-top">
          <div>
            <h1 className="support-title">TradeMint Help Center</h1>
            <p className="support-subtitle">
              Learn how the platform works — from trading execution to portfolio analytics.
            </p>
          </div>

          <Link to="/dashboard" className="support-dashboard-btn">
            Open Dashboard →
          </Link>
        </div>

        {/* Search */}
        <div className="support-search">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Search modules: Orders, Holdings, Charges, Alerts..."
          />
        </div>

        {/* Note */}
        <p className="support-note">
          TradeMint is a production-style MERN fintech simulation platform.
        </p>
      </div>
    </section>
  );
}

export default Hero;
