import React from "react";
import "./ChargesTable.css";

function Brokerage() {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="charges-container">
          {/* ✅ Page Header */}
          <h1 className="charges-title">
            Trade Cost & Charges Transparency
          </h1>

          <p className="charges-subtitle">
            TradeMint calculates net profit after applying brokerage and exchange
            charges — similar to real trading platforms. This module demonstrates
            how transaction costs impact returns.
          </p>

          {/* ✅ Charges Card */}
          <div className="charges-card">
            <h3>Charges Applied in TradeMint</h3>

            <ul className="charges-list">
              <li>Brokerage (capped per executed order)</li>
              <li>STT (Securities Transaction Tax)</li>
              <li>Exchange Transaction Charges</li>
              <li>GST on applicable components</li>
              <li>SEBI Charges + Stamp Duty</li>
            </ul>
          </div>

          {/* ✅ Example Breakdown */}
          <div className="charges-card mt-4">
            <h3>Example SELL Order Breakdown</h3>

            <table className="charges-table simple">
              <tbody>
                <tr>
                  <td>Sell Price</td>
                  <td>₹3500</td>
                </tr>
                <tr>
                  <td>Buy Avg Price</td>
                  <td>₹3200</td>
                </tr>
                <tr>
                  <td>Gross Profit</td>
                  <td className="profit">₹300</td>
                </tr>
                <tr>
                  <td>Total Charges</td>
                  <td className="loss">₹22</td>
                </tr>
                <tr>
                  <td><strong>Net Profit</strong></td>
                  <td className="profit">
                    <strong>₹278</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ✅ Closing Note */}
          <p className="charges-note mt-4">
            This feature makes TradeMint stand out by providing execution-level
            accuracy instead of only showing price-based returns.
          </p>

          <div className="text-center mt-4">
            <a href="/dashboard/orders" className="charges-link">
              View your Orders with Charges →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brokerage;
