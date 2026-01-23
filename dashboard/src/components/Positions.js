import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const res = await api.get("/api/user/positions");

        // ✅ supports both: res.data = [] OR res.data.positions = []
        const data = Array.isArray(res.data) ? res.data : res.data?.positions || [];

        setPositions(data);
      } catch (err) {
        console.error("Error fetching positions:", err);
        setErrorMsg("Failed to load positions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  if (loading) {
    return <div className="orders-loading">Loading positions...</div>;
  }

  if (errorMsg) {
    return (
      <div className="orders-empty">
        <p>{errorMsg}</p>
      </div>
    );
  }

  if (!positions.length) {
    return (
      <>
        <h3 className="title">Positions (0)</h3>
        <div className="orders-empty">
          <p>No open positions</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock, index) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const curValue = price * qty;
              const pnl = curValue - avg * qty;

              const profClass = pnl >= 0 ? "profit" : "loss";

              // ✅ daily change: try to infer profit/loss from day or change value
              const dayValue = stock.day ?? stock.change ?? 0;
              const dayNum = typeof dayValue === "string" ? Number(dayValue) : Number(dayValue || 0);
              const dayClass = dayNum >= 0 ? "profit" : "loss";

              return (
                <tr key={stock._id || stock.name || index}>
                  <td>{stock.product || "--"}</td>
                  <td>{stock.name || "--"}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>

                  <td className={profClass}>{pnl.toFixed(2)}</td>

                  <td className={dayClass}>
                    {typeof stock.day === "string" ? stock.day : dayNum.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
