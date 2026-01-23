import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./Landing.css";

export default function LandingLayout() {


  return (
    <div className="landing-app landing-layout">
      <Navbar />
      <main className="landing-main">
        <Outlet />
      </main>
    </div>
  );
}
