import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import './Navbar.css'


function Navbar() {
  const { user, logout, flash, showFlash } = useContext(AuthContext);
  const navigate = useNavigate();

 const handleDashboardClick = () => {
  if (user) {
    navigate("/dashboard");
  } else {
    showFlash("Please login to access Dashboard (Demo account filled)");

    navigate("/login", {
      state: {
        demo: true,
        email: "Nikhil@gmail.com",
        password: "123456",
      },
    });
  }
};

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  if (flash) {
    const timer = setTimeout(() => {
      showFlash("");
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [flash, showFlash]);



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
      {/* ✅ Flash Message */}
      {flash && <div className="landing-flash">{flash}</div>}

      {/* ✅ Navbar */}
    <nav className={`landing-navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        <div className="landing-navbar-inner">
          {/* ✅ Brand */}
          <Link className="landing-brand" to="/">
            <span className="brand-text">
              Trade<span>Mint</span>
            </span>
          </Link>

          {/* ✅ Links */}
          <div className="landing-links">
            <Link className="landing-link" to="/about">
              About
            </Link>

            <Link className="landing-link" to="/products">
              Platform
            </Link>

           <Link className="landing-link" to="/pricing">
  Charges
</Link>



            <Link className="landing-link" to="/support">
              Help
            </Link>

            {/* ✅ Auth Button */}
            {!user ? (
              <Link
  className="landing-login-btn"
  to="/login"
  state={{
    demo: true,
    email: "Nikhil@gmail.com",
    password: "123456",
  }}
>
  Login
</Link>
    
            ) : (
              <button className="landing-link-btn" onClick={handleLogout}>
                Logout
              </button>
            )}

            {/* ✅ Dashboard CTA */}
            <button className="dashboard-btn" onClick={handleDashboardClick}>
              Dashboard →
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
