import { useState, type ReactNode, type MouseEvent, type CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

// Validate URL to prevent javascript: and data: attacks
const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url, window.location.href);
    const protocol = parsed.protocol;
    // Only allow http, https, mailto, tel, and hash fragments
    return (
      protocol === "http:" ||
      protocol === "https:" ||
      protocol === "mailto:" ||
      protocol === "tel:" ||
      url.startsWith("#")
    );
  } catch {
    // If URL parsing fails, check for hash fragment
    return url.startsWith("#");
  }
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  // Validate href to prevent XSS attacks
  const safeHref = href && isValidUrl(href) ? href : undefined;

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e as MouseEvent).clientX - rect.left;
    const y = (e as MouseEvent).clientY - rect.top;
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
    onClick && onClick(e);
  };

  const baseStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'DM Mono', monospace",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    transition: "all 0.25s ease",
    letterSpacing: "0.02em",
  };

  const sizes: Record<string, CSSProperties> = {
    sm: { padding: "8px 16px", fontSize: "0.78rem" },
    md: { padding: "11px 24px", fontSize: "0.85rem" },
    lg: { padding: "14px 32px", fontSize: "0.95rem" },
  };

  const variants: Record<string, CSSProperties> = {
    primary: {
      background: "var(--accent)",
      color: "#fff",
      borderRadius: "6px",
      boxShadow: "0 0 20px var(--accent-glow)",
    },
    outline: {
      background: "transparent",
      color: "var(--accent)",
      border: "1px solid var(--border-bright)",
      borderRadius: "6px",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      borderRadius: "6px",
      border: "1px solid var(--border)",
    },
  };

  const style: CSSProperties = { ...baseStyle, ...sizes[size], ...variants[variant as keyof typeof variants] };

  const Tag = safeHref ? "a" : "button";
  const extraProps = safeHref
    ? { href: safeHref, target: external ? "_blank" : "_self", rel: external ? "noopener noreferrer" : undefined }
    : { onClick: handleClick };

  return (
    <Tag style={style} className={`btn-hover ${className}`} {...extraProps}>
      {ripple && (
        <span
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            transform: "translate(-50%,-50%) scale(0)",
            animation: "ripple 0.6s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </Tag>
  );
}