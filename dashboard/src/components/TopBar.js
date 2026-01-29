import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ThemeContext } from "../context/ThemeContext";

import "../styles/topbar.css";

const Topbar = () => {
  const [indices, setIndices] = useState(null);
  const [username, setUsername] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  /* ============================================================
     HELPERS
  ============================================================ */

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getTodayLabel = () => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const formatNum = (n) =>
    typeof n === "number" ? n.toFixed(2) : "--";

  const getMarketStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    const openTime = 9 * 60 + 15;
    const closeTime = 15 * 60 + 30;

    const isWeekday = day >= 1 && day <= 5;

    if (!isWeekday) {
      return { label: "Closed", status: "closed", countdown: "" };
    }

    if (minutesNow >= openTime && minutesNow <= closeTime) {
      return { label: "Open", status: "open", countdown: "" };
    }

    return { label: "Closed", status: "closed", countdown: "" };
  };

  /* ============================================================
     FETCH DATA
  ============================================================ */

  useEffect(() => {
    const fetchTopbarData = async () => {
      try {
        const [indicesRes, userRes] = await Promise.all([
          api.get("/api/indices"),
          api.get("/api/auth/me"),
        ]);

        setIndices(indicesRes.data);

        if (userRes.data?.user?.username) {
          setUsername(userRes.data.user.username);
        }

        setLastUpdated(
          new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch (err) {
        console.error("Topbar Fetch Error:", err);
      }
    };

    fetchTopbarData();
    const interval = setInterval(fetchTopbarData, 30000);

    return () => clearInterval(interval);
  }, []);

  /* ============================================================
     LOGOUT
  ============================================================ */

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      navigate("/login");
    }
  };

  /* ============================================================
     DATA
  ============================================================ */

  const market = getMarketStatus();
  const nifty = indices?.nifty;
  const sensex = indices?.sensex;

  /* ============================================================
     COMPONENTS
  ============================================================ */

  const IndexBox = ({ title, data }) => {
    const isUp = (data?.changePercent ?? 0) >= 0;

    return (
      <div className="topbar-index-box">
        <p className="topbar-index-title">{title}</p>
        <p className="topbar-index-price">{formatNum(data?.price)}</p>
        <p className={`topbar-index-change ${isUp ? "up" : "down"}`}>
          {data?.changePercent != null
            ? `${isUp ? "+" : ""}${formatNum(data?.changePercent)}%`
            : "--"}
        </p>
      </div>
    );
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <header className="topbar">
      {/* LEFT: INDICES */}
      <div className="topbar-left">
        <IndexBox title="NIFTY 50" data={nifty} />
        <IndexBox title="SENSEX" data={sensex} />
      </div>

      {/* CENTER: GREETING */}
      <div className="topbar-center">
        <p className="topbar-greet">
          {getGreeting()}, <span>{username || "Trader"}</span> 👋
        </p>

        <p className="topbar-subline">
          {getTodayLabel()} • Market{" "}
          <span className={`market-${market.status}`}>
            {market.label}
          </span>
          {lastUpdated && <> • Updated {lastUpdated}</>}
        </p>
      </div>

     <div className="topbar-right">
  {/* THEME TOGGLE */}
  <button className="theme-toggle" onClick={toggleTheme}>
    <span className="toggle-icon">
      {theme === "dark" ? "🌙" : "☀️"}
    </span>
  </button>

  {/* Logout */}
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>
    </header>
  );
};

export default Topbar;
