import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProblemSolver from "../pages/ProblemSolver";
import ToolsHub from "../pages/ToolsHub";
import ComplexityTool from "../pages/ComplexityTool";
import DebugTool from "../pages/DebugTool";
import OptimizeTool from "../pages/OptimizeTool";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/solve"
        element={
          <ProtectedRoute>
            <ProblemSolver />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tools"
        element={
          <ProtectedRoute>
            <ToolsHub />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tools/complexity"
        element={
          <ProtectedRoute>
            <ComplexityTool />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tools/debug"
        element={
          <ProtectedRoute>
            <DebugTool />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tools/optimize"
        element={
          <ProtectedRoute>
            <OptimizeTool />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
