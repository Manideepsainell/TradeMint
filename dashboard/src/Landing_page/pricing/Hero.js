import React from "react";
import "./ChargesTable.css";
function Hero() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        {/* ✅ Header */}
        <div className="text-center" style={{ padding: "30px 0 50px" }}>
          <h1 style={{ fontSize: "44px", fontWeight: 800 }}>
            Trade Cost Transparency
          </h1>

          <p className="text-muted" style={{ fontSize: "18px" }}>
            How TradeMint calculates brokerage and net profit after charges
          </p>
        </div>

        {/* ✅ Feature Cards */}
        <div className="pricing-hero-grid">
          {/* Card 1 */}
          <div className="pricing-hero-card">
            <h2>Execution-Level Charges</h2>
            <p>
              TradeMint applies realistic brokerage components such as STT,
              exchange fees, GST, and SEBI charges to compute net trading profit.
            </p>
          </div>

          {/* Card 2 */}
          <div className="pricing-hero-card">
            <h2>Net Profit After Brokerage</h2>
            <p>
              Unlike basic dashboards, TradeMint shows profit after deducting
              transaction costs — giving a more accurate portfolio view.
            </p>
          </div>

          {/* Card 3 */}
          <div className="pricing-hero-card">
            <h2>Full Charges Breakdown</h2>
            <p>
              Every SELL order can include a breakdown of charges paid and the
              final realized net return, similar to real trading platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
