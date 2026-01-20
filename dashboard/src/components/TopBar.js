import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";
import { API_URL } from "../config";

const TopBar = () => {
  const [indices, setIndices] = useState(null);
  const [username, setUsername] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");


  // ✅ Format date like: Tue, 20 Jan
  const getTodayLabel = () => {
    const now = new Date();
    return now.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  // ✅ Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // ✅ Market open status (IST assumed since your system time is India)
  // NSE equity market hours: Mon–Fri 09:15–15:30
 const getMarketStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 Sun, 6 Sat
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const openTime = 9 * 60 + 15;   // 09:15
  const closeTime = 15 * 60 + 30; // 15:30

  const isWeekday = day >= 1 && day <= 5;

  const formatRemaining = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h <= 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  if (!isWeekday) {
    return { label: "Market Closed", color: "red", dot: "🔴", countdown: "" };
  }

  // Market open
  if (minutesNow >= openTime && minutesNow <= closeTime) {
    const remaining = closeTime - minutesNow;
    return {
      label: "Market Open",
      color: "green",
      dot: "🟢",
      countdown: `Closes in ${formatRemaining(remaining)}`,
    };
  }

  // Before market open
  if (minutesNow < openTime) {
    const remaining = openTime - minutesNow;
    return {
      label: "Market Closed",
      color: "red",
      dot: "🔴",
      countdown: `Opens in ${formatRemaining(remaining)}`,
    };
  }

  // After market close → opens tomorrow
  const minsTillMidnight = 24 * 60 - minutesNow;
  const remaining = minsTillMidnight + openTime;

  return {
    label: "Market Closed",
    color: "red",
    dot: "🔴",
    countdown: `Opens in ${formatRemaining(remaining)}`,
  };
};


  const fetchIndices = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/indices`);
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
      const res = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
      });

      if (res.data?.user?.username) {
        setUsername(res.data.user.username);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    fetchIndices();
    fetchUser();

    const interval = setInterval(fetchIndices, 30000); // refresh indices every 30s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "http://localhost:3000/login";
    }
  };

  const nifty = indices?.nifty;
  const sensex = indices?.sensex;

  const formatNum = (n) => (typeof n === "number" ? n.toFixed(2) : "--");

 const renderIndex = (label, data) => {
  const isUp = (data?.changePercent ?? 0) >= 0;

  return (
    <div className="index-block">
      <p className="index-name">{label}</p>

      <div className="index-values">
        <p
          className="index-price"
          style={{ color: isUp ? "green" : "red", margin: 0 }}
        >
          {formatNum(data?.price)}
        </p>

        <p
          className="index-change"
          style={{ color: isUp ? "green" : "red", margin: 0 }}
        >
          {data?.changePercent != null
            ? `${isUp ? "+" : ""}${formatNum(data.changePercent)}%`
            : "--"}
        </p>
      </div>
    </div>
  );
};


  const market = getMarketStatus();

  return (
    <div className="topbar-container">
      <div className="indices-container">
        {renderIndex("NIFTY 50", nifty)}
        {renderIndex("SENSEX", sensex)}
      </div>

      {/* ✅ Premium greeting block */}
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
        ) : (
          ""
        )}
      </div>

      <div className="topbar-right">
        <Menu />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
