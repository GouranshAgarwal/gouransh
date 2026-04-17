import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(20px, 5vw, 60px)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "var(--bg-glass)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "var(--accent)" }}>G</span>ouransh
          <span style={{ color: "var(--accent)", marginLeft: "2px" }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.78rem",
                color: active === link.href ? "var(--accent)" : "var(--text-secondary)",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                letterSpacing: "0.04em",
                transition: "all 0.2s ease",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "transparent";
              }}
              onClick={() => setActive(link.href)}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              marginLeft: "8px",
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-bright)";
              e.currentTarget.style.transform = "rotate(20deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((p) => !p)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 99,
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border)",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                transition: "all 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.85rem",
              color: "var(--accent)",
              background: "none",
              border: "1px solid var(--border-bright)",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @keyframes ripple {
          to { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
    </>
  );
}