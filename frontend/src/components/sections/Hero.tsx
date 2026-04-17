import { useState, useEffect } from "react";
import { personalInfo } from "../../data/portfolio";
import Button from "../ui/Button";

const roles = [
  "Full Stack Developer",
  "ML Engineer",
  "Data Engineer",
  "Backend Architect",
  "GenAI Explorer",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout: number;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(20px, 5vw, 60px)",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Orbital decorative element */}
      <div
        style={{
          position: "absolute",
          right: "-60px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "420px",
          height: "420px",
          pointerEvents: "none",
          opacity: 0.18,
        }}
        className="orbital-wrap"
      >
        <svg viewBox="0 0 420 420" style={{ width: "100%", height: "100%", animation: "spin-slow 30s linear infinite" }}>
          <circle cx="210" cy="210" r="190" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="8 6" />
          <circle cx="210" cy="210" r="130" fill="none" stroke="var(--accent-2)" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="210" cy="20" r="6" fill="var(--accent)" />
          <circle cx="380" cy="260" r="4" fill="var(--accent-2)" />
          <circle cx="80" cy="330" r="5" fill="var(--accent-3)" />
          <circle cx="210" cy="210" r="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="210" cy="210" r="8" fill="var(--accent)" opacity="0.8" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>
        <p
          className="mono"
          style={{
            fontSize: "0.78rem",
            color: "var(--accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "24px",
            opacity: 0.9,
          }}
        >
          ◈ Hello, Universe
        </p>

        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}
        >
          {personalInfo.name.split(" ")[0]}
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, var(--accent), var(--accent-2))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {personalInfo.name.split(" ")[1]}
          </span>
        </h1>

        {/* Typewriter */}
        <div
          style={{
            height: "44px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "var(--text-secondary)",
              letterSpacing: "0.02em",
            }}
          >
            {displayed}
            <span
              className="cursor-blink"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.2em",
                background: "var(--accent)",
                marginLeft: "3px",
                verticalAlign: "middle",
              }}
            />
          </span>
        </div>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "520px",
            marginBottom: "44px",
          }}
        >
          {personalInfo.tagline}
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
          <Button href="#projects" variant="primary" size="lg">
            View Projects
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            Get in Touch
          </Button>
          <Button href={personalInfo.github} variant="outline" size="lg" external>
            GitHub ↗
          </Button>
        </div>

        {/* Status indicator */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              display: "block",
              animation: "glow-pulse 2s ease-in-out infinite",
              boxShadow: "0 0 8px #10b981",
            }}
          />
          <span
            className="mono"
            style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}
          >
            Available for opportunities · Agra, India
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <span className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--text-muted)" }}>SCROLL</span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .orbital-wrap { display: none; }
        }
      `}</style>
    </section>
  );
}