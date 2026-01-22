import { Routes, Route } from "react-router-dom";

/*
  Import all pages.
  Each page represents one screen in the app.
*/
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProblemSolver from "../pages/ProblemSolver";

/*
  This component contains all application routes.
*/
const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main App Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/solve" element={<ProblemSolver />} />
    </Routes>
  );
};

export default AppRoutes;
