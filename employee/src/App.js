import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<style>
@import url('https://fonts.googleapis.com/css2?family=SUSE+Mono:ital,wght@0,100..800;1,100..800&display=swap');
</style>

import { AuthProvider } from "./context/Auth";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />


          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
