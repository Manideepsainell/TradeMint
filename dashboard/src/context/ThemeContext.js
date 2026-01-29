import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  /* Load saved theme */
  useEffect(() => {
    const saved = localStorage.getItem("tradement-theme");
    if (saved) setTheme(saved);
  }, []);

  /* Apply theme to HTML */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("tradement-theme", theme);
  }, [theme]);

  /* Toggle */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
