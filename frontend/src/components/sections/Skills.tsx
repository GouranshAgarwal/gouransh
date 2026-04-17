import { skills } from "../../data/portfolio";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { useInView } from "../../hooks/useInView";

const categoryColors: Record<string, string> = {
  "Languages": "#6366f1",
  "Data & Backend": "#06b6d4",
  "Data Engineering": "#f59e0b",
  "Cloud & DevOps": "#10b981",
  "Tools & Systems": "#ec4899",
  "ML / Analytics": "#8b5cf6",
  "LLM / GenAI": "#f97316",
};

interface SkillCategoryProps {
  category: string;
  items: string[];
  color: string;
  delay: number;
}

function SkillCategory({ category, items, color, delay }: SkillCategoryProps) {
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
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.boxShadow = `0 8px 30px ${color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60px",
          height: "60px",
          background: `radial-gradient(circle at top right, ${color}20, transparent)`,
        }}
      />

      <p
        className="mono"
        style={{
          fontSize: "0.68rem",
          color: color,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        {category}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {items.map((skill) => (
          <SkillPill key={skill} label={skill} color={color} />
        ))}
      </div>
    </div>
  );
}

function SkillPill({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.75rem",
        padding: "5px 12px",
        borderRadius: "6px",
        background: `${color}12`,
        color: "var(--text-secondary)",
        border: `1px solid ${color}25`,
        transition: "all 0.2s ease",
        cursor: "default",
        letterSpacing: "0.03em",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${color}25`;
        e.currentTarget.style.color = color;
        e.currentTarget.style.borderColor = `${color}60`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `${color}12`;
        e.currentTarget.style.color = "var(--text-secondary)";
        e.currentTarget.style.borderColor = `${color}25`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label}
    </span>
  );
}

export default function Skills() {
  const entries = Object.entries(skills);

  return (
    <Section id="skills">
      <SectionHeading label="Tech Stack" title="Skills & Tools" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {entries.map(([cat, items], i) => (
          <SkillCategory
            key={cat}
            category={cat}
            items={items}
            color={categoryColors[cat] || "var(--accent)"}
            delay={(i % 5) + 1}
          />
        ))}
      </div>
    </Section>
  );
}