import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  return (
    <section className="platform-page">
      <div className="container">

        {/* ✅ Hero */}
        <div className="platform-hero">
          <h1>TradeMint Platform</h1>

          <p>
            A full-stack trading simulation platform built with execution-level
            workflows, brokerage-aware profit logic, and portfolio intelligence.
          </p>

          <Link to="/login" className="platform-btn">
            Launch Demo Dashboard →
          </Link>
        </div>

        {/* ✅ Feature Grid */}
        <div className="platform-grid">

          <div className="platform-card">
            <h3>Execution Engine</h3>
            <p>
              Place BUY/SELL orders that instantly update holdings,
              positions, and order history.
            </p>
          </div>

          <div className="platform-card">
            <h3>Brokerage & Charges System</h3>
            <p>
              Net profit reflects realistic transaction charges —
              not just price differences.
            </p>
          </div>

          <div className="platform-card">
            <h3>Portfolio Analytics</h3>
            <p>
              Interactive allocation charts, performance graphs,
              and live portfolio metrics.
            </p>
          </div>

          <div className="platform-card">
            <h3>Smart Alerts</h3>
            <p>
              Backend-driven exposure alerts and insights help users
              track portfolio risk.
            </p>
          </div>

        </div>

        {/* ✅ Architecture Preview */}
        <div className="platform-arch">
          <img
            src="/media/platform/Architecture.png"
            alt="TradeMint Architecture"
          />

          <div>
            <h2>Built with Modular MERN Architecture</h2>

            <p>
              TradeMint follows a production-style backend structure with
              separate service layers for trading logic, authentication,
              and portfolio analytics.
            </p>

            <Link to="/about" className="platform-link">
              View Full System Architecture →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Products;
