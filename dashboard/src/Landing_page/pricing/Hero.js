import React from "react";

function Hero() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="text-center" style={{ padding: "30px 0 50px" }}>
          <h1 style={{ fontSize: "44px", fontWeight: 700 }}>Charges</h1>
          <p className="text-muted" style={{ fontSize: "18px" }}>
            List of all charges and taxes
          </p>
        </div>

        <div className="pricing-hero-grid">
          <div className="pricing-hero-card">
            <img src="/media/images/pricingEquity.svg" alt="equity" />
            <h2>Free equity delivery</h2>
            <p>
              All equity delivery investments (NSE, BSE) are absolutely free —
              ₹0 brokerage.
            </p>
          </div>

          <div className="pricing-hero-card">
            <img src="/media/images/intradayTrades.svg" alt="intraday" />
            <h2>Intraday and F&amp;O trades</h2>
            <p>
              Flat ₹20 or 0.03% (whichever is lower) per executed order on
              intraday trades across equity, currency, and commodity trades.
              Flat ₹20 on all option trades.
            </p>
          </div>

          <div className="pricing-hero-card">
            <img src="/media/images/pricingEquity.svg" alt="mf" />
            <h2>Free direct MF</h2>
            <p>
              All direct mutual fund investments are absolutely free — ₹0
              commissions &amp; DP charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
