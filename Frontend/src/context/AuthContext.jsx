import { createContext, useContext, useState } from "react";

/*
  1️⃣ Create the Context
  This creates a global container for auth data
*/
const AuthContext = createContext(null);

/*
  2️⃣ AuthProvider component
  This wraps the app and provides auth state
*/
export const AuthProvider = ({ children }) => {
  // -----------------------------
  // Global Auth State
  // -----------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // -----------------------------
  // Login function (FAKE for now)
  // -----------------------------
  const login = (userData = { name: "Guest User" }) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // -----------------------------
  // Logout function
  // -----------------------------
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // -----------------------------
  // Value shared across app
  // -----------------------------
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*
  3️⃣ Custom hook for easy access
*/
export const useAuth = () => {
  return useContext(AuthContext);
};
