import React, { useContext, useEffect, useMemo, useState } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import { fetchSensex } from "../services/stockService";
import "../styles/watchlist.css";

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setLoading(true);

        const data = await fetchSensex();

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

  const filteredStocks = useMemo(() => {
    return stocks
      .filter((stock) =>
        stock.symbol?.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 7);
  }, [stocks, search]);

  return (
    <aside className="watchlist-sidebar">
      <div className="watchlist-search-bar">
        <input
          className="watchlist-search-input"
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="watchlist-count">
          {filteredStocks.length}
        </span>
      </div>

      {loading ? (
        <div className="route-loading">Loading market data...</div>
      ) : (
        <ul className="watchlist-stocks">
          {filteredStocks.map((stock) => (
            <WatchlistItem key={stock.symbol} stock={stock} />
          ))}
        </ul>
      )}
    </aside>
  );
};

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

      {hover && <WatchlistActions stock={stock} />}
    </li>
  );
};

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
    </div>
  );
};

export default Watchlist;