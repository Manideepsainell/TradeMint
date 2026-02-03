import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const PositionsSummary = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     FETCH POSITIONS
  ============================================================ */

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/user/positions");
        setPositions(res.data?.data || []);
      } catch (err) {
        console.error("Positions Summary Error:", err);
        setError("Unable to load positions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  /* ============================================================
     CALCULATE UNREALIZED P&L
  ============================================================ */

  const stats = useMemo(() => {
    const totalPnL = positions.reduce((acc, stock) => {
      const qty = Number(stock.qty || 0);
      const avg = Number(stock.avg || 0);
      const price = Number(stock.price || 0);

      return acc + (price - avg) * qty;
    }, 0);

    return {
      count: positions.length,
      pnl: totalPnL,
    };
  }, [positions]);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return (
      <div className="summary-card">
        <div className="title">Positions</div>
        <p className="empty-note">Loading positions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-card">
        <div className="title">Positions</div>
        <p className="empty-note">{error}</p>
      </div>
    );
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="summary-card">
      <div className="title">Positions ({stats.count})</div>

      {stats.count === 0 ? (
        <p className="empty-note">No open positions right now ✅</p>
      ) : (
        <div className="data">
          <div>
            <p>Unrealized P&amp;L</p>
            <p className={`imp ${stats.pnl >= 0 ? "profit" : "loss"}`}>
              ₹{stats.pnl.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionsSummary;
