import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FLASH STATE
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data?.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setUser(null);
    }
  };

  // ✅ FLASH FUNCTION
  const showFlash = (message, timeout = 3000) => {
    setFlash(message);
    setTimeout(() => {
      setFlash(null);
    }, timeout);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        flash,
        showFlash,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
