import React from "react";
import './Stats.css'
function Stats() {
  return (
    <section className="landing-section stats-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* ✅ Left Content */}
          <div className="col-md-6">
            <h2 className="fs-2 mb-4 fw-bold">
              Built with Production-Style Architecture
            </h2>

            <h3 className="fs-5">Secure authentication</h3>
            <p className="text-muted">
              TradeMint uses cookie-based JWT authentication with protected routes
              and session restoration, following real-world backend practices.
            </p>

            <h3 className="fs-5 mt-4">Execution-level trading workflows</h3>
            <p className="text-muted">
              Users can place buy/sell orders, track holdings and positions, and
              view portfolio profit/loss updates dynamically through backend APIs.
            </p>

            <h3 className="fs-5 mt-4">Brokerage-aware profit calculations</h3>
            <p className="text-muted">
              Unlike basic dashboards, TradeMint computes net profit after
              transaction charges, making portfolio returns more realistic.
            </p>

            <h3 className="fs-5 mt-4">Smart insights & alerts</h3>
            <p className="text-muted">
              The platform provides portfolio-level insights such as exposure
              alerts, daily drops, and recent trading activity for better
              decision-making.
            </p>
          </div>

          {/* ✅ Right Illustration */}
          <div className="col-md-6 text-center">
            <img
              src="/media/images/ecosystem.png"
              alt="TradeMint Dashboard Preview"
              className="img-fluid stats-image"
            />

            {/* ✅ CTA Links */}
            <div className="mt-4 d-flex justify-content-center gap-4 flex-wrap">
              <a href="#features" className="landing-link">
                View Platform Features{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>

              <a href="/login" className="landing-link">
                Launch Dashboard{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
