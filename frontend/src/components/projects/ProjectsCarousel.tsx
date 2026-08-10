"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { projects, archiveProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ChevronLeft, ChevronRight, ExternalLink, Github, FileText, Filter } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const CATEGORIES: { label: ProjectCategory; icon: string }[] = [
  { label: "All", icon: "🌐" },
  { label: "AI & RAG", icon: "🤖" },
  { label: "Rust & Systems", icon: "⚙️" },
  { label: "IoT & Hardware", icon: "🔌" },
  { label: "Full-Stack", icon: "💻" },
];

export function ProjectsCarousel() {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
  }, [category]);

  const filteredArchive = useMemo(() => {
    if (category === "All") return archiveProjects;
    return archiveProjects.filter((p) => p.category === category);
  }, [category]);

  const total = filteredProjects.length;

  useEffect(() => {
    setActive(0);
  }, [category]);

  const gor = useCallback(() => {
    if (total === 0) return;
    setActive((a) => mod(a + 1, total));
  }, [total]);

  const gol = useCallback(() => {
    if (total === 0) return;
    setActive((a) => mod(a - 1, total));
  }, [total]);

  useEffect(() => {
    if (paused || selectedProject !== null || total === 0) return;
    const id = window.setInterval(gor, 4000);
    return () => window.clearInterval(id);
  }, [paused, selectedProject, gor, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
      if (e.key === "ArrowLeft") gol();
      if (e.key === "ArrowRight") gor();
      if (e.key === "Enter" && !selectedProject && filteredProjects[active]) {
        setSelectedProject(filteredProjects[active]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gol, gor, active, selectedProject, filteredProjects]);

  const distance = (i: number) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const p = filteredProjects[active] || filteredProjects[0];

  return (
    <>
      {/* Category Filter Pills Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "8px", color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem" }}>
          <Filter size={13} style={{ color: "var(--cyan)" }} />
          <span>FILTER_BY_DOMAIN:</span>
        </div>

        {CATEGORIES.map(({ label, icon }) => {
          const isSelected = category === label;
          const count = label === "All" 
            ? projects.length + archiveProjects.length
            : projects.filter(p => p.category === label).length + archiveProjects.filter(a => a.category === label).length;

          return (
            <button
              key={label}
              onClick={() => setCategory(label)}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.04em",
                padding: "6px 14px",
                borderRadius: "6px",
                border: isSelected ? "1px solid var(--cyan)" : "1px solid rgba(0,212,255,0.15)",
                background: isSelected ? "rgba(0,212,255,0.12)" : "rgba(10,21,32,0.6)",
                color: isSelected ? "var(--cyan)" : "var(--text-dim)",
                cursor: "pointer",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: isSelected ? "0 0 16px rgba(0,212,255,0.2)" : "none",
              }}
            >
              <span>{icon}</span>
              <span>{label.toUpperCase()}</span>
              <span
                style={{
                  fontSize: "0.62rem",
                  padding: "1px 5px",
                  borderRadius: "3px",
                  background: isSelected ? "var(--cyan)" : "rgba(255,255,255,0.08)",
                  color: isSelected ? "#050a0e" : "var(--text-muted)",
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {total > 0 ? (
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Progress Bar & Active Title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.7rem",
            }}
          >
            <span style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}>
              FLAGSHIP MISSION {String(active + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(0,212,255,0.1)" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--green), var(--cyan))",
                  width: `${((active + 1) / total) * 100}%`,
                  transition: "width 0.5s cubic-bezier(.22,.61,.36,1)",
                  boxShadow: "0 0 8px rgba(0,212,255,0.5)",
                }}
              />
            </div>
            {p && (
              <span
                style={{
                  color: "var(--cyan)",
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "280px",
                  display: "inline-block",
                  textAlign: "right",
                  flexShrink: 0
                }}
                title={p.title.toUpperCase()}
              >
                {p.title.toUpperCase()}
              </span>
            )}
          </div>

          {/* Nav Controls */}
          <button
            id="projects-prev"
            onClick={gol}
            aria-label="Previous project"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              background: "rgba(13,27,42,0.9)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "6px",
              padding: "10px 8px",
              cursor: "pointer",
              color: "var(--cyan)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            id="projects-next"
            onClick={gor}
            aria-label="Next project"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              background: "rgba(13,27,42,0.9)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "6px",
              padding: "10px 8px",
              cursor: "pointer",
              color: "var(--cyan)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Cards Track */}
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              height: "380px",
              overflow: "hidden",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                insetBlock: 0,
                left: 0,
                zIndex: 10,
                width: "80px",
                background: "linear-gradient(to right, var(--bg), transparent)",
              }}
            />
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                insetBlock: 0,
                right: 0,
                zIndex: 10,
                width: "80px",
                background: "linear-gradient(to left, var(--bg), transparent)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {filteredProjects.map((proj, i) => (
                <ProjectCard
                  key={proj.title}
                  p={proj}
                  d={distance(i)}
                  onClick={() => {
                    if (i === active) setSelectedProject(proj);
                    else setActive(i);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                id={`project-dot-${i}`}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === active ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === active
                    ? "linear-gradient(90deg, var(--green), var(--cyan))"
                    : "rgba(0,212,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(.22,.61,.36,1)",
                  boxShadow: i === active ? "0 0 8px rgba(0,212,255,0.5)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "32px",
            textAlign: "center",
            background: "rgba(10,21,32,0.6)",
            border: "1px dashed rgba(0,212,255,0.2)",
            borderRadius: "8px",
            color: "var(--text-muted)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.8rem",
          }}
        >
          No flagship projects found under {category}
        </div>
      )}

      {/* Auxiliary & Archive Projects */}
      <div style={{ marginTop: "72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "var(--cyan)", letterSpacing: "0.1em" }}>
            [ AUXILIARY MISSIONS & ARCHIVE ]
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,212,255,0.15)" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--text-muted)" }}>
            {filteredArchive.length} RECORDS
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {filteredArchive.map((ap) => (
            <div
              key={ap.title}
              onClick={() => setSelectedProject(ap)}
              style={{
                background: "rgba(10,21,32,0.7)",
                border: "1px solid rgba(0,212,255,0.12)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,212,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "var(--green)", letterSpacing: "0.08em" }}>
                    {ap.codeName || "ARCHIVE"}
                  </span>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "var(--text-muted)" }}>
                    {ap.status || "COMPLETED"}
                  </span>
                </div>
                <h4 style={{ fontFamily: "Orbitron, JetBrains Mono, monospace", fontSize: "0.9rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                  {ap.title}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", lineHeight: 1.5, fontFamily: "Inter, sans-serif", marginBottom: "16px" }}>
                  {ap.desc}
                </p>
              </div>

              <div>
                {ap.highlight && (
                  <div
                    style={{
                      marginBottom: "12px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.62rem",
                      color: "var(--green)",
                      background: "rgba(0,255,136,0.06)",
                      border: "1px solid rgba(0,255,136,0.18)",
                      borderRadius: "4px",
                      padding: "3px 6px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {ap.highlight}
                  </div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "16px" }}>
                  {ap.tech.map((t) => (
                    <span key={t} className="badge-tech" style={{ fontSize: "0.6rem", padding: "2px 6px" }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--cyan)" }}>
                    VIEW DETAILS →
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {ap.repo && <Github size={14} style={{ color: "var(--text-muted)" }} />}
                    {ap.live && <ExternalLink size={14} style={{ color: "var(--text-muted)" }} />}
                    {ap.pdf && <FileText size={14} style={{ color: "var(--text-muted)" }} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}
