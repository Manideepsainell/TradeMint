import React from "react";
import { Link } from "react-router-dom";
import { Zap, Calculator, BellRing } from "lucide-react";
import "./Pricing.css";

function Pricing() {
  const features = [
    {
      icon: <Zap size={26} />,
      title: "Real Buy/Sell",
      desc: "Execution Engine",
    },
    {
      icon: <Calculator size={26} />,
      title: "Brokerage-Aware",
      desc: "Net Profit Analytics",
    },
    {
      icon: <BellRing size={26} />,
      title: "Smart Alerts",
      desc: "Portfolio Insights",
    },
  ];

  return (
    <section className="pricing-section" id="features">
      <div className="pricing-container">
        {/* ✅ Left Content */}
        <div className="pricing-left">
          <h2 className="pricing-title">
            Built with <span>Real Trading Logic</span>
          </h2>

          <p className="pricing-subtitle">
            TradeMint focuses on execution-level accuracy — portfolio tracking,
            brokerage-aware profits, and production-style backend APIs inspired
            by real trading platforms.
          </p>

          <Link to="/login" className="pricing-link">
            Launch Dashboard →
          </Link>
        </div>

        {/* ✅ Right Feature Cards */}
        <div className="pricing-features">
          {features.map((f, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
