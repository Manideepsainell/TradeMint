import React, { useContext, useEffect, useMemo, useState } from "react";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";

import { fetchSensex } from "../services/stockService";
import "../styles/watchlist.css";

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* ============================================================
     FETCH MARKET DATA
  ============================================================ */

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setLoading(true);

        const data = await fetchSensex();

        // remove invalid API responses
        const validStocks = (data || []).filter(
          (s) => s && !s.error && s.symbol
        );

        setStocks(validStocks);
      } catch (err) {
        console.error("Watchlist Fetch Error:", err);
        setStocks([]);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, []);

  /* ============================================================
     FILTER STOCKS (Search)
  ============================================================ */

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) =>
      stock.symbol?.toLowerCase().includes(search.toLowerCase())
    );
  }, [stocks, search]);

  /* ============================================================
     TOP MOVERS SNAPSHOT
  ============================================================ */

  const topMovers = useMemo(() => {
    return [...stocks]
      .sort(
        (a, b) =>
          Math.abs(Number(b.changePercent || 0)) -
          Math.abs(Number(a.changePercent || 0))
      )
      .slice(0, 3);
  }, [stocks]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="watchlist-count">
          {filteredStocks.length} / {stocks.length}
        </span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="route-loading">Loading market data...</div>
      ) : (
        <>
          {/* Stock List */}
          <ul className="watchlist-stocks">
            {filteredStocks.map((stock) => (
              <WatchlistItem key={stock.symbol} stock={stock} />
            ))}
          </ul>

          {/* Market Snapshot */}
          <div className="watchlist-mini-chart snapshot-bounce">
            <p className="watchlist-chart-title">Market Overview</p>

            <div className="market-index">
              <span>NIFTY 50</span>
              <strong>25,293</strong>
              <p className="up">+0.32%</p>
            </div>

            <div className="snapshot-movers">
              <p className="mini-title">Top Movers</p>

              {topMovers.length === 0 ? (
                <p>No market data</p>
              ) : (
                topMovers.map((s) => (
                  <div key={s.symbol} className="mover-row">
                    <span className="mover-name">{s.symbol}</span>

                    <span
                      className={`mover-change ${
                        Number(s.changePercent) >= 0 ? "up" : "down"
                      }`}
                    >
                      {s.changePercent !== undefined
                        ? `${Number(s.changePercent) >= 0 ? "+" : ""}${Number(
                            s.changePercent
                          ).toFixed(2)}%`
                        : "--"}
                    </span>
                  </div>
                ))
              )}
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

  const changeClass =
    Number(stock.changePercent || 0) < 0 ? "down" : "up";

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
            {stock.changePercent !== undefined
              ? `${Number(stock.changePercent) >= 0 ? "+" : ""}${Number(
                  stock.changePercent
                ).toFixed(2)}%`
              : "--"}
          </span>

          <span className="watchlist-price">
            {stock.price !== undefined
              ? `₹${Number(stock.price).toFixed(2)}`
              : "--"}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      {hover && <WatchlistActions stock={stock} />}
    </li>
  );
};

/* ============================================================
   ACTION BUTTONS
============================================================ */

const WatchlistActions = ({ stock }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <div className="watchlist-actions">
      <Tooltip title="Buy" arrow TransitionComponent={Grow}>
        <button
          className="watchlist-btn-buy"
          onClick={() => openBuyWindow(stock.symbol)}
        >
          Buy
        </button>
      </Tooltip>

      <Tooltip title="Sell" arrow TransitionComponent={Grow}>
        <button
          className="watchlist-btn-sell"
          onClick={() => openSellWindow(stock.symbol)}
        >
          Sell
        </button>
      </Tooltip>

      <Tooltip title="Analytics" arrow TransitionComponent={Grow}>
        <button className="watchlist-btn-action">
          <BarChartOutlined fontSize="small" />
        </button>
      </Tooltip>

      <Tooltip title="More" arrow TransitionComponent={Grow}>
        <button className="watchlist-btn-action">
          <MoreHoriz fontSize="small" />
        </button>
      </Tooltip>
    </div>
  );
};

export default Watchlist;