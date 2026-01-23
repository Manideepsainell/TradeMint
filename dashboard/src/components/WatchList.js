import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnutChart";
import { fetchSensex } from "../services/stockService";

const WatchList = () => {
  const [sensexData, setSensexData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch stock data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchSensex();
        setSensexData(data || []);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setSensexData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: sensexData.map((stock) => stock.symbol),
    datasets: [
      {
        label: "Price",
        data: sensexData.map((stock) => stock.price),
        backgroundColor: [
          "rgba(56, 126, 209, 0.35)",
          "rgba(34, 197, 94, 0.35)",
          "rgba(249, 115, 22, 0.35)",
          "rgba(99, 102, 241, 0.35)",
          "rgba(220, 38, 38, 0.35)",
          "rgba(148, 163, 184, 0.35)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <aside className="watchlist-container">
      {/* ✅ search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">{sensexData.length} / 50</span>
      </div>

      {/* ✅ loading */}
      {loading ? (
        <div style={{ padding: "14px", fontSize: "13px", color: "#6b7280" }}>
          Loading stock data...
        </div>
      ) : (
        <>
          {/* ✅ list */}
          <ul className="list">
            {sensexData.map((stock) => (
              <WatchListItem stock={stock} key={stock.symbol} />
            ))}
          </ul>

          {/* ✅ chart block (very important for layout) */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <p
              style={{
                margin: "4px 0 10px 0",
                fontSize: "12px",
                fontWeight: "700",
                color: "#111827",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Market snapshot
            </p>
            <DoughnutChart data={chartData} />
          </div>
        </>
      )}
    </aside>
  );
};

export default WatchList;

/* =================================
   SINGLE ITEM
================================= */
const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.change < 0 ? "down" : "up"}>{stock.symbol}</p>

        <div className="item-info">
          <span className="percent">
            {Number(stock.changePercent || 0).toFixed(2)}%
          </span>

          {stock.change < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">{stock.price}</span>
        </div>
      </div>

      {showActions && <WatchListActions uid={stock.symbol} />}
    </li>
  );
};

/* =================================
   ACTIONS
================================= */
const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => generalContext.openBuyWindow(uid);

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell">Sell</button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
