import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpDown,
  Calculator,
  PieChart,
  BellRing,
  Activity,
  Rocket
} from "lucide-react";
import "./Universe.css";

function Universe() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        {/* Header */}
        <div className="text-center">
          <h2 className="universe-title">
            The TradeMint Platform Ecosystem
          </h2>

          <p className="universe-subtitle">
            TradeMint combines execution, analytics, and portfolio intelligence
            into a single modern trading dashboard.
          </p>
        </div>

        {/* Grid Modules */}
        <div className="universe-grid">
          <div className="universe-card">
            <div className="universe-icon"><ArrowUpDown size={22} /></div>
            <h3>Trade Execution</h3>
            <p>
              Buy/Sell workflows with holdings updates and realistic trading behavior.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-icon"><Calculator size={22} /></div>
            <h3>Brokerage Engine</h3>
            <p>
              Net profit calculation after transaction costs — a standout fintech feature.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-icon"><PieChart size={22} /></div>
            <h3>Portfolio Analytics</h3>
            <p>
              Holdings, positions, P&L metrics, and portfolio value summaries in real time.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-icon"><BellRing size={22} /></div>
            <h3>Smart Alerts</h3>
            <p>
              Exposure warnings, daily movement insights, and activity-based notifications.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-icon"><Activity size={22} /></div>
            <h3>Live Market Data</h3>
            <p>
              Integrated real-time pricing using Yahoo Finance API with caching optimization.
            </p>
          </div>

          <div className="universe-card">
            <div className="universe-icon"><Rocket size={22} /></div>
            <h3>Future Roadmap</h3>
            <p>
              Planned features include user-defined alerts, charts, and deeper trade reports.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="universe-cta">
          <Link to="/login" className="hero-btn-primary universe-btn">
            Launch TradeMint Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Universe;
