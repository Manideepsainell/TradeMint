import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Holdings", path: "/dashboard/holdings" },
    { label: "Positions", path: "/dashboard/positions" },
    { label: "Funds", path: "/dashboard/funds" },
  ];

  return (
    <div className="dashboard-menu">
      {links.map((l) => (
        <NavLink
          key={l.path}
          to={l.path}
          end={l.path === "/dashboard"}   // ✅ important
          className={({ isActive }) =>
            `dashboard-menu-link ${isActive ? "active" : ""}`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Menu;
