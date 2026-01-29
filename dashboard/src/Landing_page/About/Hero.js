import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="about-hero-section">
      <div className="about-hero-inner">
        {/* ✅ Heading */}
        <div className="about-heading">
          <h1>
            TradeMint was built to explore how modern trading platforms work —
            from execution to portfolio intelligence.
          </h1>

          <p className="about-subtitle">
            A full-stack fintech engineering project inspired by real-world
            brokerage workflows.
          </p>
        </div>

        {/* ✅ Content Grid */}
        <div className="about-grid">
          {/* Left Column */}
          <div>
            <p>
              TradeMint started as a project to understand how systems like
              Zerodha handle trading execution, authentication, and portfolio
              management at scale.
            </p>

            <p>
              The platform includes secure cookie-based JWT login, live market
              pricing integration, and real-time holdings and positions tracking.
            </p>

            <p>
              A key highlight is the trade execution engine that calculates net
              profit after brokerage and transaction charges — not just price
              differences.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <p>
              TradeMint also introduces smart portfolio insights such as exposure
              alerts, daily drop signals, and recent order activity — making the
              dashboard feel like a real fintech product.
            </p>

            <p>
              The project is structured with production-style backend
              architecture (routes, controllers, services, models) and is built
              to be internship-ready.
            </p>

            <p>
              Explore the platform features in the{" "}
              <a href="/login" className="about-link">
                TradeMint Dashboard
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
