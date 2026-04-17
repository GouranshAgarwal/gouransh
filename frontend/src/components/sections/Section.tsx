import { type ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  const [ref, inView] = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className={`fade-up ${inView ? "visible" : ""} ${className}`}
      style={{
        padding: "100px 0",
        maxWidth: "1100px",
        margin: "0 auto",
        paddingLeft: "clamp(20px, 5vw, 60px)",
        paddingRight: "clamp(20px, 5vw, 60px)",
      }}
    >
      {children}
    </section>
  );
}