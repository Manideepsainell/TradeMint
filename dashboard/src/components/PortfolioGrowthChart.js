import React, { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import api from "../api/axios";
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(10, 14, 25, 0.95)",
        border: "1px solid #1f2937",
        borderRadius: "8px",
        padding: "10px 14px",
        boxShadow: "0 0 12px rgba(0,255,153,0.15)",
        fontSize: "13px"
      }}>
        <p style={{ color: "#aaa", marginBottom: "6px" }}>{label}</p>

        <p style={{ color: "#8884d8", margin: 0 }}>
          Invested: ₹{payload[0].value.toLocaleString()}
        </p>

        <p style={{ color: "#00ff99", margin: 0 }}>
          Value: ₹{payload[1].value.toLocaleString()}
        </p>

        <p style={{ color: "#ffb020", margin: 0 }}>
          Profit: ₹{payload[2].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const PortfolioGrowthChart = () => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState("6M");

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await api.get("/api/performance-history");
      console.log("History API:", res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.error("History API error:", err);
    }
  };

  fetchHistory();
}, []);


  const filteredData = useMemo(() => {
    switch (range) {
      case "1M":
        return data.slice(-1);
      case "3M":
        return data.slice(-3);
      case "6M":
        return data.slice(-6);
      case "1Y":
        return data;
      default:
        return data;
    }
  }, [range, data]); //  FIXED

  return (
    <div className="summary-card" style={{ gridColumn: "1 / -1", height: "350px" }}>
      <div className="chart-header">
        <h3 className="title">Portfolio Value vs Investment Trend</h3>

        <div className="range-buttons">
          {["1M", "3M", "6M", "1Y"].map((r) => (
            <button
              key={r}
              className={range === r ? "active" : ""}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={filteredData}>
         <CartesianGrid strokeDasharray="2 2" stroke="#1a1a1a" />

         <XAxis
  dataKey="date"
  stroke="#aaa"
  tickFormatter={(d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
/>

         <YAxis
  stroke="#aaa"
  domain={['dataMin - 2000', 'dataMax + 2000']}
  tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`}
/>

          <Tooltip content={<CustomTooltip />} />

<Line
  type="monotone"
  dataKey="value"
  stroke="#00ff99"
  strokeWidth={2}
  name="Portfolio Value"
  dot={{ r: 3 }}
  activeDot={{ r: 5 }}
/>

<Line type="monotone" dataKey="invested" stroke="#8884d8" strokeWidth={2} name="Invested Capital" />
<Line
  type="monotone"
  dataKey="profit"
  stroke="#ffaa00"
  strokeWidth={2}
  name="Profit"
/>


        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioGrowthChart;
