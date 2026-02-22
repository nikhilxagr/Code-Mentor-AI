import express from "express";
import {
  getSolution,
  analyzeProblem,
  getProblemHistory,
  getDashboardStats,
  analyzeCodeComplexity,
  reviewCodeErrors,
  optimizeBruteForceCode
} from "../controllers/solve.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/solve/:id", protect, getSolution);
router.post("/analyze", protect, analyzeProblem);
router.get("/history", protect, getProblemHistory);
router.get("/stats", protect, getDashboardStats);
router.post("/tools/complexity", protect, analyzeCodeComplexity);
router.post("/tools/debug", protect, reviewCodeErrors);
router.post("/tools/optimize", protect, optimizeBruteForceCode);

export default router;
