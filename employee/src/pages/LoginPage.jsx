import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../Api/api";
import { useAuth } from "../context/Auth";

export default function LoginPage() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await AuthService.login({ email, password });
      setUser(res.data.user);
      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/employee");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  const containerStyle = {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "25px",
    backgroundColor: "#ffffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "5px",
    outline: "none",
    fontSize: "14px"
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const errorStyle = {
    color: "#ef4444",
    marginBottom: "12px",
    fontSize: "14px"
  };

  const linkStyle = {
    fontSize: "13px",
    color: "#3b82f6",
    textDecoration: "none"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "bold" }}>Login</h2>
      
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="submit" style={buttonStyle}>Login</button>
          <Link to="/register" style={linkStyle}>Register</Link>
          {error && <div style={errorStyle}>{error}</div>}
        </div>
      </form>
    </div>
  );
}
