import React from "react";

function Hero() {
  return (
    <section className="landing-section">
      <div className="landing-inner text-center">
        <h1 style={{ fontSize: "40px", fontWeight: 600 }}>Technology</h1>
        <p className="text-muted" style={{ fontSize: "18px", marginTop: "14px" }}>
          Sleek, modern, and intuitive trading platforms
        </p>
        <p style={{ marginTop: "10px" }}>
          Check out our{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            investment offerings <i className="fa fa-long-arrow-right" />
          </a>
        </p>
      </div>
    </section>
  );
}

export default Hero;
