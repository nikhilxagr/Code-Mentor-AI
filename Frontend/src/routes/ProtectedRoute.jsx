import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
  ProtectedRoute wraps pages that require login
*/
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is NOT logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user IS logged in → show the page
  return children;
};

export default ProtectedRoute;
