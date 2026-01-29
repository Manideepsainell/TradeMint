import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  /* ✅ Global loading state */
  if (loading) {
    return (
      <div className="route-loading">
        Checking authentication...
      </div>
    );
  }

  /* ✅ Redirect if not logged in */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
