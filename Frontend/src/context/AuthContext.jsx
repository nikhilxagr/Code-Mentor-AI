import { useEffect, useState } from "react";
import { AUTH_EXPIRED_EVENT } from "../services/api";
import authService from "../services/authService";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const hasToken = authService.isAuthenticated();
      if (!hasToken) {
        setLoading(false);
        return;
      }

      try {
        const profile = await authService.getProfile();
        const nextUser = profile?.user || authService.getCurrentUser();

        if (!nextUser) {
          throw new Error("No user profile available");
        }

        localStorage.setItem("user", JSON.stringify(nextUser));
        setUser(nextUser);
        setIsAuthenticated(true);
      } catch {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setIsAuthenticated(true);
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed. Please try again."
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setIsAuthenticated(true);
      setUser(data.user);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed. Please try again."
      };
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
