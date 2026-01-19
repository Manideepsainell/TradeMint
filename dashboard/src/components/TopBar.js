import React from "react";
import axios from "axios";
import Menu from "./Menu";
import { API_URL } from "../config";

const TopBar = () => {
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true } // ✅ cookie auth
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "http://localhost:3000/login";
    }
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
