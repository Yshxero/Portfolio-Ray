"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { projects, archiveProjects } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  FileText,
  Filter,
  ArrowRight,
} from "lucide-react";
import type { Project, ProjectCategory } from "@/types";

/* ── helpers ─────────────────────────────── */

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const CATEGORIES: { label: ProjectCategory; icon: string }[] = [
  { label: "All", icon: "◉" },
  { label: "AI & RAG", icon: "⟡" },
  { label: "Rust & Systems", icon: "⚙" },
  { label: "IoT & Hardware", icon: "◈" },
  { label: "Full-Stack", icon: "⬡" },
];

function getCategoryAccent(cat?: string) {
  switch (cat) {
    case "AI & RAG":
      return { color: "var(--cat-ai)", dim: "var(--cat-ai-dim)", border: "var(--cat-ai-border)" };
    case "Rust & Systems":
      return { color: "var(--cat-rust)", dim: "var(--cat-rust-dim)", border: "var(--cat-rust-border)" };
    case "IoT & Hardware":
      return { color: "var(--cat-iot)", dim: "var(--cat-iot-dim)", border: "var(--cat-iot-border)" };
    case "Full-Stack":
      return { color: "var(--cat-fs)", dim: "var(--cat-fs-dim)", border: "var(--cat-fs-border)" };
    default:
      return { color: "var(--cyan)", dim: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.3)" };
  }
}

/* ── main component ─────────────────────── */

