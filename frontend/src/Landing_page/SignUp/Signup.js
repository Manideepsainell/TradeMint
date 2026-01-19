import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        form,
        {
          withCredentials: true, // ✅ cookie auth
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Cookie-based auth: cookie is set by backend.
      // We only store user in UI state.
      if (res.data && res.data.user) {
        const userData = {
          id: res.data.user.id,
          username: res.data.user.username,
          email: res.data.user.email,
        };

        login(userData);

        // ✅ redirect to dashboard directly (no token in url)
        setTimeout(() => {
          window.location.href = "http://localhost:3001";
        }, 300);
      } else {
        alert("Signup failed!");
      }
    } catch (err) {
      console.error("Signup error:", err.response ? err.response.data : err.message);
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
