import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import { DoughnutChart } from "./DoughnutChart";
import { VerticalGraph } from "./VerticalGraph";

import "../styles/Holdings.css";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* ============================================================
     HELPERS
  ============================================================ */

  const formatMoney = (val) => Number(val || 0).toFixed(2);

  /* ============================================================
     FETCH HOLDINGS
  ============================================================ */

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

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
     TOTALS (Investment + Value + P&L)
  ============================================================ */

  const totals = useMemo(() => {
    let investment = 0;
    let currentValue = 0;

    holdings.forEach((stock) => {
      const qty = Number(stock.qty || 0);
      const avg = Number(stock.avg || 0);
      const price = Number(stock.price || 0);

      investment += qty * avg;
      currentValue += qty * price;
    });

    return {
      investment,
      currentValue,
      pnl: currentValue - investment,
    };
  }, [holdings]);

  /* ============================================================
     BAR CHART DATA (Holding Value)
  ============================================================ */

  const graphData = useMemo(() => {
    return {
      labels: holdings.map((h) => h.symbol),
      datasets: [
        {
          label: "Holding Value (₹)",
          data: holdings.map(
            (h) => Number(h.qty || 0) * Number(h.price || 0)
          ),
          borderRadius: 10,
          barThickness: 45,
        },
      ],
    };
  }, [holdings]);

  /* ============================================================
     DONUT CHART DATA (Portfolio Allocation)
  ============================================================ */

  const allocationData = useMemo(() => {
    return {
      labels: holdings.map((s) => s.name),
      datasets: [
        {
          label: "Portfolio Allocation",
          data: holdings.map(
            (s) => Number(s.qty || 0) * Number(s.price || 0)
          ),
        },
      ],
    };
  }, [holdings]);
  <div className="chart-card small">
  <h4 className="chart-title">Allocation</h4>

  <DoughnutChart data={allocationData} />

  {/* ✅ Allocation Breakdown */}
  <div className="allocation-labels">
  {allocationData.labels.map((name, idx) => {
    const value = allocationData.datasets[0].data[idx];
    const percent = ((value / totals.currentValue) * 100).toFixed(1);

    return (
      <p key={idx}>
        <span>{name}</span>
        <b>{percent}%</b>
      </p>
    );
  })}
</div>

</div>



  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return <div className="route-loading">Loading your holdings...</div>;
  }

  if (errorMsg) {
    return <div className="route-loading">{errorMsg}</div>;
  }

  if (!holdings.length) {
    return <div className="route-loading">No holdings yet 📭</div>;
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="page-container">
      {/* Title */}
      <h3 className="holdings-title">Holdings ({holdings.length})</h3>

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
                  <td>₹{formatMoney(avg)}</td>
                  <td>₹{formatMoney(price)}</td>
                  <td>₹{formatMoney(currentValue)}</td>

                  <td className={pnl >= 0 ? "profit" : "loss"}>
                    ₹{formatMoney(pnl)}
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
          <h5>₹{formatMoney(totals.investment)}</h5>
          <p>Total Investment</p>
        </div>

        <div className="holdings-summary-card">
          <h5>₹{formatMoney(totals.currentValue)}</h5>
          <p>Current Value</p>
        </div>

        <div className="holdings-summary-card">
          <h5 className={totals.pnl >= 0 ? "profit" : "loss"}>
            ₹{formatMoney(totals.pnl)}
          </h5>
          <p>Total P&amp;L</p>
        </div>
      </div>

      {/* ✅ Portfolio Charts */}
      <div className="holdings-charts">
        {/* Donut Allocation */}
        <div className="chart-card small">
          <h4 className="chart-title">Allocation</h4>
          <DoughnutChart data={allocationData} />
        </div>

        {/* Bar Performance */}
        <div className="chart-card large">
          <h4 className="chart-title">Holding Value</h4>
          <VerticalGraph data={graphData} />
        </div>
      </div>
    </div>
  );
};

export default Holdings;
