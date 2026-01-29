import React, { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/funds.css";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <p>Instant, zero-cost fund transfers with UPI 🚀</p>

        <div className="funds-actions">
          <button className="btn btn-primary">Add Funds</button>
          <button className="btn btn-soft">Withdraw</button>
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
          <p>Payin</p>
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
    </div>
  );
};

export default Funds;
