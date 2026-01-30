import React from "react";
import { Link } from "react-router-dom";
import { Zap, Calculator, BellRing } from "lucide-react";
import "./Pricing.css";

function Pricing() {
  return (
    <section className="landing-section pricing-section py-5" id="features">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Left Content */}
          <div className="col-lg-5">
            <h1 className="fs-3 mb-3 fw-bold">
              Built with Real Trading Logic
            </h1>

            <p className="mb-3 text-muted" style={{ maxWidth: "420px" }}>
              TradeMint focuses on execution-level accuracy — including portfolio
              tracking, brokerage-aware net profit, and production-style backend
              APIs inspired by real trading platforms.
            </p>

            <Link to="/login" className="landing-link">
              Launch Dashboard{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>

          {/* Right Feature Blocks */}
          <div className="col-lg-6 ms-lg-auto">
            <div className="row text-center g-4">
              
              {/* Feature 1 */}
              <div className="col-md-4">
                <div className="feature-icon modern-icon">
                  <Zap size={26} />
                </div>
                <p className="mt-3 fw-semibold">
                  Real Buy/Sell <br /> Execution Engine
                </p>
              </div>

              {/* Feature 2 */}
              <div className="col-md-4">
                <div className="feature-icon modern-icon">
                  <Calculator size={26} />
                </div>
                <p className="mt-3 fw-semibold">
                  Brokerage-Aware <br /> Net Profit
                </p>
              </div>

              {/* Feature 3 */}
              <div className="col-md-4">
                <div className="feature-icon modern-icon">
                  <BellRing size={26} />
                </div>
                <p className="mt-3 fw-semibold">
                  Smart Alerts <br /> & Portfolio Insights
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
