import express from "express";
import { solveProblem, analyzeCode } from "../controllers/solve.controller.js"; 
const router = express.Router();

router.get("/solve/:id", solveProblem);

router.post("/analyze", analyzeCode);

export default router;