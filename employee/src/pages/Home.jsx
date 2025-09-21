import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const containerStyle = {
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "28px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
  };

  const loginStyle = {
    ...buttonStyle,
    backgroundColor: "#1D4ED8",
  };

  const registerStyle = {
    ...buttonStyle,
    backgroundColor: "#10B981",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Leave Management</h1>
      <p>Use this system to manage employee leave requests.</p>
      <div style={buttonContainer}>
        <Link to="/login" style={loginStyle}>
          Login
        </Link>
        <Link to="/register" style={registerStyle}>
          Register
        </Link>
      </div>
    </div>
  );
}
