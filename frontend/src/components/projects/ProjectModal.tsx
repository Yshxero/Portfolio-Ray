"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, FileText, Download } from "lucide-react";
import type { Project } from "@/types";

type Props = { project: Project; onClose: () => void };

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

export function ProjectModal({ project, onClose }: Props) {
  const accent = getCategoryAccent(project.category);

  // Lock body scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        {/* Top gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, var(--green), ${accent.color}, var(--green))`,
            zIndex: 11,
          }}
        />

        {/* Title bar */}
        <div className="modal-titlebar">
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
          <span
            style={{
              marginLeft: "10px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.62rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              flex: 1,
            }}
          >
            {project.codeName || "MISSION_DETAIL"}.log
          </span>
          <button
            id="modal-close"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={12} />
            <span>ESC</span>
          </button>
        </div>

        {/* Hero image */}
        <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.85)" }}
          />
          {/* Gradient overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(13,27,42,1) 0%, rgba(13,27,42,0.3) 50%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, transparent 40%, ${accent.dim} 100%)`,
              opacity: 0.6,
            }}
          />

          {/* Category pill on image */}
          {project.category && (
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.06em",
                color: accent.color,
                background: "rgba(5,10,14,0.8)",
                border: `1px solid ${accent.border}`,
                borderRadius: "6px",
                padding: "4px 12px",
                backdropFilter: "blur(8px)",
              }}
            >
              {project.category.toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 28px" }}>
          {/* Title */}
          <h3
            style={{
              fontFamily: "Orbitron, JetBrains Mono, monospace",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "0.03em",
              lineHeight: 1.35,
            }}
          >
            {project.title}
          </h3>

          {/* Mission ID & Status */}
          {project.codeName && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.62rem",
                marginTop: "8px",
                marginBottom: "6px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: accent.color,
                  background: accent.dim,
                  padding: "2px 8px",
                  borderRadius: "4px",
                  letterSpacing: "0.06em",
                }}
              >
                {project.codeName}
              </span>
              <span style={{ color: "var(--text-muted)" }}>│</span>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                    display: "inline-block",
                  }}
                />
                <span style={{ color: "var(--green)", letterSpacing: "0.06em" }}>
                  {project.status || "ACTIVE"}
                </span>
              </span>
            </div>
          )}

          {/* Highlight */}
          {project.highlight && (
            <div
              style={{
                marginTop: "14px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.72rem",
                color: accent.color,
                background: accent.dim,
                border: `1px solid ${accent.border}`,
                borderRadius: "8px",
                padding: "10px 14px",
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
              marginTop: "16px",
              color: "var(--text-dim)",
              lineHeight: 1.75,
              fontSize: "0.88rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {project.desc}
          </p>

          {/* Tech Stack section */}
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                marginBottom: "10px",
              }}
            >
              TECH STACK
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tech.map((t) => (
                <span key={t} className="badge-tech">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              margin: "24px 0",
              height: "1px",
              background: `linear-gradient(90deg, ${accent.border}, transparent)`,
            }}
          />

          {/* Actions */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                id="modal-live"
                className="modal-action-btn modal-action-primary"
              >
                <ExternalLink size={14} /> LIVE APP
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                id="modal-repo"
                className="modal-action-btn modal-action-secondary"
              >
                <Github size={14} /> GITHUB
              </a>
            )}
            {project.pdf && (
              <>
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noreferrer"
                  id="modal-view-pdf"
                  className="modal-action-btn modal-action-secondary"
                >
                  <FileText size={14} /> VIEW PDF
                </a>
                <a
                  href={project.pdf}
                  download
                  id="modal-download-pdf"
                  className="modal-action-btn modal-action-secondary"
                >
                  <Download size={14} /> DOWNLOAD
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
