"use client";

const LOGO_TEXT = "RAY.SIMON";

type Props = { onClick: () => void };

export function NavLogo({ onClick }: Props) {
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
            color: "var(--cyan)",
            textShadow: "0 0 16px rgba(0,212,255,0.6)",
            transition: "text-shadow 0.5s",
            fontFamily: "Orbitron, JetBrains Mono, monospace",
          }}
          data-text={LOGO_TEXT}
          className="glitch-text"
        >
          {LOGO_TEXT}
        </span>

        <span
          style={{
            width: "7px",
            height: "14px",
            background: "var(--green)",
            borderRadius: "1px",
            animation: "blink 1s step-end infinite",
            boxShadow: "0 0 8px rgba(0,255,136,0.8)",
            display: "inline-block",
          }}
        />
      </div>
    </button>
  );
}

