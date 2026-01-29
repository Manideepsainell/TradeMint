import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'
function Hero() {
  return (
    <section className="landing-section hero-section py-5">
      <div className="container text-center">
        {/* ✅ Hero Image */}
        <img
          src="/media/images/homeHero.png"
          alt="TradeMint Platform"
          className="img-fluid hero-image"
        />

        {/* ✅ Main Heading */}
        <h1 className="mt-5 hero-title">
          TradeMint — Trading & Portfolio Intelligence
        </h1>

        {/* ✅ Subtitle */}
        <p className="hero-subtitle">
          A modern full-stack trading platform with live market data, secure
          execution workflows, brokerage-aware net profit, and smart portfolio
          insights.
        </p>

        {/* ✅ CTA Buttons */}
        <div className="hero-cta">
          <Link to="/login" className="btn hero-btn-primary">
            Launch Dashboard
          </Link>

          <a href="#features" className="btn hero-btn-secondary">
            View Features
          </a>
        </div>

        {/* ✅ Small Recruiter Note */}
        <p className="hero-note">
          Built as a production-style MERN fintech project.
        </p>
      </div>
    </section>
  );
}

export default Hero;
