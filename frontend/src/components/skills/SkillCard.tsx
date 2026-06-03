import Image from "next/image";
import type { Skill } from "@/types";

export function SkillCard({ s }: { s: Skill }) {
  const Icon = s.icon;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "rgba(13,27,42,0.8)",
        border: "1px solid rgba(0,212,255,0.1)",
        borderRadius: "8px",
        padding: "14px 16px",
        transition: "all 0.25s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      className="card-ce"
    >

      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: "2px",
          background: "linear-gradient(180deg, var(--green), var(--cyan))",
          borderRadius: "1px",
          opacity: 0.5,
        }}
      />


      <div
        style={{
          width: "40px",
          height: "40px",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          background: "rgba(0,212,255,0.05)",
          border: "1px solid rgba(0,212,255,0.15)",
          borderRadius: "8px",
          transition: "all 0.25s",
        }}
      >
        {s.src ? (
          <Image src={s.src} alt={s.name} width={22} height={22} />
        ) : Icon ? (
          <span style={{ display: "flex", color: "var(--cyan)", width: "18px", height: "18px" }}>
            <Icon className="w-full h-full" />
          </span>
        ) : null}
      </div>


      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--text)",
            letterSpacing: "0.04em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {s.name}
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            letterSpacing: "0.08em",
            marginTop: "2px",
          }}
        >
          {s.group}
        </div>
      </div>
    </div>
  );
}
