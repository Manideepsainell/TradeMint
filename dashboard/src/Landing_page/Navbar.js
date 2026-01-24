import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout, flash, showFlash } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
  if (user) {
    navigate("/dashboard");
  } else {
    showFlash("Please login to go to dashboard");
    navigate("/login");
  }
};


  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      navigate("/login");
    }
  };

  return (
    <>
      {/* ✅ Flash message */}
      {flash && (
        <div className="landing-flash">
          {flash}
        </div>
      )}

      {/* ✅ Full-width Navbar */}
      <nav className="landing-navbar">
        <div className="landing-navbar-inner">
          {/* Logo */}
          <Link className="landing-brand" to="/">
            <img
              src="/media/images/logo.svg"
              alt="Zerodha"
              className="landing-logo"
            />
          </Link>

          {/* Links */}
          <div className="landing-links">
            {!user ? (
              <>
                <Link className="landing-link" to="/signup">SignUp</Link>
                <Link className="landing-link" to="/login">Login</Link>
              </>
            ) : (
              <button className="landing-link-btn" onClick={handleLogout}>
                Logout
              </button>
            )}

            <Link className="landing-link" to="/about">About</Link>
            <Link className="landing-link" to="/products">Products</Link>
            <Link className="landing-link" to="/pricing">Pricing</Link>
            <Link className="landing-link" to="/support">Support</Link>
          </div>

          {/* Dashboard icon */}
          <button
            className="landing-hamburger"
            onClick={handleDashboardClick}
            title="Go to Dashboard"
          >
            &#9776;
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
