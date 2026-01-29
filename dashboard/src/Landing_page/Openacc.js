import React from "react";
import { Link } from "react-router-dom";
import './Openacc.js'
function Openacc() {
  return (
    <section className="landing-section openacc-section">
      <div className="landing-inner openacc-inner">
        <h3 className="openacc-title">
          Ready to Explore TradeMint?
        </h3>

        <p className="openacc-subtitle">
          Access the TradeMint trading dashboard to view holdings, place orders,
          track portfolio performance, and see brokerage-aware net profit — built
          with a production-style MERN backend.
        </p>

        <Link to="/login" className="hero-btn-primary openacc-btn">
          Launch Dashboard →
        </Link>
      </div>
    </section>
  );
}

export default Openacc;
