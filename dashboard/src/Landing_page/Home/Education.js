import React from "react";
import './Education.css'
function Education() {
  return (
    <section className="landing-section education-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* ✅ Illustration */}
          <div className="col-md-6 text-center">
            <img
              src="/media/images/education.svg"
              alt="TradeMint Insights"
              className="img-fluid education-img"
            />
          </div>

          {/* ✅ Content */}
          <div className="col-md-6">
            <h1 className="mb-3 fs-3 fw-bold">
              Built for Transparency & Portfolio Learning
            </h1>

            <p className="mt-4 text-muted">
              TradeMint helps users understand real trading workflows through a
              clean dashboard experience — including portfolio tracking, order
              history, and brokerage-aware profit calculations.
            </p>

            {/* ✅ Link Style CTA */}
            <a href="#" className="landing-link">
              Explore Portfolio Insights{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>

            <p className="mt-5 text-muted">
              With smart alerts and execution-level analytics, TradeMint focuses
              on building practical understanding of markets while keeping the
              experience professional and minimal.
            </p>

            <a href="#" className="landing-link">
              View Trading Dashboard{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
