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

  <GeneralContextProvider>
    <div className="dashboard-container">
      <WatchList />
      <div className="content">
        <Outlet />
      </div>
    </div>
  </GeneralContextProvider>
</div>

);

};

export default DashboardLayout;
