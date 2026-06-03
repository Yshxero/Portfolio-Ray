"use client";

import React from "react";
import { Brain, Cpu, Monitor, Server, Smartphone, Database, FlaskConical, Wrench } from "lucide-react";
import { groups } from "@/data/skills";
import type { Group } from "@/types";


const groupIcon: Record<Exclude<Group, "All">, React.ComponentType<{ style?: React.CSSProperties }>> = {
  Database,
  "Web Frontend":  Brain,
  Backend:         Server,
  Desktop:         Monitor,
  Mobile:          Smartphone,
  "IoT / Embedded": Cpu,
  "Data / ML":     FlaskConical,
  "Other Tools":   Wrench,
};

type Props = { active: Group; setActive: (g: Group) => void };

export function FilterPills({ active, setActive }: Props) {
  return (
    <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
      <div style={{ display: "flex", gap: "8px", width: "max-content" }} className="sm:flex-wrap sm:w-auto">
        {groups.map((g) => {
          const Icon = g === "All" ? Brain : groupIcon[g as Exclude<Group, "All">];
          const isActive = active === g;
          return (
            <button
              key={g}
              id={`filter-${g.replace(/[\s/]/g, "-").toLowerCase()}`}
              onClick={() => setActive(g)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "4px",
                border: isActive
                  ? "1px solid rgba(0,255,136,0.4)"
                  : "1px solid rgba(0,212,255,0.12)",
                background: isActive
                  ? "rgba(0,255,136,0.08)"
                  : "rgba(10,21,32,0.6)",
                cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                color: isActive ? "var(--green)" : "var(--text-dim)",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                boxShadow: isActive ? "0 0 10px rgba(0,255,136,0.1)" : "none",
              }}
            >
              {Icon && (
                <Icon
                  style={{
                    width: "13px",
                    height: "13px",
                    color: isActive ? "var(--green)" : "var(--text-muted)",
                  }}
                />
              )}
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
}
