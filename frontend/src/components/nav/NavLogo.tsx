"use client";

import { useEffect, useState } from "react";

const LOGO_TEXT = "<RSimon>";
const TYPE_SPEED = 75;

type Props = { onClick: () => void };

export function NavLogo({ onClick }: Props) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typed.length >= LOGO_TEXT.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(
      () => setTyped(LOGO_TEXT.slice(0, typed.length + 1)),
      TYPE_SPEED
    );
    return () => clearTimeout(t);
  }, [typed]);

  return (
    <button onClick={onClick} aria-label="Go to Home" className="shrink-0 group">
      <span
        className={[
          "font-mono text-xl font-semibold inline-flex items-baseline",
          "transition-all duration-300",
          "group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.75)] group-hover:scale-105",
        ].join(" ")}
      >
        {typed.split("").map((char, i) =>
          char === "<" || char === ">" ? (
            <span key={i} className="text-slate-500 transition-colors duration-300 group-hover:text-slate-300">
              {char}
            </span>
          ) : (
            <span key={i} className="text-cyan-400">{char}</span>
          )
        )}
        <span
          style={{ animation: "blink 1s step-end infinite" }}
          className={done ? "text-cyan-400" : "text-slate-400"}
        >
          {done ? "|" : "_"}
        </span>
      </span>
    </button>
  );
}
