import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/menu.css";

const Menu = () => {
  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Holdings", path: "/dashboard/holdings" },
    { label: "Positions", path: "/dashboard/positions" },
    { label: "Funds", path: "/dashboard/funds" },
    { label: "Alerts", path: "/dashboard/alerts" },
  ];

  return (
    <nav className="menu-bar" aria-label="Dashboard Navigation">
      {navLinks.map(({ label, path }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/dashboard"}
          className={({ isActive }) =>
            `menu-link ${isActive ? "active" : ""}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
