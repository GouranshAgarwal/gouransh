import { personalInfo } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px clamp(20px, 5vw, 60px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <p className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
        © {new Date().getFullYear()} {personalInfo.name} · Built with React + Express
      </p>
      <p className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
        Designed & developed with ♥
      </p>
    </footer>
  );
}