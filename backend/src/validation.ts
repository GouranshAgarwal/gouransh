import { z } from "zod";
import type { ContactFormData } from "./types.js";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must not exceed 5000 characters")
    .trim(),
});

export const validateContactForm = (data: unknown): ContactFormData => {
  return contactFormSchema.parse(data);
};

// XSS Prevention - sanitize strings
export const sanitizeString = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Check for suspicious patterns
export const isSuspicious = (str: string): boolean => {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /iframe/i,
    /onclick/i,
  ];
  return suspiciousPatterns.some((pattern) => pattern.test(str));
};
