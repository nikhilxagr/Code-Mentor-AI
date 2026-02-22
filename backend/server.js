import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import solveRoutes from "./routes/solve.routes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration - Allow both ports for development
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Log API key status
console.log(
  "🔑 Gemini API Key:",
  process.env.GEMINI_API_KEY ? "✅ Loaded" : "❌ Missing"
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", solveRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "CodeMentor AI Backend is live! 🚀",
    database: global.isMongoConnected ? "✅ MongoDB Connected" : "❌ Database Disconnected",
    endpoints: {
      auth: "/api/auth",
      solve: "/api/solve/:id",
      analyze: "/api/analyze"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✨ Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}\n`);
});
