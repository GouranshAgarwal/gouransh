import { useState } from "react";
import { projects } from "../../data/portfolio";
import type { Project } from "../../data/portfolio";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Tag from "../ui/Tag";
import Button from "../ui/Button";
import { useInView } from "../../hooks/useInView";

const statusConfig: Record<string, { label: string; color: string }> = {
  live: { label: "Live", color: "#10b981" },
  wip: { label: "In Progress", color: "#f59e0b" },
  archived: { label: "Archived", color: "#6b7280" },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const status = statusConfig[project.status];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fade-up fade-up-delay-${(index % 3) + 1} ${inView ? "visible" : ""}`}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? project.color + "50" : "var(--border)"}`,
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px ${project.color}20` : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color accent top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                color: status.color,
                background: `${status.color}18`,
                border: `1px solid ${status.color}35`,
                padding: "3px 10px",
                borderRadius: "20px",
                letterSpacing: "0.06em",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: status.color,
                  animation: project.status === "live" ? "glow-pulse 2s infinite" : "none",
                }}
              />
              {status.label}
            </span>
            <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
              {project.year}
            </span>
          </div>
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.92rem" }}>
        {project.description}
      </p>

      {/* Highlights */}
      <div
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "8px",
          padding: "14px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
        }}
      >
        {project.highlights.map((h: string) => (
          <div key={h} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <span style={{ color: project.color, fontSize: "0.7rem", marginTop: "4px" }}>▸</span>
            <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {project.tags.map((tag: string) => (
          <Tag key={tag} label={tag} color={project.color} />
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="primary" size="sm" external>
            Live Demo ↗
          </Button>
        )}
        {project.codeUrl && (
          <Button href={project.codeUrl} variant="outline" size="sm" external>
            Source Code ↗
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading label="What I've built" title="Projects" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <div
        style={{
          marginTop: "48px",
          textAlign: "center",
          padding: "28px",
          background: "var(--bg-card)",
          border: "1px dashed var(--border)",
          borderRadius: "12px",
          color: "var(--text-muted)",
        }}
      >
        <p className="mono" style={{ fontSize: "0.8rem", letterSpacing: "0.08em", marginBottom: "8px" }}>
          More projects coming soon
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Check GitHub for the latest work ↗
        </p>
      </div>
    </Section>
  );
}