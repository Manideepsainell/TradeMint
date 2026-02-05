import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* ✅ Dashboard Preview */}
        <div className="hero-preview">
          <img
            src="/media/platform/Dashboard.png"
            alt="TradeMint Trading Dashboard"
            className="hero-image"
          />
        </div>

        {/* ✅ Heading */}
        <h1 className="hero-title">
          Trading Infrastructure{" "}
          <span>Built for Portfolio Intelligence</span>
        </h1>

        {/* ✅ Subtitle */}
        <p className="hero-subtitle">
          TradeMint is a production-style full-stack trading simulation platform
          featuring secure execution workflows, live tracking, brokerage-aware
          analytics, and intelligent portfolio insights.
        </p>

        {/* ✅ CTAs */}
        <div className="hero-actions">
          <Link to="/login" className="hero-btn primary">
            Launch Dashboard →
          </Link>

          <a href="#features" className="hero-btn secondary">
            Explore Platform
          </a>
        </div>

        {/* ✅ Footer Note */}
        <p className="hero-note">
          Built as an internship-ready MERN fintech engineering project.
        </p>
      </div>
    </section>
  );
}

export default Hero;
