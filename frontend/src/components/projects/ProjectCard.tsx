import Image from "next/image";
import type { Project } from "@/types";

type Props = {
  p: Project;
  d: number;
  onClick: () => void;
};

export function ProjectCard({ p, d, onClick }: Props) {
  const inRange = Math.abs(d) <= 2;
  const scale   = d === 0 ? 1 : Math.abs(d) === 1 ? 0.82 : 0.67;
  const opacity = d === 0 ? 1 : Math.abs(d) === 1 ? 0.5 : 0.2;
  const x       = d * 380;
  const z       = 50 - Math.abs(d);
  const isActive = d === 0;



  return (
    <button
      onClick={onClick}
      aria-label={`View ${p.title}`}
      style={{
        position: "absolute",
        textAlign: "left",
        outline: "none",
        border: "none",
        background: "none",
        padding: 0,
        cursor: "pointer",
        transform: `translateX(${x}px) scale(${scale})`,
        opacity: inRange ? opacity : 0,
        zIndex: z,
        pointerEvents: inRange ? "auto" : "none",
        transition: "transform 650ms cubic-bezier(.22,.61,.36,1), opacity 650ms ease",
      }}
    >
      <article
        style={{
          width: "320px",
          overflow: "hidden",
          borderRadius: "10px",
          border: isActive
            ? "1px solid rgba(0,212,255,0.4)"
            : "1px solid rgba(0,212,255,0.1)",
          background: isActive ? "rgba(13,27,42,0.95)" : "rgba(10,21,32,0.85)",
          boxShadow: isActive
            ? "0 0 60px rgba(0,212,255,0.12), 0 0 120px rgba(0,212,255,0.06), 0 24px 48px rgba(0,0,0,0.7)"
            : "0 8px 32px rgba(0,0,0,0.5)",
          transition: "all 0.3s",
          position: "relative",
        }}
      >

        {isActive && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, var(--green), var(--cyan), var(--green))",
              zIndex: 10,
            }}
          />
        )}


        <div style={{ position: "relative", height: "220px", background: "var(--bg)" }}>
          <Image src={p.image} alt={p.title} fill className="object-cover" />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(13,27,42,1) 0%, rgba(13,27,42,0.3) 50%, transparent 100%)",
            }}
          />


          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: isActive ? "var(--green)" : "var(--text-muted)",
              background: "rgba(5,10,14,0.9)",
              border: isActive ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(0,212,255,0.1)",
              borderRadius: "4px",
              padding: "3px 8px",
              zIndex: 15,
            }}
          >
            {p.codeName || "MISSION_ACTIVE"}
          </div>
        </div>


        <div style={{ padding: "16px 18px 18px" }}>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
            <h3
              style={{
                fontFamily: "Orbitron, JetBrains Mono, monospace",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isActive ? "var(--text)" : "rgba(226,234,245,0.7)",
                letterSpacing: "0.04em",
                lineHeight: 1.3,
              }}
            >
              {p.title}
            </h3>
          </div>


          <p
            style={{
              marginTop: "10px",
              fontSize: "0.75rem",
              color: isActive ? "var(--text-dim)" : "rgba(107,128,153,0.6)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {p.desc}
          </p>


          <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {p.tech.slice(0, 5).map((t) => (
              <span key={t} className="badge-tech">{t}</span>
            ))}
            {p.tech.length > 5 && (
              <span className="badge-tech" style={{ opacity: 0.6 }}>+{p.tech.length - 5}</span>
            )}
          </div>


          {isActive && (
            <div
              style={{
                marginTop: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.65rem",
                color: "var(--cyan)",
                letterSpacing: "0.1em",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--cyan)",
                  boxShadow: "0 0 6px rgba(0,212,255,0.8)",
                  animation: "blink 1.5s ease infinite",
                }}
              />
              PRESS ENTER OR CLICK TO OPEN
            </div>
          )}
        </div>
      </article>
    </button>
  );
}
