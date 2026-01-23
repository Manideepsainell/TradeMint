import React from "react";

function Universe() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="text-center">
          <h2 className="fs-3" style={{ fontWeight: 600 }}>
            The Zerodha Universe
          </h2>
          <p className="text-muted" style={{ marginTop: "10px" }}>
            Extend your trading and investment experience even further with our partner platforms
          </p>
        </div>

        <div className="universe-grid">
          <div className="universe-card">
            <img src="/media/images/zerodhaFundhouse.png" alt="Zerodha Fund House" />
            <p>
              Our asset management venture creating simple and transparent index funds.
            </p>
          </div>

          <div className="universe-card">
            <img src="/media/images/sensibullLogo.svg" alt="Sensibull" />
            <p>
              Options trading platform that lets you create strategies and analyse positions.
            </p>
          </div>

          <div className="universe-card">
            <img src="/media/images/tijori.svg" alt="Tijori" />
            <p>
              Investment research platform offering detailed insights on stocks & sectors.
            </p>
          </div>

          <div className="universe-card">
            <img src="/media/images/streakLogo.png" alt="Streak" />
            <p>
              Systematic trading platform that allows you to backtest strategies without coding.
            </p>
          </div>

          <div className="universe-card">
            <img src="/media/images/smallcaseLogo.png" alt="Smallcase" />
            <p>
              Thematic investing platform to invest in diversified baskets of stocks.
            </p>
          </div>

          <div className="universe-card">
            <img src="/media/images/dittoLogo.png" alt="Ditto" />
            <p>
              Personalized advice on life & health insurance. No spam and no mis-selling.
            </p>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "50px" }}>
          <button className="btn btn-primary px-4 py-2 fs-5">
            Sign Up for free
          </button>
        </div>
      </div>
    </section>
  );
}

export default Universe;
