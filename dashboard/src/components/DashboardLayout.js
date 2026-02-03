import React from "react";
import { Outlet } from "react-router-dom";

import WatchList from "./WatchList";
import TopBar from "./TopBar";
import Menu from "./Menu";
import { GeneralContextProvider } from "./GeneralContext";

const DashboardLayout = () => {
  return (
    <GeneralContextProvider>
      <div className="dashboard-app">
        {/* ✅ Top Header */}
        <TopBar />

        {/* ✅ Navigation Tabs */}
        <Menu />

        {/* ✅ Main Dashboard Body */}
        <div className="dashboard-container">
          {/* Sidebar */}
          <aside>
            <WatchList />
          </aside>

          {/* Page Content */}
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default DashboardLayout;
