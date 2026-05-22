import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/funds.css";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="funds-page">
      {/* Summary Cards */}
      <div className="funds-summary">
        <div className="glass-card summary-box">
          <p className="muted">Available Margin</p>
          <h2>₹{funds.availableMargin?.toFixed(0)}</h2>
        </div>

        <div className="glass-card summary-box">
          <p className="muted">Used Margin</p>
          <h2>₹{funds.usedMargin?.toFixed(0)}</h2>
        </div>

        <div className="glass-card summary-box">
          <p className="muted">Opening Balance</p>
          <h2>₹{funds.openingBalance?.toFixed(0)}</h2>
        </div>
      </div>

      {/* Detailed Table */}
      <h3 className="funds-title">Funds Overview</h3>

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
      </div>
    </div>
  );
};

export default Funds;