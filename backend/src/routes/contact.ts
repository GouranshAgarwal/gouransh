import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { validateContactForm, isSuspicious } from "../validation.js";
import {
  sendEmail,
  getContactEmailTemplate,
  getConfirmationEmailTemplate,
} from "../email.js";
import type { ApiResponse } from "../types.js";

const router = Router();

router.post("/", async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    const validatedData = validateContactForm({ name, email, message });

    // Security check for suspicious content
    if (
      isSuspicious(validatedData.name) ||
      isSuspicious(validatedData.message)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid content detected",
        error: "Your message contains suspicious patterns",
      });
    }

    // Send email to admin
    const adminEmailSent = await sendEmail({
      to: process.env.EMAIL_FROM || "",
      subject: `New Contact: ${validatedData.name}`,
      html: getContactEmailTemplate(
        validatedData.name,
        validatedData.email,
        validatedData.message
      ),
    });

    // Send confirmation email to user
    const userEmailSent = await sendEmail({
      to: validatedData.email,
      subject: "I received your message!",
      html: getConfirmationEmailTemplate(validatedData.name),
    });

    if (!adminEmailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send message",
        error: "Could not process your request at this time",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: formattedErrors,
      });
    }

    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Please try again later",
    });
  }
});

export default router;
