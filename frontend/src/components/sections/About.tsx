import { personalInfo, education, achievements } from "../../data/portfolio";
import type { Achievement } from "../../data/portfolio";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { useInView } from "../../hooks/useInView";

interface AchievementCardProps extends Achievement {
  delay: number;
}

function AchievementCard({ icon, title, detail, delay }: AchievementCardProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fade-up fade-up-delay-${delay} ${inView ? "visible" : ""}`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-bright)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px var(--accent-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span style={{ fontSize: "1.8rem" }}>{icon}</span>
      <div>
        <p style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>{title}</p>
        <p className="mono" style={{ fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.05em" }}>{detail}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeading label="Who I am" title="About Me" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Bio */}
        <div>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
            I'm a third-year Computer Science student at GLA University, passionate about building scalable systems, training intelligent models, and shipping products that matter.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
            From detecting exoplanets with ML to building real-time autonomous data pipelines at NITK Surathkal, I gravitate toward problems that sit at the intersection of data, intelligence, and engineering.
          </p>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            Currently exploring GenAI, LLM toolchains, and cloud-native backend architectures while pursuing my degree.
          </p>

          {/* Education card */}
          <div
            style={{
              marginTop: "36px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            {education.map((edu) => (
              <div key={edu.institution}>
                <p className="mono" style={{ fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.15em", marginBottom: "8px" }}>
                  EDUCATION
                </p>
                <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "4px" }}>
                  {edu.degree}
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "4px" }}>
                  {edu.institution}
                </p>
                <div style={{ display: "flex", gap: "20px", marginBottom: "12px" }}>
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{edu.period}</span>
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--accent-3)" }}>CPI: {edu.cpi}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {edu.coursework.map((c) => (
                    <span
                      key={c}
                      className="mono"
                      style={{
                        fontSize: "0.68rem",
                        padding: "3px 10px",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <p className="mono" style={{ fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.15em", marginBottom: "20px" }}>
            ACHIEVEMENTS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {achievements.map((a, i) => (
              <AchievementCard key={a.title} {...a} delay={i + 1} />
            ))}
          </div>

          {/* Links */}
          <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "10px 18px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--border-bright)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              GitHub ↗
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "10px 18px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent-3)";
                e.currentTarget.style.borderColor = "var(--accent-3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              LeetCode ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </Section>
  );
}