import React from "react";
import "./Education.css";

function Education() {
  return (
    <section className="education-section">
      <div className="education-container">
        <div className="education-grid">

          {/* ✅ Left: Image Preview */}
          <div className="education-image-wrap">
            <img
              src="/media/platform/Holdings.png"
              alt="TradeMint Portfolio Insights"
              className="education-img"
            />
          </div>

          {/* ✅ Right: Content */}
          <div className="education-content">
            <h2 className="education-title">
              Portfolio Intelligence & Execution Transparency
            </h2>

            <p className="education-subtitle">
              TradeMint provides detailed visibility into portfolio performance,
              execution history, and brokerage-aware profit calculations —
              enabling users to track financial outcomes with precision.
            </p>

            {/* ✅ CTA Buttons */}
            <div className="education-actions">
              <a href="/dashboard/holdings" className="cta-btn primary">
                Explore Portfolio Insights →
              </a>

              <a href="/dashboard" className="cta-btn secondary">
                View Trading Dashboard →
              </a>
            </div>

            {/* ✅ Note */}
            <p className="education-note">
              With smart exposure alerts and execution-level analytics,
              TradeMint delivers actionable insights while maintaining a clean,
              professional trading interface.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Education;
