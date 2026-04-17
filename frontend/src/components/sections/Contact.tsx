import { useState } from "react";
import { personalInfo } from "../../data/portfolio";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Button from "../ui/Button";
import { apiConfig } from "../../config/api";
import { validateContactForm, sanitizeInput } from "../../utils/validation";

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--text-primary)",
  fontFamily: "'DM Mono', monospace",
  fontSize: "0.85rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  letterSpacing: "0.02em",
};

const errorStyle = {
  ...inputStyle,
  borderColor: "#ef4444",
};

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validate form on client side
    const validation = validateContactForm(form.name, form.email, form.message);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setStatus("sending");
    setErrors({});

    try {
      const sanitizedForm = {
        name: sanitizeInput(form.name),
        email: sanitizeInput(form.email),
        message: sanitizeInput(form.message),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

      const res = await fetch(apiConfig.endpoints.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedForm),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        // Auto-reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        try {
          const errorData = await res.json();
          setErrors({ submit: errorData.error || "Failed to send message. Please try again." });
        } catch {
          setErrors({ submit: "Failed to send message. Please try again." });
        }
        setStatus("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setErrors({ submit: "Request timeout. Please check your connection and try again." });
        } else {
          setErrors({ submit: error.message || "An error occurred. Please try again." });
        }
      } else {
        setErrors({ submit: "An unexpected error occurred. Please try again." });
      }
      setStatus("error");
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--border-bright)";
    e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
  };

  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow = "none";
  };

  return (
    <Section id="contact">
      <SectionHeading label="Say Hello" title="Get in Touch" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "60px",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Info */}
        <div>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "36px" }}>
            Whether it's a collaboration, internship, or just to chat about tech — my inbox is always open.
          </p>

          {[
            { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
            { label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
            { label: "Location", value: personalInfo.location, href: null },
          ].map(({ label, value, href }) => (
            <div key={label} style={{ marginBottom: "20px" }}>
              <p className="mono" style={{ fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.15em", marginBottom: "4px" }}>
                {label.toUpperCase()}
              </p>
              {href ? (
                <a
                  href={href}
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                >
                  {value}
                </a>
              ) : (
                <p style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}>{value}</p>
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
            <Button href={personalInfo.github} variant="outline" size="sm" external>GitHub</Button>
            <Button href={personalInfo.leetcode} variant="outline" size="sm" external>LeetCode</Button>
          </div>
        </div>

        {/* Form */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "36px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Submit error message */}
            {errors.submit && (
              <div
                role="alert"
                style={{
                  padding: "12px 16px",
                  background: "#fee2e2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  color: "#7f1d1d",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                }}
              >
                {errors.submit}
              </div>
            )}

            {/* Success message */}
            {status === "success" && (
              <div
                role="status"
                style={{
                  padding: "12px 16px",
                  background: "#dcfce7",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                  color: "#166534",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                }}
              >
                Thank you! Your message has been sent successfully. I'll get back to you soon!
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
              <div>
                <label className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", display: "block", marginBottom: "8px" }}>
                  NAME {errors.name && <span style={{ color: "#ef4444" }}>*</span>}
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={errors.name ? errorStyle : inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  maxLength={100}
                />
                {errors.name && (
                  <p id="name-error" style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "4px" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", display: "block", marginBottom: "8px" }}>
                  EMAIL {errors.email && <span style={{ color: "#ef4444" }}>*</span>}
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={errors.email ? errorStyle : inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  maxLength={255}
                />
                {errors.email && (
                  <p id="email-error" style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "4px" }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", display: "block", marginBottom: "8px" }}>
                MESSAGE {errors.message && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={5}
                style={{
                  ...(errors.message ? errorStyle : inputStyle),
                  resize: "vertical",
                  minHeight: "120px",
                }}
                onFocus={focusStyle}
                onBlur={blurStyle}
                disabled={status === "sending"}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                maxLength={5000}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "8px" }}>
                {errors.message && (
                  <p id="message-error" style={{ fontSize: "0.75rem", color: "#ef4444" }}>
                    {errors.message}
                  </p>
                )}
                <span
                  className="mono"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    marginLeft: "auto",
                  }}
                >
                  {form.message.length}/5000
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                padding: "14px 28px",
                background: status === "sending" ? "var(--accent-muted)" : status === "success" ? "#10b981" : "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                letterSpacing: "0.06em",
                transition: "all 0.25s ease",
                opacity: status === "sending" ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-busy={status === "sending"}
              aria-label={
                status === "sending"
                  ? "Sending message"
                  : status === "success"
                    ? "Message sent"
                    : "Send message"
              }
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                  ? "✓ Message Sent!"
                  : "Send Message →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Section>
  );
}