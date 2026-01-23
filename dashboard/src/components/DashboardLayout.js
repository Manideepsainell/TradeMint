import React from "react";
import { Outlet } from "react-router-dom";
import WatchList from "./WatchList";
import TopBar from "./TopBar";
import Menu from "./Menu";
import { GeneralContextProvider } from "./GeneralContext";

const DashboardLayout = () => {
 return (
  <div className="dashboard-app">
    <TopBar />
    <Menu />

    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      <div className="content">
        <Outlet />
      </div>
    </div>
  </div>
);

};

export default DashboardLayout;
