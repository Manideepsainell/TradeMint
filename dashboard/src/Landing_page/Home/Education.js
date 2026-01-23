import React from "react";

function Education() {
  return (
    <section className="landing-section education-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-6 text-center">
            <img
              src="/media/images/education.svg"
              alt="Education"
              className="img-fluid"
              style={{ maxWidth: "460px" }}
            />
          </div>

          <div className="col-md-6">
            <h1 className="mb-3 fs-3">Free and open market education</h1>

            <p className="mt-4 text-muted">
              Varsity, the largest online stock market education book in the
              world covering everything from the basics to advanced trading.
            </p>

            <a href="#" style={{ textDecoration: "none" }}>
              Varsity{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>

            <p className="mt-5 text-muted">
              TradingQ&A, the most active trading and investment community in
              India for all your market related queries.
            </p>

            <a href="#" style={{ textDecoration: "none" }}>
              TradingQ&A{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
