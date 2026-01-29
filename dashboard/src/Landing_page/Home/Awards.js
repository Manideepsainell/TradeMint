import React from "react";
import './Awards.css';
function Awards() {
  return (
    <section className="landing-section awards-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* ✅ Left Illustration */}
          <div className="col-md-6 text-center">
            <img
              src="/media/images/largestBroker.svg"
              alt="TradeMint Dashboard"
              className="img-fluid awards-hero-img"
            />
          </div>

          {/* ✅ Right Content */}
          <div className="col-md-6">
            <h1 className="fs-2 fw-bold">
              TradeMint — A Modern Trading Platform
            </h1>

            <p className="mt-3 text-muted">
              TradeMint is a full-stack stock trading dashboard built with the
              MERN stack. It delivers real brokerage-style workflows with secure
              authentication, live pricing, and portfolio analytics.
            </p>

            {/* ✅ Feature Grid */}
            <div className="row mt-4">
              <div className="col-6">
                <ul className="ps-3 feature-list">
                  <li className="mb-2">Buy & Sell Execution Engine</li>
                  <li className="mb-2">Holdings & Positions Tracking</li>
                  <li className="mb-2">Real-Time Portfolio P&L</li>
                </ul>
              </div>

              <div className="col-6">
                <ul className="ps-3 feature-list">
                  <li className="mb-2">Brokerage-Aware Net Profit</li>
                  <li className="mb-2">Smart Portfolio Alerts</li>
                  <li className="mb-2">Production-Style Backend APIs</li>
                </ul>
              </div>
            </div>

            {/* ✅ Branding Note */}
            <div className="mt-4 project-note">
              <p className="small text-muted mb-0">
                Designed as an internship-ready fintech engineering project —
                inspired by platforms like Zerodha, but developed end-to-end as
                TradeMint.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
