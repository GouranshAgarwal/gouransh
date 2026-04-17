interface TagProps {
  label: string;
  color?: string;
}

export default function Tag({ label, color }: TagProps) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.7rem",
        padding: "3px 10px",
        borderRadius: "4px",
        background: color ? `${color}18` : "var(--bg-secondary)",
        color: color || "var(--text-secondary)",
        border: `1px solid ${color ? `${color}35` : "var(--border)"}`,
        letterSpacing: "0.04em",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </span>
  );
}