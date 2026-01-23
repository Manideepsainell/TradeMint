import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";   // ✅ use your axios instance
import { AuthContext } from "../../context/AuthContext";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/signup", form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.user) {
        const userData = {
          id: res.data.user.id,
          username: res.data.user.username,
          email: res.data.user.email,
        };

        login(userData);

        // ✅ redirect to dashboard directly
        window.location.href = "http://localhost:3001";
      } else {
        alert("Signup failed!");
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create your Zerodha Clone account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
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
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#387ed1" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
