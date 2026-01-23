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
      const res = await api.post("/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data?.user) {
        login(res.data.user);

        // ✅ redirect to frontend dashboard
        navigate("/dashboard");
      } else {
        alert("Invalid login (no user returned)");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed!");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
