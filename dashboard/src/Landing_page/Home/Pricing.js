import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="landing-section pricing-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Left */}
          <div className="col-lg-5">
            <h1 className="fs-3 mb-3">Unbeatable pricing</h1>

            <p className="mb-3" style={{ maxWidth: "420px" }}>
              We pioneered the concept of discount broking and price transparency
              in India. Flat fees and no hidden charges.
            </p>

            <Link to="/pricing" style={{ textDecoration: "none" }}>
              See Pricing{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>

          {/* Right */}
          <div className="col-lg-6 ms-lg-auto">
            <div className="row text-center g-4">
              <div className="col-md-4">
                <img
                  src="/media/images/pricing-eq.svg"
                  alt="Free account opening"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="mt-3">
                  Free account <br /> opening
                </p>
              </div>

              <div className="col-md-4">
                <img
                  src="/media/images/pricing-eq.svg"
                  alt="Free equity delivery"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="mt-3">
                  Free equity delivery <br />
                  and direct mutual funds
                </p>
              </div>

              <div className="col-md-4">
                <img
                  src="/media/images/other-trades.svg"
                  alt="Intraday & F&O"
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="mt-3">
                  Intraday <br /> &amp; F&amp;O
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
