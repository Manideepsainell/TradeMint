import React, { useEffect, useState } from "react";
import api from "../api/axios";

const TopBar = () => {
  const [indices, setIndices] = useState(null);
  const [username, setUsername] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const getTodayLabel = () => {
    const now = new Date();
    return now.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMarketStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 Sun, 6 Sat
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    const openTime = 9 * 60 + 15; // 09:15
    const closeTime = 15 * 60 + 30; // 15:30
    const isWeekday = day >= 1 && day <= 5;

    const formatRemaining = (mins) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      if (h <= 0) return `${m}m`;
      return `${h}h ${m}m`;
    };

    if (!isWeekday) {
      return { label: "Market Closed", color: "#dc2626", dot: "🔴", countdown: "" };
    }

    if (minutesNow >= openTime && minutesNow <= closeTime) {
      const remaining = closeTime - minutesNow;
      return {
        label: "Market Open",
        color: "#16a34a",
        dot: "🟢",
        countdown: `Closes in ${formatRemaining(remaining)}`,
      };
    }

    if (minutesNow < openTime) {
      const remaining = openTime - minutesNow;
      return {
        label: "Market Closed",
        color: "#dc2626",
        dot: "🔴",
        countdown: `Opens in ${formatRemaining(remaining)}`,
      };
    }

    const minsTillMidnight = 24 * 60 - minutesNow;
    const remaining = minsTillMidnight + openTime;

    return {
      label: "Market Closed",
      color: "#dc2626",
      dot: "🔴",
      countdown: `Opens in ${formatRemaining(remaining)}`,
    };
  };

  const fetchIndices = async () => {
    try {
      const res = await api.get("/api/indices");
      setIndices(res.data);

      setLastUpdated(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    } catch (err) {
      console.error("Error fetching indices:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      if (res.data?.user?.username) setUsername(res.data.user.username);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchIndices();
    fetchUser();
    const interval = setInterval(fetchIndices, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "http://localhost:3000/login";
    }
  };

  const market = getMarketStatus();
  const nifty = indices?.nifty;
  const sensex = indices?.sensex;

  const formatNum = (n) => (typeof n === "number" ? n.toFixed(2) : "--");

  const IndexBox = ({ title, data }) => {
    const isUp = (data?.changePercent ?? 0) >= 0;

    return (
      <div className="index-box">
        <p className="index">{title}</p>
        <p className="index-points">{formatNum(data?.price)}</p>
        <p className={`percent ${isUp ? "up" : "down"}`}>
          {data?.changePercent != null
            ? `${isUp ? "+" : ""}${formatNum(data?.changePercent)}%`
            : "--"}
        </p>
      </div>
    );
  };

  return (
    <div className="topbar-container">
      {/* ✅ LEFT: INDICES */}
      <div className="indices-container">
        <IndexBox title="NIFTY 50" data={nifty} />
        <IndexBox title="SENSEX" data={sensex} />
      </div>

      {/* ✅ CENTER: GREETING */}
      <div className="topbar-greeting">
        {username ? (
          <>
            <div className="greet-line">
              {getGreeting()}, <span className="greet-name">{username}</span> 👋
            </div>

            <div className="greet-subline">
              <span className="greet-date">{getTodayLabel()}</span>
              <span className="greet-sep">•</span>

              <span className="greet-market" style={{ color: market.color }}>
                {market.dot} {market.label}
              </span>

              {market.countdown ? (
                <>
                  <span className="greet-sep">•</span>
                  <span className="greet-countdown">{market.countdown}</span>
                </>
              ) : null}

              {lastUpdated ? (
                <>
                  <span className="greet-sep">•</span>
                  <span className="greet-updated">Updated: {lastUpdated}</span>
                </>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {/* ✅ RIGHT */}
      <div className="topbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
