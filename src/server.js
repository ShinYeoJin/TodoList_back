require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const morgan = require("morgan");

// Import routes
const todoRoutes = require("./routes/todoRoutes");
const subtaskRoutes = require("./routes/subtaskRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS: 기본적으로는 모든 origin 허용, 필요하면 CORS_ORIGIN 에 콤마(,)로 구분해 도메인 목록을 넣어 제한 가능
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
      : true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add morgan logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      message: "🦡 Hufflepuff Todo API is running!",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// API routes
app.use("/api/todos", todoRoutes);
app.use("/api/subtasks", subtaskRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🦡 Welcome to Hufflepuff Todo API",
    version: "1.0.0",
    endpoints: {
      todos: "/api/todos",
      subtasks: "/api/subtasks",
      health: "/health",
    },
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🦡 Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🦡 Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║     🦡  HUFFLEPUFF TODO API                            ║
║                                                        ║
║     Server running on: http://localhost:${PORT}        ║
║     Environment: ${process.env.NODE_ENV || "development"}                       ║
║                                                        ║
║     "Hard work and dedication"                         ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
