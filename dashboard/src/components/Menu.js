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
    <nav className="menu-bar">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === "/dashboard"}
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
