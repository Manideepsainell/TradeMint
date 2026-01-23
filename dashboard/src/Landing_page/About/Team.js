import React from "react";

function Team() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <h1 style={{ textAlign: "center", marginBottom: "50px" }}>People</h1>

        <div className="team-grid" style={{ borderTop: "1px solid #eee", paddingTop: "60px" }}>
          <div className="team-left">
            <img
              src="/media/images/nithinKamath.jpg"
              alt="Nithin"
              className="team-img"
            />
            <h2 style={{ marginTop: "25px" }}>Nithin Kamath</h2>
            <p style={{ marginTop: "6px", fontWeight: 600 }}>Founder, CEO</p>
          </div>

          <div className="team-right">
            <p>
              Nithin bootstrapped and founded Zerodha in 2010 to overcome hurdles
              he faced during his decade long stint as a trader.
            </p>
            <p>
              He is a member of the SEBI Secondary Market Advisory Committee
              (SMAC) and the Market Data Advisory Committee (MDAC).
            </p>
            <p>Playing basketball is his zen.</p>
            <p>
              Connect on{" "}
              <a href="#" className="text-primary text-decoration-none">
                Homepage
              </a>{" "}
              /{" "}
              <a href="#" className="text-primary text-decoration-none">
                TradingQnA
              </a>{" "}
              /{" "}
              <a href="#" className="text-primary text-decoration-none">
                Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
