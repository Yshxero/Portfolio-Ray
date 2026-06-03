"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Facebook, ArrowUpRight, Send, MapPin, Clock } from "lucide-react";
import { site } from "@/data/site";
import { logSystemEvent } from "@/lib/logger";


export function Contact() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          logSystemEvent("Standing by for secure transmission uplink...");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ maxWidth: "1152px", margin: "0 auto", padding: "48px 24px 48px" }}>

      <div
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          marginBottom: "40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span className="chapter-label">[ OPEN CHANNEL ]</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(0,255,136,0.15)" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
          <div>
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
              <span style={{ color: "var(--text)" }}>establish-link --channel=direct</span>
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
              Contact
            </h2>
            <p style={{ marginTop: "8px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: "var(--text-dim)" }}>
              {">"} Transmission open — PING me anytime
            </p>
          </div>

          <a
            href={`mailto:${site.email}`}
            id="contact-email-cta"
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
          >
            <Send size={13} />
            SEND TRANSMISSION
          </a>
        </div>

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
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >

        <ContactCard delay={0} title="Email">
          <a
            href={`mailto:${site.email}`}
            style={{
              display: "block",
              marginTop: "12px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.78rem",
              color: "var(--cyan)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              wordBreak: "break-all",
            }}
          >
            {site.email}
          </a>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "12px",
            }}
          >
            <Mail size={13} style={{ color: "var(--green)" }} />
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--text-muted)" }}>
              Fastest signal path
            </p>
          </div>
        </ContactCard>


        <ContactCard delay={100} title="Find me on">
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { href: site.github, Icon: Github, label: "GitHub", id: "social-github" },
              { href: site.linkedin, Icon: Linkedin, label: "LinkedIn", id: "social-linkedin" },
              { href: site.facebook, Icon: Facebook, label: "Facebook", id: "social-facebook" },
            ].map(({ href, Icon, label, id }) => (
              <a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(0,212,255,0.08)",
                  background: "rgba(0,212,255,0.03)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
                  logSystemEvent(`Target link lock-on: ${label}`);
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.08)";
                }}
                onClick={() => logSystemEvent(`Redirecting to node: ${label}`)}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.06em",
                  }}
                >
                  <Icon size={14} style={{ color: "var(--cyan)", flexShrink: 0 }} />
                  {label.toUpperCase()}
                </span>
                <ArrowUpRight size={13} style={{ color: "var(--text-muted)" }} />
              </a>
            ))}
          </div>
        </ContactCard>


        <ContactCard delay={200} title="Availability">
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="status-online" />
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: "var(--text)", letterSpacing: "0.06em" }}>
                OPEN TO OPPORTUNITIES
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <MapPin size={13} style={{ color: "var(--cyan)", flexShrink: 0 }} />
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.06em" }}>
                LOCATION: Philippines (PH)
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Clock size={13} style={{ color: "var(--amber)", flexShrink: 0 }} />
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.06em" }}>
                RESPONSE_TIME: {"<"} 24h
              </p>
            </div>


            <div
              style={{
                marginTop: "4px",
                padding: "10px 12px",
                borderRadius: "4px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,255,136,0.1)",
              }}
            >
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
                <span style={{ color: "var(--green)" }}>{">"}</span>{" "}
                Seeking collaborations,{" "}
                <span style={{ color: "var(--cyan)" }}>freelance</span>,{" "}
                <span style={{ color: "var(--cyan)" }}>full-time</span> roles.
              </p>
            </div>
          </div>
        </ContactCard>
      </div>


      <footer
        style={{
          marginTop: "60px",
          padding: "20px 0",
          borderTop: "1px solid rgba(0,212,255,0.08)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          opacity: vis ? 1 : 0,
          transition: "opacity 0.7s ease 0.4s",
        }}
      >
        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          <span style={{ color: "var(--green)" }}>©</span>{" "}
          {new Date().getFullYear()} {site.shortName} — Built with{" "}
          <span style={{ color: "var(--cyan)" }}>Next.js</span> +{" "}
          <span style={{ color: "var(--cyan)" }}>TypeScript</span>
        </p>
        <a
          href="#home"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.65rem",
            color: "var(--cyan)",
            textDecoration: "none",
            letterSpacing: "0.12em",
            transition: "color 0.2s",
          }}
        >
          [SCROLL_TO_TOP ↑]
        </a>
      </footer>
    </div>
  );
}

function ContactCard({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        flex: "1 1 260px",
        background: "rgba(13,27,42,0.85)",
        border: "1px solid rgba(0,212,255,0.12)",
        borderRadius: "10px",
        padding: "22px 24px",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${delay}ms`,
      }}
      className="card-ce"
    >

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40px",
          height: "2px",
          background: "linear-gradient(90deg, var(--green), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "2px",
          height: "40px",
          background: "linear-gradient(180deg, var(--green), transparent)",
        }}
      />

      <p style={{ fontFamily: "Orbitron, JetBrains Mono, monospace", fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", letterSpacing: "0.08em" }}>
        {title.toUpperCase()}
      </p>
      {children}
    </div>
  );
}
