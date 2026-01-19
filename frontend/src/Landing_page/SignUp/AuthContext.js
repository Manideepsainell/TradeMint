import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const showFlash = (message) => {
    setFlash(message);
    setTimeout(() => setFlash(""), 3000);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    showFlash(`Welcome ${userData.username || userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const logout = () => {
    handleLogout();
    showFlash("You are logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, flash, showFlash }}>
      {children}
    </AuthContext.Provider>
  );
};
