import { config } from "./config.js";
import type { EmailOptions } from "./types.js";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export const initializeEmailService = async () => {
  if (!config.email.apiKey) {
    console.warn(
      "Brevo API key not configured. Contact form emails will not be sent."
    );
    return null;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "api-key": config.email.apiKey,
      },
    });

    if (response.ok) {
      console.log("✓ Brevo email service initialized");
      return true;
    }

    const errorText = await response.text();
    console.error("✗ Brevo API key validation failed:", response.status, errorText);
    return null;
  } catch (error) {
    console.error("✗ Brevo email service initialization failed:", error);
    return null;
  }
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  if (!config.email.apiKey) {
    console.warn("Brevo API key not available");
    return false;
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.email.apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: config.email.senderName,
          email: config.email.senderEmail,
        },
        to: [
          {
            email: options.to,
          },
        ],
        subject: options.subject,
        htmlContent: options.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error sending email via Brevo:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const getContactEmailTemplate = (
  name: string,
  email: string,
  message: string
): string => {
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 20px; }
          .content { margin-bottom: 20px; line-height: 1.6; }
          .footer { color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Date:</strong> ${currentDate}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <div>
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message from your portfolio contact form.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const getConfirmationEmailTemplate = (name: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 20px; }
          .content { margin-bottom: 20px; line-height: 1.6; }
          .footer { color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You!</h2>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
            <p>Looking forward to connecting with you!</p>
            <p style="margin-top: 20px;">Best regards,<br><strong>Gouransh Agarwal</strong></p>
          </div>
          <div class="footer">
            <p>© 2024 Gouransh Agarwal. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
