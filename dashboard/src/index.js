import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ScrollToTop from "./components/ScrollToTop";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      {/* ✅ Theme Provider */}
      <ThemeProvider>
        {/* ✅ Auth Provider */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);
