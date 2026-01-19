import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  useEffect(() => {
    const params=new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if(tokenFromUrl){
      localStorage.setItem("token",tokenFromUrl);
    window.history.replaceState({},document.title,"/");
    }


    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
