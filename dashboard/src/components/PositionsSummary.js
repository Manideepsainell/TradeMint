import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const PositionsSummary = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await api.get("/api/user/positions");
        setPositions(res.data?.data || []);
      } catch (err) {
        console.log("Positions Summary Error:", err);
      }
    };

    fetchPositions();
  }, []);

  // ✅ Calculate Unrealized P&L
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

  return (
    <div className="table">
      <div className="title">Positions ({stats.count})</div>

      {stats.count === 0 ? (
        <p className="empty-note">
  No open positions right now ✅
</p>

      ) : (
        <div className="data">
          <div>
            <p>Unrealized P&L</p>
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
