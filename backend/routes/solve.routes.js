import express from "express";
import { getSolution, analyzeProblem } from "../controllers/solve.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/solve/:id", protect, getSolution);

// TEMPORARY: Remove protect middleware for testing
// Change this back to: router.post("/analyze", protect, analyzeProblem);
router.post("/analyze", analyzeProblem);

export default router;