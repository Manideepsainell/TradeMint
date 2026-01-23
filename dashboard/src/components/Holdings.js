import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchHoldings = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const res = await api.get("/api/user/holdings");

        // ✅ supports both: res.data = []  OR  res.data.holdings = []
        const data = Array.isArray(res.data) ? res.data : res.data?.holdings || [];
        setHoldings(data);
      } catch (err) {
        console.error("Error fetching holdings:", err);
        setErrorMsg("Failed to load holdings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();

    // ✅ refresh every 30s (ok)
    const interval = setInterval(fetchHoldings, 30000);
    return () => clearInterval(interval);
  }, []);

  // ✅ totals
  const totals = useMemo(() => {
    const totalInvestment = holdings.reduce((acc, s) => {
      const qty = Number(s.qty || 0);
      const avg = Number(s.avg || 0);
      return acc + avg * qty;
    }, 0);

    const currentValue = holdings.reduce((acc, s) => {
      const qty = Number(s.qty || 0);
      const price = Number(s.price || 0);
      return acc + price * qty;
    }, 0);

    const pnl = currentValue - totalInvestment;

    return { totalInvestment, currentValue, pnl };
  }, [holdings]);

  // ✅ graph (safe)
  const graphData = useMemo(() => {
    return {
      labels: holdings.map((s) => s.name || "--"),
      datasets: [
        {
          label: "Stock Price",
          data: holdings.map((s) => Number(s.price || 0)),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }, [holdings]);

  // ✅ UI STATES
  if (loading) {
    return <div className="orders-loading">Loading your holdings...</div>;
  }

  if (errorMsg) {
    return (
      <div className="orders-empty">
        <p>{errorMsg}</p>
      </div>
    );
  }

  if (!holdings.length) {
    return (
      <>
        <h3 className="title">Holdings (0)</h3>
        <div className="orders-empty">
          <p>No holdings yet</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock, index) => {
              const name = stock.name || "--";
              const qty = Number(stock.qty || 0);
              const avg = Number(stock.avg || 0);
              const price = Number(stock.price || 0);

              const curValue = price * qty;
              const pnl = curValue - avg * qty;

              const profClass = pnl >= 0 ? "profit" : "loss";

              // ✅ day change: infer from stock.day if numeric
              const dayValue = stock.day ?? 0;
              const dayNum =
                typeof dayValue === "string" ? Number(dayValue) : Number(dayValue || 0);
              const dayClass = dayNum >= 0 ? "profit" : "loss";

              const netValue = stock.net ?? (avg ? ((pnl / (avg * qty)) * 100) : 0);
              const netNum =
                typeof netValue === "string" ? Number(netValue) : Number(netValue || 0);

              return (
                <tr key={stock._id || name || index}>
                  <td>{name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>

                  <td className={profClass}>{pnl.toFixed(2)}</td>

                  {/* net change */}
                  <td className={profClass}>
                    {Number.isFinite(netNum) ? `${netNum.toFixed(2)}%` : "--"}
                  </td>

                  {/* day change */}
                  <td className={dayClass}>
                    {typeof stock.day === "string" ? stock.day : dayNum.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* totals row */}
      <div className="row">
        <div className="col">
          <h5>{totals.totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{totals.currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={totals.pnl >= 0 ? "profit" : "loss"}>
            {totals.pnl.toFixed(2)}
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      {/* graph */}
      <VerticalGraph data={graphData} />
    </>
  );
};

export default Holdings;
