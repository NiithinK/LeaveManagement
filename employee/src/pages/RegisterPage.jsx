import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../Api/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    employeeId: "",
    name: "",
    department: "",
    password: "",
    role: "employee",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await AuthService.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  const containerStyle = {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "5px",
    outline: "none",
    fontSize: "14px"
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#16a34a",
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

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "bold" }}>Register</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={handleRegister} style={{ display: "grid", gap: "12px" }}>
        <input
          style={inputStyle}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full name"
        />
        <input
          style={inputStyle}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <input
          style={inputStyle}
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          placeholder="Employee ID"
        />
        <input
          style={inputStyle}
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          placeholder="Department"
        />
        <select
          style={inputStyle}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <input
          style={inputStyle}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}
