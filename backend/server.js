import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import solveRoutes from "./routes/solve.routes.js"; 

dotenv.config();

connectDB();

const app = express();

app.use(express.json());


console.log("Checking API Key...", process.env.GEMINI_API_KEY ? "Loaded Successfully" : "MISSING!");
app.use("/api/auth", authRoutes);
app.use("/api", solveRoutes); //


app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});