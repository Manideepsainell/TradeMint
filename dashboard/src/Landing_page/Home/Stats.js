import React from "react";
import './Stats.css'

function Stats() {
  return (
    <section className="landing-section stats-section">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT — SYSTEM DETAILS */}
          <div className="col-md-6">
            <h2 className="stats-title">
             TradeMint — End-to-End System Architecture
            </h2>

            <p className="stats-intro">
              Built using a modular MERN stack architecture, TradeMint separates
              frontend experience, backend services, and data persistence to
              simulate real-world trading infrastructure.
            </p>

            <div className="stats-feature">
              <h3>Secure Authentication Layer</h3>
              <p>
                Cookie-based JWT authentication with protected routes and session
                restoration ensures secure access control similar to production systems.
              </p>
            </div>

            <div className="stats-feature">
              <h3>Execution-Level Trading Engine</h3>
              <p>
                Buy/sell order processing, holdings management, and portfolio P&L
                updates are handled through structured backend services and APIs.
              </p>
            </div>

            <div className="stats-feature">
              <h3>Brokerage-Aware Profit Logic</h3>
              <p>
                TradeMint calculates net profit after brokerage and transaction
                costs, bringing realism to simulated trading outcomes.
              </p>
            </div>

            <div className="stats-feature">
              <h3>Insight & Alert Services</h3>
              <p>
                Backend-driven portfolio insights and alerts monitor exposure,
                price drops, and recent activity for better decision support.
              </p>
            </div>
          </div>

          {/* RIGHT — ARCHITECTURE DIAGRAM */}
          <div className="col-md-6 text-center">
            <div className="architecture-diagram-card">
              <img
                src="/media/platform/SysArch.png"
                alt="TradeMint System Architecture Diagram"
                className="img-fluid stats-image"
              />
            </div>

            <div className="stats-cta">
              <a href="#features" className="landing-link">
                View Platform Features
                <i className="fa fa-long-arrow-right" />
              </a>

              <a href="/login" className="landing-link">
                Launch Dashboard
                <i className="fa fa-long-arrow-right" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Stats;
