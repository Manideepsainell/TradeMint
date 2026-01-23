import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="landing-section hero-section py-5">
      <div className="container text-center">
        <img
          src="/media/images/homeHero.png"
          alt="Hero"
          className="img-fluid"
        />

        <h3 className="mt-5 fs-2">Invest in everything</h3>

        <p className="fs-5 mb-4">
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>

        {/* ✅ responsive CTA */}
        <Link to="/signup" className="btn btn-primary fs-5 px-4 py-2">
          Sign Up for free
        </Link>
      </div>
    </section>
  );
}

export default Hero;
