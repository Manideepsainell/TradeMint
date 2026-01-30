import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'

function Hero() {
  return (
    <section className="landing-section hero-section">
      <div className="container text-center">

        {/* Platform Preview */}
        <img
          src="/media/platform/dashboard.png"
          alt="TradeMint Trading Dashboard"
          className="img-fluid hero-image"
        />

        {/* Main Heading */}
        <h1 className="hero-title">
          Trading Infrastructure <span>Built for Portfolio Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          TradeMint is a production-style full-stack trading platform featuring
          secure execution workflows, live market tracking, brokerage-aware
          profit analytics, and intelligent portfolio insights.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <Link to="/login" className="btn hero-btn-primary">
            Launch Dashboard
          </Link>

          <a href="#features" className="btn hero-btn-secondary">
            Explore Platform
          </a>
        </div>

        {/* Recruiter Note */}
        <p className="hero-note">
          Built as an internship-ready MERN fintech engineering project.
        </p>
      </div>
    </section>
  );
}

export default Hero;
