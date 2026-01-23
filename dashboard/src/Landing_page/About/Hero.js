import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div style={{ textAlign: "center", paddingBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", lineHeight: "1.3" }}>
            We pioneered the discount broking model in India.
            <br />
            Now, we are breaking ground with our technology.
          </h1>
        </div>

        <div style={{ borderTop: "1px solid #eee", paddingTop: "40px" }}>
          <div className="about-grid">
            <div>
              <p>
                We kick-started operations on the 15th of August, 2010 with the
                goal of breaking all barriers that traders and investors face.
              </p>
              <p>
                Today, our disruptive pricing models and in-house technology
                have made us the biggest stock broker in India.
              </p>
              <p>
                Over 1.6+ crore clients place billions of orders every year
                through our powerful ecosystem.
              </p>
            </div>

            <div>
              <p>
                In addition, we run a number of popular open online educational
                and community initiatives to empower retail traders.
              </p>
              <p>
                <a href="#" className="text-primary text-decoration-none">
                  Rainmatter
                </a>{" "}
                has invested in several fintech startups.
              </p>
              <p>
                Catch up on the latest updates on our{" "}
                <a href="#" className="text-primary text-decoration-none">
                  blog
                </a>{" "}
                or read about our{" "}
                <a href="#" className="text-primary text-decoration-none">
                  philosophies
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