export function ProjectsCarousel() {
  const [category, setCategory] = useState<ProjectCategory>("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [spotlightKey, setSpotlightKey] = useState(0); // for re-triggering animation

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
    setSpotlightKey((k) => k + 1);
  }, [category]);

  const gor = useCallback(() => {
    if (total === 0) return;
    setActive((a) => mod(a + 1, total));
    setSpotlightKey((k) => k + 1);
  }, [total]);

  const gol = useCallback(() => {
    if (total === 0) return;
    setActive((a) => mod(a - 1, total));
    setSpotlightKey((k) => k + 1);
  }, [total]);

  useEffect(() => {
    if (paused || selectedProject !== null || total === 0) return;
    const id = window.setInterval(gor, 5000);
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

  const p = filteredProjects[active] || filteredProjects[0];
  const accent = p ? getCategoryAccent(p.category) : getCategoryAccent();

  return (
    <>
      {/* ── Category Filter Pills ─────────────── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginRight: "8px",
            color: "var(--text-muted)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.72rem",
          }}
        >
          <Filter size={13} style={{ color: "var(--cyan)" }} />
          <span>FILTER:</span>
        </div>

        {CATEGORIES.map(({ label, icon }) => {
          const isSelected = category === label;
          const count =
            label === "All"
              ? projects.length + archiveProjects.length
              : projects.filter((p) => p.category === label).length +
                archiveProjects.filter((a) => a.category === label).length;

          return (
            <button
              key={label}
              className="filter-pill"
              data-active={isSelected}
              onClick={() => setCategory(label)}
            >
              <span style={{ fontSize: "0.8rem" }}>{icon}</span>
              <span>{label.toUpperCase()}</span>
              <span
                className="filter-pill-count"
                style={{
                  background: isSelected ? "var(--cyan)" : "rgba(255,255,255,0.07)",
                  color: isSelected ? "#050a0e" : "var(--text-muted)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Flagship Spotlight ─────────────────── */}
      {total > 0 ? (
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Progress + Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.7rem",
            }}
          >
            <button
              id="projects-prev"
              onClick={gol}
              aria-label="Previous project"
              style={{
                background: "rgba(13,27,42,0.9)",
                border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: "6px",
                padding: "6px 8px",
                cursor: "pointer",
                color: "var(--text-muted)",
                transition: "all 0.25s",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <span style={{ color: "var(--text-muted)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
              MISSION {String(active + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>

            <div style={{ flex: 1, height: "2px", background: "rgba(0,212,255,0.08)", borderRadius: "1px" }}>
              <div
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, var(--green), ${accent.color})`,
                  width: `${((active + 1) / total) * 100}%`,
                  transition: "width 0.6s cubic-bezier(.22,.61,.36,1)",
                  boxShadow: `0 0 12px ${accent.color}40`,
                  borderRadius: "1px",
                }}
              />
            </div>

            <button
              id="projects-next"
              onClick={gor}
              aria-label="Next project"
              style={{
                background: "rgba(13,27,42,0.9)",
                border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: "6px",
                padding: "6px 8px",
                cursor: "pointer",
                color: "var(--text-muted)",
                transition: "all 0.25s",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Spotlight Card */}
          {p && (
            <SpotlightCard
              key={spotlightKey}
              project={p}
              accent={accent}
              onOpen={() => setSelectedProject(p)}
            />
          )}

          {/* Dot indicators */}
          <div
            style={{
              marginTop: "24px",
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
                onClick={() => {
                  setActive(i);
                  setSpotlightKey((k) => k + 1);
                }}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width: i === active ? "28px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === active
                      ? `linear-gradient(90deg, var(--green), ${accent.color})`
                      : "rgba(0,212,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(.22,.61,.36,1)",
                  boxShadow: i === active ? `0 0 10px ${accent.color}60` : "none",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "48px 32px",
            textAlign: "center",
            background: "rgba(10,21,32,0.5)",
            border: "1px dashed rgba(0,212,255,0.15)",
            borderRadius: "12px",
            color: "var(--text-muted)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.8rem",
          }}
        >
          <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "8px" }}>∅</span>
          No flagship missions found under <span style={{ color: "var(--cyan)" }}>{category}</span>
        </div>
      )}

      {/* ── Archive Grid ──────────────────────── */}
      {filteredArchive.length > 0 && (
        <div style={{ marginTop: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.78rem",
                color: "var(--cyan)",
                letterSpacing: "0.1em",
              }}
            >
              [ AUXILIARY MISSIONS & ARCHIVE ]
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, rgba(0,212,255,0.2), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.68rem",
                color: "var(--text-muted)",
              }}
            >
              {filteredArchive.length} RECORDS
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredArchive.map((ap, i) => {
              const catAccent = getCategoryAccent(ap.category);
              return (
                <div
                  key={ap.title}
                  className="archive-card"
                  style={{
                    "--cat-accent": catAccent.color,
                    animationDelay: `${i * 0.08}s`,
                  } as React.CSSProperties}
                  onClick={() => setSelectedProject(ap)}
                >
                  <div>
                    {/* Header row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.6rem",
                          color: catAccent.color,
                          letterSpacing: "0.08em",
                          background: catAccent.dim,
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {ap.codeName || "ARCHIVE"}
                      </span>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.58rem",
                          color: "var(--text-muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {ap.status || "COMPLETED"}
                      </span>
                    </div>

                    {/* Title */}
                    <h4
                      style={{
                        fontFamily: "Orbitron, JetBrains Mono, monospace",
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "var(--text)",
                        marginBottom: "8px",
                        lineHeight: 1.35,
                      }}
                    >
                      {ap.title}
                    </h4>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-dim)",
                        lineHeight: 1.55,
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "16px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {ap.desc}
                    </p>
                  </div>

                  <div>
                    {/* Highlight */}
                    {ap.highlight && (
                      <div
                        style={{
                          marginBottom: "12px",
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.62rem",
                          color: catAccent.color,
                          background: catAccent.dim,
                          border: `1px solid ${catAccent.border}`,
                          borderRadius: "5px",
                          padding: "4px 8px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {ap.highlight}
                      </div>
                    )}

                    {/* Tech badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "16px" }}>
                      {ap.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="badge-tech"
                          style={{ fontSize: "0.6rem", padding: "2px 7px" }}
                        >
                          {t}
                        </span>
                      ))}
                      {ap.tech.length > 5 && (
                        <span
                          className="badge-tech"
                          style={{ fontSize: "0.6rem", padding: "2px 7px", opacity: 0.5 }}
                        >
                          +{ap.tech.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="archive-card-footer">
                      <span className="archive-card-cta">
                        VIEW DETAILS{" "}
                        <span className="archive-card-cta-arrow">→</span>
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {ap.repo && <Github size={13} style={{ color: "var(--text-muted)" }} />}
                        {ap.live && <ExternalLink size={13} style={{ color: "var(--text-muted)" }} />}
                        {ap.pdf && <FileText size={13} style={{ color: "var(--text-muted)" }} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

/* ── Spotlight Card ─────────────────────── */

function SpotlightCard({
  project,
  accent,
  onOpen,
}: {
  project: Project;
  accent: { color: string; dim: string; border: string };
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="spotlight-wrap"
      style={{ cursor: "pointer" }}
      onClick={onOpen}
    >
      {/* Image side */}
      <div className="spotlight-image-side">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            animation: "spotlight-image-in 0.7s cubic-bezier(0.22,0.61,0.36,1) forwards",
          }}
        />
        {/* Diagonal gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, transparent 30%, rgba(13,27,42,0.4) 60%, rgba(13,27,42,0.95) 100%)",
          }}
        />
        {/* Bottom fade for blending */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to top, rgba(13,27,42,0.9), transparent)",
          }}
        />

        {/* Code name badge on image */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: accent.color,
            background: "rgba(5,10,14,0.85)",
            border: `1px solid ${accent.border}`,
            borderRadius: "6px",
            padding: "4px 10px",
            zIndex: 5,
            backdropFilter: "blur(8px)",
          }}
        >
          {project.codeName || "MISSION_ACTIVE"}
        </div>

        {/* Category badge */}
        {project.category && (
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.06em",
              color: accent.color,
              background: accent.dim,
              border: `1px solid ${accent.border}`,
              borderRadius: "5px",
              padding: "3px 10px",
              zIndex: 5,
            }}
          >
            {project.category.toUpperCase()}
          </div>
        )}
      </div>

      {/* Content side */}
      <div
        className="spotlight-content-side"
        style={{
          animation: "spotlight-content-in 0.6s cubic-bezier(0.22,0.61,0.36,1) 0.15s both",
        }}
      >
        {/* Status line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.62rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 8px rgba(0,255,136,0.6)",
              animation: "blink 2s ease infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "var(--green)", letterSpacing: "0.08em" }}>
            {project.status || "ACTIVE"}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "Orbitron, JetBrains Mono, monospace",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "0.03em",
            lineHeight: 1.35,
            marginBottom: "14px",
          }}
        >
          {project.title}
        </h3>

        {/* Highlight */}
        {project.highlight && (
          <div
            style={{
              marginBottom: "14px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.68rem",
              color: accent.color,
              background: accent.dim,
              border: `1px solid ${accent.border}`,
              borderRadius: "6px",
              padding: "6px 12px",
              letterSpacing: "0.02em",
              display: "inline-block",
            }}
          >
            {project.highlight}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-dim)",
            lineHeight: 1.65,
            fontFamily: "Inter, sans-serif",
            marginBottom: "20px",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.desc}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
          {project.tech.map((t) => (
            <span key={t} className="badge-tech" style={{ fontSize: "0.65rem" }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.72rem",
            color: accent.color,
            letterSpacing: "0.06em",
            marginTop: "auto",
          }}
        >
          <ArrowRight size={14} />
          <span>CLICK TO VIEW FULL DETAILS</span>
        </div>
      </div>
    </div>
  );
}
