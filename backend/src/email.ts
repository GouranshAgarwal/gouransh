import nodemailer from "nodemailer";
import { config } from "./config.js";
import type { EmailOptions } from "./types.js";

let transporter: nodemailer.Transporter | null = null;

export const initializeEmailService = async () => {
  if (!config.email.user || !config.email.password) {
    console.warn(
      "Email service not configured. Contact form emails will not be sent."
    );
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✓ Email service initialized");
    return transporter;
  } catch (error) {
    console.error("✗ Email service initialization failed:", error);
    return null;
  }
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  if (!transporter) {
    console.warn("Email service not available");
    return false;
  }

  try {
    await transporter.sendMail({
      from: config.email.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
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
