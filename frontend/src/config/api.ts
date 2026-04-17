// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    contact: `${API_BASE_URL}/api/contact`,
    health: `${API_BASE_URL}/health`,
  },
  timeout: 10000, // 10 seconds
};

// Validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  nameMinLength: 2,
  nameMaxLength: 100,
  messageMinLength: 10,
  messageMaxLength: 5000,
};
