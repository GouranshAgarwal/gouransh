import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config.js";
import { initializeEmailService } from "./email.js";
import {
  createRateLimiter,
  requestLogger,
  errorHandler,
} from "./middleware.js";
import contactRoutes from "./routes/contact.js";
import type { Response } from "express";
import type { ApiResponse } from "./types.js";

const app = express();

// Security middleware
app.use(helmet());

// Body parsing middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

// CORS configuration
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Request logging
app.use(requestLogger);

// Rate limiting
app.use(createRateLimiter());

// Routes
app.get("/health", (req, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: "Server is running",
    data: {
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
    },
  });
});

app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res: Response<ApiResponse>) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    error: `Route ${req.path} not found`,
  });
});

// Error handling
app.use(errorHandler);

// Initialize server
const start = async () => {
  try {
    // Initialize email service
    await initializeEmailService();

    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`CORS origin: ${config.frontendUrl}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

export default app;
