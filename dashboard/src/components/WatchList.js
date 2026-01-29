import React, { useContext, useEffect, useState } from "react";

import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";

import { DoughnutChart } from "./DoughnutChart";
import { fetchSensex } from "../services/stockService";

import "../styles/watchlist.css";

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  
const [animateSnapshot, setAnimateSnapshot] = useState(false);

  /* ============================================================
     FETCH MARKET WATCHLIST DATA
  ============================================================ */

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setLoading(true);
        const data = await fetchSensex();
        setStocks(data || []);
      } catch (err) {
        console.error("Watchlist Fetch Error:", err);
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, []);
useEffect(() => {
  if (!loading) {
    setAnimateSnapshot(true);

    const timer = setTimeout(() => {
      setAnimateSnapshot(false);
    }, 700);

    return () => clearTimeout(timer);
  }
}, [loading]);


  /* ============================================================
     CHART DATA (No Hardcoded Colors)
  ============================================================ */
const topStocks = stocks.slice(0, 4);

const chartData = {
  labels: topStocks.map((s) => s.symbol),
  datasets: [
    {
      label: "Market Share",
      data: topStocks.map((s) => s.price),
    },
  ],
};


  /* ============================================================
     UI
  ============================================================ */

  return (
    <aside className="watchlist-sidebar">
      {/* Search */}
      <div className="watchlist-search-bar">
        <input
          className="watchlist-search-input"
          type="text"
          placeholder="Search stocks..."
        />
        <span className="watchlist-count">{stocks.length} / 50</span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="route-loading">Loading market data...</div>
      ) : (
        <>
          {/* Stock List */}
          <ul className="watchlist-stocks">
            {stocks.map((stock) => (
              <WatchlistItem key={stock.symbol} stock={stock} />
            ))}
          </ul>
            <div className="watchlist-mini-chart">
  <p className="watchlist-chart-title">Market Overview</p>

  {/* ✅ Index Summary */}
  <div className="market-index">
    <span>NIFTY 50</span>
    <strong>25,293</strong>
    <p className="up">+0.32%</p>
  </div>

  {/* ✅ Movers */}
  <div className="snapshot-movers">
    <p className="mini-title">Top Movers</p>

    {topStocks.slice(0, 3).map((s) => (
      <div key={s.symbol} className="mover-row">
        <span className="mover-name">{s.symbol}</span>

        <span
          className={`mover-change ${
            s.changePercent >= 0 ? "up" : "down"
          }`}
        >
          {s.changePercent >= 0 ? "+" : ""}
          {Number(s.changePercent).toFixed(2)}%
        </span>
      </div>
    ))}
  </div>
</div>


        </>
      )}
    </aside>
  );
};



/* ============================================================
   SINGLE STOCK ITEM
============================================================ */

const WatchlistItem = ({ stock }) => {
  const [hover, setHover] = useState(false);

  const changeClass = stock.change < 0 ? "down" : "up";

  return (
    <li
      className="watchlist-stock-row"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Main Row */}
      <div className="watchlist-stock-main">
        <p className="watchlist-symbol">{stock.symbol}</p>

        <div className="watchlist-metrics">
          <span className={`watchlist-change ${changeClass}`}>
            {Number(stock.changePercent || 0).toFixed(2)}%
          </span>

          <span className="watchlist-price">
            ₹{Number(stock.price || 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      {hover && <WatchlistActions uid={stock.symbol} />}
    </li>
  );
};

/* ============================================================
   ACTION BUTTONS
============================================================ */

const WatchlistActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <div className="watchlist-actions">
      {/* BUY */}
      <Tooltip title="Buy" arrow TransitionComponent={Grow}>
        <button
          className="watchlist-btn-buy"
          onClick={() => generalContext.openBuyWindow(uid)}
        >
          Buy
        </button>
      </Tooltip>

      {/* SELL */}
      <Tooltip title="Sell" arrow TransitionComponent={Grow}>
        <button
          className="watchlist-btn-sell"
          onClick={() => generalContext.openSellWindow(uid)}
        >
          Sell
        </button>
      </Tooltip>

      {/* Analytics */}
      <Tooltip title="Analytics" arrow TransitionComponent={Grow}>
        <button className="watchlist-btn-action">
          <BarChartOutlined fontSize="small" />
        </button>
      </Tooltip>

      {/* More */}
      <Tooltip title="More" arrow TransitionComponent={Grow}>
        <button className="watchlist-btn-action">
          <MoreHoriz fontSize="small" />
        </button>
      </Tooltip>
    </div>
  );
};
export default Watchlist;