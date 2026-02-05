import React from "react";
import "./Stats.css";

function Stats() {
  const highlights = [
    {
      title: "Secure Authentication Layer",
      desc: "JWT stored in HttpOnly cookies with protected routes and session restoration.",
    },
    {
      title: "Execution-Level Trading Engine",
      desc: "Buy/Sell workflows update holdings, orders, and portfolio metrics in real-time.",
    },
    {
      title: "Brokerage-Aware Profit Logic",
      desc: "Net profit is calculated after brokerage + transaction charges, like Zerodha.",
    },
    {
      title: "Smart Insight & Alerts Service",
      desc: "Exposure alerts and portfolio monitoring powered through backend-driven APIs.",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {/* ✅ LEFT */}
          <div>
            <h2 className="stats-title">
              Engineering Highlights Behind TradeMint
            </h2>

            <p className="stats-intro">
              TradeMint is built as an internship-ready MERN fintech simulation,
              designed with clean modular architecture and real trading workflows.
            </p>

            <div className="stats-list">
              {highlights.map((item, idx) => (
                <div key={idx} className="stats-feature">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ RIGHT */}
          <div className="stats-diagram">
            <div className="diagram-card">
              <img
                src="/media/platform/SysArch.png"
                alt="TradeMint Backend Architecture"
                className="diagram-img"
              />
            </div>

            <div className="stats-actions">
              <a href="#features" className="stats-link">
                View Platform Features →
              </a>

              <a href="/login" className="stats-link">
                Launch Dashboard →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
