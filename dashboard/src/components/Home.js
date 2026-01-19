import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { API_URL } from "../config"; // make sure this exists

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
        });

        // ✅ authenticated
        setLoading(false);
      } catch (err) {
        // ❌ not authenticated
        window.location.href = "http://localhost:3000/login";
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
