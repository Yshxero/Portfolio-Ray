"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { skills } from "@/data/skills";
import type { Group } from "@/types";
import { FilterPills } from "./FilterPills";
import { SkillCard } from "./SkillCard";
import { SkillsOrbit } from "./SkillsOrbit";
import { logSystemEvent } from "@/lib/logger";

export function Skills() {
  const [active, setActive] = useState<Group>("All");
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (active === "All") return skills;
    return skills.filter((s) => s.group === active);
  }, [active]);

// imports moved to top level

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    logSystemEvent(`Active category filter set to: ${active}`);
  }, [active]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          logSystemEvent("Loading skill_arsenal module... status: OPTIMAL.");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
      <div
        style={{
          paddingTop: "16px",
          paddingBottom: "24px",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono), JetBrains Mono, monospace",
            fontSize: "0.72rem",
            marginBottom: "12px",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "var(--green)" }}>operator@portfolio</span>
          <span style={{ color: "var(--text-muted)" }}>:</span>
          <span style={{ color: "var(--cyan)" }}>~</span>
          <span style={{ color: "var(--text-muted)" }}>$</span>
          <span style={{ color: "var(--text)" }}>load --module=tech-stack</span>
        </div>
        <h2
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "0.05em",
          }}
        >
          Tech Stack
        </h2>
        <p style={{ marginTop: "8px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "var(--text-dim)" }}>
          {">"} Technologies I&apos;ve deployed across my missions
        </p>

        <div
          style={{
            marginTop: "16px",
            height: "1px",
            background: "linear-gradient(90deg, rgba(0,255,136,0.5), rgba(0,212,255,0.5), transparent)",
            width: vis ? "100%" : "0%",
            transition: "width 1s ease 0.3s",
          }}
        />
      </div>

      <div
        style={{
          opacity: vis ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
          marginBottom: "28px",
        }}
      >
        <FilterPills active={active} setActive={setActive} />
      </div>

      <div
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
        }}
      >
        {active === "All" ? (
          <SkillsOrbit />
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            }}
          >
            {filtered.map((s) => (
              <SkillCard key={`${s.group}-${s.name}`} s={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
