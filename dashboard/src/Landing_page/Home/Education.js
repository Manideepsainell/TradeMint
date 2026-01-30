import React from "react";
import './Education.css'

function Education() {
  return (
    <section className="landing-section education-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">

          {/* 🖼 Illustration */}
          <div className="col-md-6 text-center">
            <img
              src="/media/platform/Holdings.png"
              alt="TradeMint Portfolio Insights"
              className="img-fluid education-img"
            />
          </div>

          {/* 📝 Content */}
          <div className="col-md-6">
            <h1 className="mb-3 fs-3 fw-bold">
              Portfolio Intelligence & Execution Transparency
            </h1>

            <p className="mt-4 text-muted">
              TradeMint provides detailed visibility into portfolio performance,
              trade execution history, and brokerage-aware profit calculations —
              enabling users to track financial outcomes with precision.
            </p>

            <a href="/dashboard/holdings" className="landing-link">
              Explore Portfolio Insights
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>

            <p className="mt-5 text-muted">
              With smart exposure alerts and execution-level analytics,
              TradeMint delivers actionable insights while maintaining a clean,
              professional trading interface.
            </p>

            <a href="/dashboard" className="landing-link">
              View Trading Dashboard
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
