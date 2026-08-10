import Image from "next/image";
import { X, ExternalLink, Github, FileText, Download } from "lucide-react";
import type { Project } from "@/types";

type Props = { project: Project; onClose: () => void };

export function ProjectModal({ project, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "rgba(5,10,14,0.88)",
        backdropFilter: "blur(16px)",
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          overflow: "hidden",
          borderRadius: "10px",
          border: "1px solid rgba(0,212,255,0.25)",
          background: "rgba(13,27,42,0.98)",
          boxShadow: "0 0 80px rgba(0,212,255,0.1), 0 32px 64px rgba(0,0,0,0.8)",
          position: "relative",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--green), var(--cyan), var(--green))",
          }}
        />


        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(0,212,255,0.1)",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
          <span
            style={{
              marginLeft: "10px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              flex: 1,
            }}
          >
            MISSION_DETAIL.log
          </span>
          <button
            id="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "4px",
              padding: "4px",
              cursor: "pointer",
              color: "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-dim)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.2)";
            }}
          >
            <X size={14} />
          </button>
        </div>


        <div style={{ position: "relative", height: "220px" }}>
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(13,27,42,1) 0%, rgba(13,27,42,0.2) 60%, transparent 100%)",
            }}
          />
        </div>


        <div style={{ padding: "20px 24px 24px" }}>

          <h3
            style={{
              fontFamily: "Orbitron, JetBrains Mono, monospace",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "0.04em",
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>

          {project.codeName && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                fontSize: "0.65rem",
                color: "var(--green)",
                letterSpacing: "0.08em",
                marginTop: "6px",
                marginBottom: "4px",
              }}
            >
              <span>MISSION_ID: {project.codeName}</span>
              <span style={{ color: "var(--text-muted)" }}>|</span>
              <span style={{ color: "var(--cyan)" }}>STATUS: {project.status || "ACTIVE"}</span>
            </div>
          )}

          {project.highlight && (
            <div
              style={{
                marginTop: "10px",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.72rem",
                color: "var(--green)",
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.25)",
                borderRadius: "6px",
                padding: "8px 12px",
                letterSpacing: "0.03em",
                display: "inline-block",
              }}
            >
              {project.highlight}
            </div>
          )}

          <p
            style={{
              marginTop: "12px",
              color: "var(--text-dim)",
              lineHeight: 1.7,
              fontSize: "0.875rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {project.desc}
          </p>


          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tech.map((t) => (
                <span key={t} className="badge-tech">{t}</span>
              ))}
            </div>
          </div>


          <div
            style={{
              margin: "20px 0",
              height: "1px",
              background: "rgba(0,212,255,0.1)",
            }}
          />


          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {project.pdf && (
              <>
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noreferrer"
                  id="modal-view-pdf"
                  style={{ textDecoration: "none" }}
                >
                  <span className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <FileText size={13} /> VIEW PDF
                  </span>
                </a>
                <a
                  href={project.pdf}
                  download
                  id="modal-download-pdf"
                  style={{ textDecoration: "none" }}
                >
                  <span className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Download size={13} /> DOWNLOAD
                  </span>
                </a>
              </>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                id="modal-live"
                style={{ textDecoration: "none" }}
              >
                <span className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <ExternalLink size={13} /> LIVE APP
                </span>
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                id="modal-repo"
                style={{ textDecoration: "none" }}
              >
                <span className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Github size={13} /> GITHUB
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
