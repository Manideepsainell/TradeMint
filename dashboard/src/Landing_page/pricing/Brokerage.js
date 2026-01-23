import React, { useMemo, useState } from "react";
import "./ChargesTable.css";

const Badge = ({ children, variant = "success" }) => {
  return (
    <span className={`badge-pill badge-${variant}`}>
      {children}
    </span>
  );
};

function Brokerage() {
  const [activeTab, setActiveTab] = useState("equity");

  const tabs = useMemo(
    () => [
      { key: "equity", label: "Equity" },
      { key: "currency", label: "Currency" },
      { key: "commodity", label: "Commodity" },
    ],
    []
  );

  return (
    <section className="landing-section">
       <div className="landing-inner">
        <div className="charges-container">

          {/* Tabs */}
          <div className="tabs" role="tablist" aria-label="Charges tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Main table */}
          <div className="table-wrap mt-4">
            {activeTab === "equity" && (
              <table className="charges-table">
                <thead>
                  <tr>
                    <th>Equity delivery</th>
                    <th>Equity intraday</th>
                    <th>F&amp;O - Futures</th>
                    <th>F&amp;O - Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Zero Brokerage</td>
                    <td>0.03% or ₹20/executed order whichever is lower</td>
                    <td>0.03% or ₹20/executed order whichever is lower</td>
                    <td>Flat ₹20 per executed order</td>
                  </tr>
                  <tr>
                    <td>0.1% on buy &amp; sell</td>
                    <td>0.025% on the sell side</td>
                    <td>0.02% on the sell side</td>
                    <td>
                      <ul className="table-list">
                        <li>0.125% of intrinsic value on exercised options</li>
                        <li>0.1% on sell side (on premium)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      NSE: 0.00297% <br /> BSE: 0.00375%
                    </td>
                    <td>
                      NSE: 0.00297% <br /> BSE: 0.00375%
                    </td>
                    <td>
                      NSE: 0.00173% <br /> BSE: 0
                    </td>
                    <td>
                      NSE: 0.03503% (premium) <br /> BSE: 0.0325% (premium)
                    </td>
                  </tr>
                  <tr>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                  </tr>
                  <tr>
                    <td>₹10 / crore</td>
                    <td>₹10 / crore</td>
                    <td>₹10 / crore</td>
                    <td>₹10 / crore</td>
                  </tr>
                  <tr>
                    <td>0.015% or ₹1500 / crore on buy side</td>
                    <td>0.003% or ₹300 / crore on buy side</td>
                    <td>0.002% or ₹200 / crore on buy side</td>
                    <td>0.003% or ₹300 / crore on buy side</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "currency" && (
              <table className="charges-table">
                <thead>
                  <tr>
                    <th>Currency Futures</th>
                    <th>Currency Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0.03% or ₹20/executed order whichever is lower</td>
                    <td>₹20 per executed order</td>
                  </tr>
                  <tr>
                    <td>No STT</td>
                    <td>No STT</td>
                  </tr>
                  <tr>
                    <td>
                      NSE: 0.00035% <br /> BSE: 0.00045%
                    </td>
                    <td>
                      NSE: 0.0311% <br /> BSE: 0.001%
                    </td>
                  </tr>
                  <tr>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                  </tr>
                  <tr>
                    <td>₹10 / crore</td>
                    <td>₹10 / crore</td>
                  </tr>
                  <tr>
                    <td>0.0001% or ₹10 / crore on buy side</td>
                    <td>0.0001% or ₹10 / crore on buy side</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "commodity" && (
              <table className="charges-table">
                <thead>
                  <tr>
                    <th>Commodity Futures</th>
                    <th>Commodity Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0.03% or ₹20/executed order whichever is lower</td>
                    <td>₹20 per executed order</td>
                  </tr>
                  <tr>
                    <td>0.01% on sell side (Non-Agri)</td>
                    <td>0.05% on sell side</td>
                  </tr>
                  <tr>
                    <td>
                      MCX: 0.0021% <br /> NSE: 0.0001%
                    </td>
                    <td>
                      MCX: 0.0418% <br /> NSE: 0.001%
                    </td>
                  </tr>
                  <tr>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                    <td>18% on (brokerage + SEBI + transaction charges)</td>
                  </tr>
                  <tr>
                    <td>
                      Agri: ₹1 / crore <br /> Non-Agri: ₹10 / crore
                    </td>
                    <td>₹10 / crore</td>
                  </tr>
                  <tr>
                    <td>0.002% or ₹200 / crore on buy side</td>
                    <td>0.003% or ₹300 / crore on buy side</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Calculator link */}
          <div className="mt-5 text-center">
            <a className="charges-link" href="#">
              Calculate your costs upfront
            </a>{" "}
            <span className="text-muted">using our brokerage calculator</span>
          </div>

          {/* Account opening */}
          <h3 className="mt-5 mb-3">Charges for account opening</h3>
          <div className="table-wrap">
            <table className="charges-table">
              <thead>
                <tr>
                  <th>Type of account</th>
                  <th>Charges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Online account</td>
                  <td><Badge>FREE</Badge></td>
                </tr>
                <tr>
                  <td>Offline account</td>
                  <td><Badge>FREE</Badge></td>
                </tr>
                <tr>
                  <td>NRI account (offline only)</td>
                  <td>₹500</td>
                </tr>
                <tr>
                  <td>Partnership, LLP, HUF, or Corporate accounts (offline only)</td>
                  <td>₹500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AMC */}
          <h3 className="mt-5 mb-3">Demat AMC (Annual Maintenance Charge)</h3>
          <div className="table-wrap">
            <table className="charges-table">
              <thead>
                <tr>
                  <th>Value of holdings</th>
                  <th>AMC</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Up to ₹4 lakh</td>
                  <td><Badge>FREE*</Badge></td>
                </tr>
                <tr>
                  <td>₹4 lakh – ₹10 lakh</td>
                  <td>₹100 per year, charged quarterly*</td>
                </tr>
                <tr>
                  <td>Above ₹10 lakh</td>
                  <td>₹300 per year, charged quarterly</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="charges-note">
            * Lower AMC is applicable only if the account qualifies as a Basic
            Services Demat Account (BSDA). BSDA account holders cannot hold more
            than one demat account. To learn more about BSDA,{" "}
            <a href="#" className="charges-link">click here</a>.
          </p>

          {/* Optional services */}
          <h3 className="mt-5 mb-3">Charges for optional value added services</h3>
          <div className="table-wrap">
            <table className="charges-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Billing Frequency</th>
                  <th>Charges</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tickertape</td>
                  <td>Monthly / Annual</td>
                  <td>Free: 0 | Pro: 249/2399</td>
                </tr>
                <tr>
                  <td>Smallcase</td>
                  <td>Per transaction</td>
                  <td>Buy &amp; Invest More: 100 | SIP: 10</td>
                </tr>
                <tr>
                  <td>Kite Connect</td>
                  <td>Monthly</td>
                  <td>Connect: 500</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Brokerage;
