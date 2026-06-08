import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",

  // CORS
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Email
  email: {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.BREVO_SENDER_EMAIL || "gouranshagarwal97@gmail.com",
    senderName: process.env.BREVO_SENDER_NAME || "Gouransh Agarwal",
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
  },
};

// Validate required environment variables
if (config.nodeEnv === "production") {
  if (!config.email.apiKey) {
    throw new Error("BREVO_API_KEY must be set in production");
  }
}
