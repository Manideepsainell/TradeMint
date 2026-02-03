import React, { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/funds.css";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);


  /* ============================================================
     FETCH FUNDS DATA
  ============================================================ */

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/user/funds");
        setFunds(res.data?.data || null);
      } catch (err) {
        console.error("Funds Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return <div className="route-loading">Loading funds...</div>;
  }

  if (!funds) {
    return (
      <div className="route-loading">
        Unable to load funds data.
      </div>
    );
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="funds-page">
      {/* Top Banner */}
      <div className="funds-banner">
        <div className="funds-badge">
    🚧 Payments integration coming soon
      </div>

        <p>Instant, zero-cost fund transfers with UPI 🚀</p>

        <div className="funds-actions">
          <button
  className="btn btn-primary"
  onClick={() => setShowModal(true)}
>
  Add Funds
</button>

          <button className="btn btn-soft">Withdraw</button>
        </div>
      </div>
      <div className="funds-summary">
  <div className="glass-card summary-box">
    <p className="muted">Available</p>
    <h2>₹{funds.availableMargin?.toFixed(0)}</h2>
  </div>

  <div className="glass-card summary-box">
    <p className="muted">Used</p>
    <h2>₹{funds.usedMargin?.toFixed(0)}</h2>
  </div>

  <div className="glass-card summary-box">
    <p className="muted">Collateral</p>
    <h2>₹{funds.collateral?.toFixed(0)}</h2>
  </div>
</div>

      {/* Equity Section */}
      <h3 className="funds-title">Equity Funds</h3>

      <div className="funds-table-card">
        <div className="funds-row">
          <p>Available Margin</p>
          <p className="imp colored">
            ₹{funds.availableMargin?.toFixed(2)}
          </p>
        </div>

        <div className="funds-row">
          <p>Used Margin</p>
          <p className="imp">
            ₹{funds.usedMargin?.toFixed(2)}
          </p>
        </div>

        <div className="funds-row">
          <p>Opening Balance</p>
          <p className="imp">
            ₹{funds.openingBalance?.toFixed(2)}
          </p>
        </div>

        <hr />

        <div className="funds-row">
          <p>Pay-in Amount</p>

          <p className="imp">
            ₹{funds.payin?.toFixed(2) || "0.00"}
          </p>
        </div>

        <div className="funds-row">
          <p>Collateral</p>
          <p className="imp">
            ₹{funds.collateral?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      {/* Commodity Box */}
      <div className="funds-commodity">
        <p>You don’t have a commodity account yet.</p>
        <button className="btn btn-soft">Open Account</button>
      </div>
      {/* ✅ Modal Placeholder */}
{showModal && (
  <div className="funds-modal-overlay">
    <div className="funds-modal glass-card">
      <h3>Add Funds</h3>
      <p className="muted">
        This feature will support UPI & Bank Transfer soon.
      </p>

      <input
        type="number"
        placeholder="Enter amount (demo)"
        disabled
      />

      <button
        className="btn btn-primary"
        disabled
      >
        Coming Soon 🚀
      </button>

      <button
        className="btn btn-soft"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Funds;
