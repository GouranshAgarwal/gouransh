interface SectionHeadingProps {
  label: string;
  title: string;
}

export default function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: "60px" }}>
      <p
        className="mono"
        style={{
          fontSize: "0.72rem",
          color: "var(--accent)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        ◈ {label}
      </p>
      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}