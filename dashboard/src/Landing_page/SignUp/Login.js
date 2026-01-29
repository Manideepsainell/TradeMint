import React, { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);

      if (res.data?.success) {
        login(res.data.data);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome back to TradeMint</h2>
        <p className="auth-subtitle">
          Login to access your trading dashboard and portfolio insights.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="auth-btn">
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
