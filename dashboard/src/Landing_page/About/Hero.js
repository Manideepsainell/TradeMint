import React from "react";
import "./Hero.css";
import { FaShieldAlt, FaChartLine, FaCalculator, FaBrain } from "react-icons/fa";

function Hero() {
  return (
    <section className="about-hero-section">
      <div className="about-hero-inner">

        {/* 🔹 Heading */}
        <div className="about-heading">
          <h1>
            TradeMint explores how modern trading platforms are built — from
            real-time execution to portfolio intelligence.
          </h1>

          <p className="about-subtitle">
            A full-stack fintech engineering project inspired by real brokerage systems.
          </p>
        </div>

        {/* 🔹 Highlight Badges */}
       {/* 🔹 Highlight Badges */}
<div className="about-highlights">
  <div className="about-highlight">
    <FaShieldAlt /> Secure Authentication
  </div>
  <div className="about-highlight">
    <FaChartLine /> Live Market Data
  </div>
  <div className="about-highlight">
    <FaCalculator /> Brokerage-Aware P&L
  </div>
  <div className="about-highlight">
    <FaBrain /> Portfolio Intelligence
  </div>
</div>


        {/* 🔹 Content Grid */}
        <div className="about-grid">
          <div>
            <p>
              TradeMint was created to understand how platforms like Zerodha
              handle <strong>trade execution</strong>, <strong>authentication</strong>, and
              <strong> portfolio management</strong> at scale.
            </p>

            <p>
              The system integrates <strong>secure cookie-based JWT login</strong>,
              <strong> real-time market pricing</strong>, and <strong>live holdings & positions tracking</strong>.
            </p>

            <p>
              A core highlight is the <strong>execution engine</strong> that calculates
              <strong> net profit after brokerage and charges</strong>, not just price differences.
            </p>
          </div>

          <div>
            <p>
              TradeMint introduces <strong>smart portfolio insights</strong> such as
              exposure alerts, daily drop signals, and recent order tracking —
              bringing real fintech intelligence into the dashboard.
            </p>

            <p>
              The backend follows <strong>production-style architecture</strong> using
              routes, controllers, services, and models — designed to mirror real engineering practices.
            </p>

            <p>
              Explore the platform in the{" "}
              <a href="/login" className="about-link">TradeMint Dashboard</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
