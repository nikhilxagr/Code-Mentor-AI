import express from "express";
import { solveProblem } from "../controllers/solve.controller.js";

const router = express.Router();

router.post("/solve", solveProblem);

export default router;
