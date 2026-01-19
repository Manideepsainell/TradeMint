import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>

        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      {/* RIGHT SIDE */}
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
