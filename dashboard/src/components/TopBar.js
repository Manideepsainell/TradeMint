import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/topbar.css";

const TopBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Kolkata",
  });

  const hour = Number(
    now.toLocaleString("en-IN", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    })
  );

  const minute = Number(
    now.toLocaleString("en-IN", {
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    })
  );

const weekday = now.toLocaleDateString("en-IN", {
  weekday: "short",
  timeZone: "Asia/Kolkata",
});

const currentMinutes = hour * 60 + minute;

const marketOpenTime = 9 * 60 + 15; // 9:15 AM
const marketCloseTime = 15 * 60 + 30; // 3:30 PM

const isWeekday = weekday !== "Sat" && weekday !== "Sun";

  const isMarketOpen =
    isWeekday &&
    currentMinutes >= marketOpenTime &&
    currentMinutes < marketCloseTime;

  const hourForGreeting = Number(
    now.toLocaleString("en-IN", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    })
  );

  let greeting;

  if (hourForGreeting < 12) {
    greeting = "Good Morning";
  } else if (hourForGreeting < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <div className="topbar-index-box">
          <p className="topbar-index-title">NIFTY 50</p>
          <p className="topbar-index-price">25,293</p>
          <p className="topbar-index-change up">+0.32%</p>
        </div>

        <div className="topbar-index-box">
          <p className="topbar-index-title">SENSEX</p>
          <p className="topbar-index-price">71,583</p>
          <p className="topbar-index-change down">-0.18%</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="topbar-center">
        <p className="topbar-greet">
          {greeting} 👋
        </p>

        <p className="topbar-subline">
          {formattedDate} • Market{" "}
          <span
            className={isMarketOpen ? "market-open" : "market-closed"}
          >
            {isMarketOpen ? "Open" : "Closed"}
          </span>
        </p>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <button className="theme-toggle">
          <span className="toggle-icon">🌙</span>
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;