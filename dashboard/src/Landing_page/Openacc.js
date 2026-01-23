import React from "react";
import { Link } from "react-router-dom";

function Openacc() {
  return (
    <section className="landing-section openacc-section py-5">
      <div className="container text-center">
        <h3 className="fs-3 mb-3">Open a Zerodha account</h3>

        <p className="text-muted mb-4">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&amp;O trades.
        </p>

        <Link to="/signup" className="btn btn-primary fs-5 px-4 py-2">
          Sign up for free
        </Link>
      </div>
    </section>
  );
}

export default Openacc;
