import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import { VerticalGraph } from "./VerticalGraph";
import "../styles/Holdings.css";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* ============================================================
     FETCH HOLDINGS DATA
  ============================================================ */

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/user/holdings");
        setHoldings(res.data?.data || []);
      } catch (err) {
        console.error("Holdings Fetch Error:", err);
        setErrorMsg("Failed to load holdings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  /* ============================================================
     HOLDINGS TOTALS
  ============================================================ */

  const totals = useMemo(() => {
    const investment = holdings.reduce(
      (acc, stock) => acc + stock.qty * stock.avg,
      0
    );

    const currentValue = holdings.reduce(
      (acc, stock) => acc + stock.qty * stock.price,
      0
    );

    const pnl = currentValue - investment;

    return {
      investment,
      currentValue,
      pnl,
    };
  }, [holdings]);

  /* ============================================================
     CHART DATA
  ============================================================ */

  const graphData = useMemo(() => {
    return {
      labels: holdings.map((s) => s.name),
      datasets: [
        {
          label: "Stock Prices",
          data: holdings.map((s) => Number(s.price || 0)),
          borderRadius: 6,
          barThickness: 26,
        },
      ],
    };
  }, [holdings]);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return (
      <div className="route-loading">
        Loading your holdings...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="route-loading">
        {errorMsg}
      </div>
    );
  }

  if (!holdings.length) {
    return (
      <div className="route-loading">
        No holdings yet 📭
      </div>
    );
  }

  /* ============================================================
     UI RENDER
  ============================================================ */

  return (
    <div>
      {/* Title */}
      <h3 className="holdings-title">
        Holdings ({holdings.length})
      </h3>

      {/* Holdings Table */}
      <div className="holdings-table-card">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg Cost</th>
              <th>LTP</th>
              <th>Current Value</th>
              <th>P&amp;L</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock) => {
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const currentValue = qty * price;
              const pnl = currentValue - qty * avg;

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{currentValue.toFixed(2)}</td>
                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals Summary */}
      <div className="holdings-summary">
        <div className="holdings-summary-card">
          <h5>₹{totals.investment.toFixed(2)}</h5>
          <p>Total Investment</p>
        </div>

        <div className="holdings-summary-card">
          <h5>₹{totals.currentValue.toFixed(2)}</h5>
          <p>Current Value</p>
        </div>

        <div className="holdings-summary-card">
          <h5 className={totals.pnl >= 0 ? "profit" : "loss"}>
            ₹{totals.pnl.toFixed(2)}
          </h5>
          <p>Total P&amp;L</p>
        </div>
      </div>

      {/* Graph */}
      <div className="dashboard-chart-card">
        <VerticalGraph data={graphData} />
      </div>
    </div>
  );
};

export default Holdings;
