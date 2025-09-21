// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../Api/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { init(); }, []);

  async function init() {
    try {
      const res = await AuthService.me();
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try { await AuthService.logout(); } catch {}
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
