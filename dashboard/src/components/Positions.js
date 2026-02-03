import React, { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/positions.css";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* ============================================================
     FETCH POSITIONS
  ============================================================ */

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/user/positions");
        setPositions(res.data?.data || []);
      } catch (err) {
        console.error("Positions Fetch Error:", err);
        setErrorMsg("Failed to load positions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return <div className="route-loading">Loading positions...</div>;
  }

  if (errorMsg) {
    return <div className="route-loading">{errorMsg}</div>;
  }

 if (!positions.length) {
  return (
    <div className="positions-empty glass-card">
      <h2>No open positions</h2>

      <p className="muted">
        You don’t have any active trades right now.  
        Once you place Buy/Sell orders, your positions will appear here.
      </p>

      <div className="positions-badge">
        🚧 Live Positions tracking coming soon
      </div>

      <button
        className="dashboard-btn"
        onClick={() => window.location.href = "/dashboard"}
      >
        Explore Dashboard →
      </button>
        <p className="example-label" style={{ marginTop: "12px" }}>
  Example Position:
</p>
      {/* Table Preview Header */}
      <div className="positions-preview">
        <div className="preview-row">
          <span>Instrument</span>
          <span>Qty</span>
          <span>Avg</span>
          <span>LTP</span>
          <span>P&L</span>
        </div>
 
        <div className="preview-row muted">
 

  <span>RELIANCE</span>
  <span>10</span>
  <span>₹1400</span>
  <span>₹1442</span>
  <span className="profit">+₹420</span>
</div>


      </div>
    </div>
  );
}


  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div>
      <h3 className="positions-title">
        Positions ({positions.length})
      </h3>

      <div className="positions-table-card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const pnl = qty * price - qty * avg;
              const dayChange = Number(stock.day ?? stock.change ?? 0);

              return (
                <tr key={stock._id}>
                  <td>{stock.product || "--"}</td>
                  <td>{stock.name || "--"}</td>

                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>

                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>

                  <td className={dayChange >= 0 ? "profit" : "loss"}>
                    {dayChange.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
