// src/Api/api.js
import axios from "axios";

// Base URL of your backend API (from environment or default)
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// Create an axios instance with base URL and credentials
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // allow cookies if your backend uses sessions
});

// ===================== AUTH SERVICE =====================
export const AuthService = {
  register: (data) => api.post("/auth/register", data), // Register new user
  login: (data) => api.post("/auth/login", data),       // Login user
  me: () => api.get("/auth/me"),                        // Get current logged-in user
  logout: () => api.post("/auth/logout"),               // Logout user
};

// ===================== LEAVE SERVICE =====================
export const LeaveService = {
  applyLeave: (data) => api.post("/leaves", data),                       // Apply leave
  getMyLeaves: () => api.get("/leaves/mine"),                            // Get my leaves
  getPending: () => api.get("/leaves/pending"),                          // Admin: pending leaves
  approve: (id, payload) => api.post(`/leaves/${id}/approve`, payload),  // Approve leave
  reject: (id, payload) => api.post(`/leaves/${id}/reject`, payload),    // Reject leave
  getEmployees: () => api.get("/admin/employees"),                        // Admin: employee list
  updateBalance: (empId, payload) => api.post(`/admin/employees/${empId}/balance`, payload), // Update leave balance
};

// Optional: Export the axios instance for custom requests if needed
export default api;
