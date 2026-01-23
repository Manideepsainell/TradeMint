import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingLayout from "./Landing_page/LandingLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";


// ✅ Public Landing Pages
import Home from "./Landing_page/Home/Home";
import About from "./Landing_page/About/About";
import Pricing from "./Landing_page/pricing/Pricing";
import Products from "./Landing_page/Products/Products";
import Support from "./Landing_page/Support/Support";
import Signup from "./Landing_page/SignUp/Signup";
import Login from "./Landing_page/SignUp/Login"; // ✅ yours

// ✅ Dashboard Pages
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import Funds from "./components/Funds";



const App = () => {
  return (
   <Routes>
  {/* ✅ PUBLIC LANDING ROUTES (with Navbar/Footer layout) */}
   <Route path="/" element={<LandingLayout />}>
    <Route index element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/products" element={<Products />} />
    <Route path="/support" element={<Support />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Route>

  {/* ✅ PROTECTED DASHBOARD ROUTES */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
          <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="orders" element={<Orders />} />
    <Route path="holdings" element={<Holdings />} />
    <Route path="positions" element={<Positions />} />
    <Route path="funds" element={<Funds />} />
  </Route>
</Routes>

  );
};

export default App;
