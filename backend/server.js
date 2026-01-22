import express from "express";
import cors from "cors";
// import solveRoute from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// app.use("/api", solveRoute);

console.log("Checking API Key...", process.env.GEMINI_API_KEY ? "Loaded Successfully" : "MISSING!");

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});