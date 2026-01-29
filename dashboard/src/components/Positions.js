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
      <div className="route-loading">
        No open positions right now 📭
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
