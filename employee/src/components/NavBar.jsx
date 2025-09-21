import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/Auth";

const navStyle = {
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
};

const linkStyle = {
  textDecoration: "none",
  color: "#1f2937", // dark gray
  fontWeight: "bold",
  marginRight: "15px",
};

const buttonStyle = {
  padding: "5px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav style={navStyle}>
      <Link to="/" style={{ ...linkStyle, fontSize: "20px" }}>LeaveMgmt</Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        {user && user.role === "employee" && <Link to="/employee" style={linkStyle}>Employee</Link>}
        {user && user.role === "admin" && <Link to="/admin" style={linkStyle}>Admin</Link>}
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>{user.name} ({user.role})</span>
            <button 
              onClick={logout} 
              style={{ ...buttonStyle, backgroundColor: "#ef4444", color: "#fff" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            style={{ ...buttonStyle, backgroundColor: "#3b82f6", color: "#fff", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
