import React from "react";

function Stats() {
  return (
    <section className="landing-section stats-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Left */}
          <div className="col-md-6">
            <h2 className="fs-2 mb-4">Trust with confidence</h2>

            <h3 className="fs-5">Customer-first always</h3>
            <p className="text-muted">
              That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores
              of equity investments, making us India’s largest broker;
              contributing to 15% of daily retail exchange volumes in India.
            </p>

            <h3 className="fs-5 mt-4">No spam or gimmicks</h3>
            <p className="text-muted">
              No gimmicks, spam, "gamification", or annoying push notifications.
              High quality apps that you use at your pace, the way you like.
            </p>

            <h3 className="fs-5 mt-4">The Zerodha universe</h3>
            <p className="text-muted">
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your
              needs.
            </p>

            <h3 className="fs-5 mt-4">Do better with money</h3>
            <p className="text-muted">
              With initiatives like Nudge and Kill Switch, we don't just
              facilitate transactions, but actively help you do better with your
              money.
            </p>
          </div>

          {/* Right */}
          <div className="col-md-6 text-center">
            <img
              src="/media/images/ecosystem.png"
              alt="Ecosystem"
              className="img-fluid"
            />

            <div className="mt-4 d-flex justify-content-center gap-4 flex-wrap">
              <a href="#" style={{ textDecoration: "none" }}>
                Explore our products{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>

              <a href="#" style={{ textDecoration: "none" }}>
                Try Kite demo{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
