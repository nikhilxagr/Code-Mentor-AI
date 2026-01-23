import { Routes, Route } from "react-router-dom";


import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProblemSolver from "../pages/ProblemSolver";

const AppRoutes = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Home />} />

      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

     
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/solve" element={<ProblemSolver />} />
    </Routes>
  );
};

export default AppRoutes;
