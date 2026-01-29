import React from "react";
import './Hero.css'
function Hero() {
  return (
    <section className="landing-section">
      <div className="landing-inner text-center">
       <h1 className="tech-hero-title">

          TradeMint Technology
        </h1>

      <p className="tech-hero-subtitle">

          A production-style MERN trading platform built with scalable backend
          architecture and real execution workflows.
        </p>

     <p className="tech-hero-cta">

          Explore the{" "}
          <a href="/login" className="landing-link">
            TradeMint Dashboard{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </section>
  );
}

export default Hero;
