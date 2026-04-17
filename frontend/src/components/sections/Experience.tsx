import { experience } from "../../data/portfolio";
import type { ExperienceItem } from "../../data/portfolio";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { useInView } from "../../hooks/useInView";

interface ExperienceCardProps extends ExperienceItem {}

function ExperienceCard({ role, company, period, bullets }: ExperienceCardProps) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`exp-card-grid fade-up ${inView ? "visible" : ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "40px",
        position: "relative",
      }}
    >
      {/* Left: metadata */}
      <div style={{ paddingTop: "4px" }}>
        <p
          className="mono"
          style={{
            fontSize: "0.72rem",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          {period}
        </p>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
          {role}
        </h3>
        <p style={{ color: "var(--accent-2)", fontWeight: 600, fontSize: "0.9rem" }}>
          {company}
        </p>
      </div>

      {/* Right: bullets */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "28px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-bright)";
          e.currentTarget.style.boxShadow = "0 8px 32px var(--accent-glow)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
          {bullets.map((b: string, i: number) => (
            <li
              key={i}
              style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
            >
              <span
                style={{
                  display: "block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  marginTop: "8px",
                  flexShrink: 0,
                  boxShadow: "0 0 6px var(--accent-glow)",
                }}
              />
              <span style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.95rem" }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading label="Work History" title="Experience" />
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {experience.map((exp) => (
          <ExperienceCard key={exp.company} {...exp} />
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .exp-card-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </Section>
  );
}