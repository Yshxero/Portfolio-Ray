"use client";

import { useEffect, useState } from "react";

const BOOT_SEQUENCE = [
  "SYS_INIT...",
  "RAY.SIMON",
];

const LOGO_TEXT = "RAY.SIMON";
const TYPE_SPEED = 50;

type Props = { onClick: () => void };

export function NavLogo({ onClick }: Props) {
  const [phase, setPhase]   = useState(0);
  const [typed, setTyped]   = useState("RAY.SIMON");
  const [done,  setDone]    = useState(true);

  useEffect(() => {
    // Fast boot sequence
    const t = setTimeout(() => {
      setPhase(1);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  const currentLabel = phase === 0 ? "RAY.SIMON" : LOGO_TEXT;

  return (
    <button
      onClick={onClick}
      aria-label="Go to Home"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >

        <span
          style={{
            fontSize: "0.65rem",
            color: "rgba(0,255,136,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          SYS://
        </span>


        <span
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: done ? "var(--cyan)" : "rgba(0,212,255,0.7)",
            textShadow: done ? "0 0 16px rgba(0,212,255,0.6)" : "none",
            transition: "text-shadow 0.5s",
            fontFamily: "Orbitron, JetBrains Mono, monospace",
          }}
          data-text={currentLabel}
          className={done ? "glitch-text" : ""}
        >
          {currentLabel}
        </span>


        <span
          style={{
            width: "7px",
            height: "14px",
            background: done ? "var(--green)" : "var(--cyan)",
            opacity: done ? undefined : 0.7,
            borderRadius: "1px",
            animation: "blink 1s step-end infinite",
            boxShadow: done
              ? "0 0 8px rgba(0,255,136,0.8)"
              : "0 0 4px rgba(0,212,255,0.5)",
            display: "inline-block",
          }}
        />
      </div>
    </button>
  );
}
