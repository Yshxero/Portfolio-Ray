"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { FileText } from "lucide-react";


const ROLES = [
  "Full-Stack Developer",
  "IoT Systems Engineer",
  "Embedded Systems Dev",
  "Software Architect",
];


const STATS = [
  { label: "PROJECTS_DEPLOYED", value: "8+", color: "var(--cyan)" },
  { label: "TECH_STACK_ENTRIES", value: "20+", color: "var(--green)" },
  { label: "COMMIT_STATUS", value: "ACTIVE", color: "var(--amber)" },
];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [roleDir, setRoleDir] = useState<"typing" | "deleting">("typing");
  const [heroVis, setHeroVis] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const role = ROLES[roleIdx];
    if (roleDir === "typing") {
      if (roleText.length < role.length) {
        const t = setTimeout(() => setRoleText(role.slice(0, roleText.length + 1)), 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setRoleDir("deleting"), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (roleText.length > 0) {
        const t = setTimeout(() => setRoleText(role.slice(0, roleText.length - 1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleDir("typing");
      }
    }
  }, [roleText, roleDir, roleIdx]);


  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        width: "100%",
        opacity: heroVis ? 1 : 0,
        transform: heroVis ? "none" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Profile Details Section */}
      <section
        id="home"
        className="scroll-mt-20"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 24px",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "start",
          }}
          className="lg:grid-cols-12"
        >
          {/* Left Column: Picture, Name, Typing effect, Stats, Action Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
            className="lg:col-span-5"
          >
            {/* Profile Avatar with conic spinning gradient */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "50%",
                    background: "conic-gradient(from 0deg, rgba(0,212,255,0.6), rgba(0,255,136,0.6), rgba(0,212,255,0.6))",
                    animation: "spin-slow 4s linear infinite",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    width: "192px",
                    height: "192px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid var(--bg)",
                    zIndex: 1,
                    background: "var(--bg-card)",
                    boxShadow: "0 0 40px rgba(0,212,255,0.3)",
                  }}
                >
                  <Image
                    src="/profile.svg"
                    alt="Ray Simon Bantaculo"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "top" }}
                    priority
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    zIndex: 2,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    border: "2px solid var(--bg)",
                    boxShadow: "0 0 12px rgba(0,255,136,0.8)",
                    animation: "pulse-glow 2s ease infinite",
                  }}
                />
              </div>
            </div>

            {/* Name Details */}
            <div style={{ textAlign: "center" }}>
              <h1
                className="glitch-text"
                data-text="Ray Simon"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 3rem)",
                  fontWeight: 900,
                  color: "var(--text)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.1,
                  textShadow: "0 0 30px rgba(0,212,255,0.3)",
                }}
              >
                Ray Simon
              </h1>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  fontWeight: 700,
                  color: "var(--cyan)",
                  letterSpacing: "0.08em",
                  marginTop: "4px",
                  textShadow: "0 0 20px rgba(0,212,255,0.5)",
                }}
              >
                Bantaculo
              </div>

              {/* Typing Role text */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.85rem",
                  color: "var(--green)",
                  letterSpacing: "0.06em",
                  minHeight: "24px",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>{">"}</span>
                <span>{roleText}</span>
                <span
                  style={{
                    width: "6px",
                    height: "14px",
                    background: "var(--green)",
                    animation: "blink 0.8s step-end infinite",
                    borderRadius: "1px",
                    display: "inline-block",
                  }}
                />
              </div>
            </div>

            {/* Statistics + Actions side by side */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: "8px",
              }}
            >
              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                  flex: 1,
                }}
              >
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(10,21,32,0.8)",
                      border: "1px solid rgba(0,212,255,0.1)",
                      borderRadius: "6px",
                      padding: "12px 8px",
                      textAlign: "center",
                      transition: "border-color 0.3s",
                    }}
                    className="card-ce"
                  >
                    <div
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: s.color,
                        textShadow: `0 0 12px ${s.color}`,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.55rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.08em",
                        marginTop: "4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resume/Contact Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "stretch" }}>
                <a
                  href={site.cv}
                  target="_blank"
                  rel="noreferrer"
                  id="hero-view-resume"
                  className="btn-primary"
                  style={{ textDecoration: "none", textAlign: "center", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <FileText size={13} /> VIEW RESUME [PDF]
                </a>
                <a
                  href="#contact"
                  id="hero-contact"
                  className="btn-secondary"
                  style={{ textDecoration: "none", textAlign: "center", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  PING ME
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: About Description Console Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            className="lg:col-span-7"
          >
            <div
              style={{
                background: "rgba(10,21,32,0.6)",
                border: "1px solid rgba(0,212,255,0.15)",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }}
            >
              {/* Fake Text File Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderBottom: "1px solid rgba(0,212,255,0.1)",
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e" }} />
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#28c840" }} />
                <span
                  style={{
                    marginLeft: "12px",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  operator@portfolio:~/about_me.txt
                </span>
              </div>

              {/* Description Body */}
              <div style={{ padding: "28px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", fontFamily: "Inter, sans-serif" }}>
                  A{" "}
                  <span style={{ color: "var(--cyan)", fontFamily: "JetBrains Mono, monospace" }}>
                    Computer Engineer
                  </span>{" "}
                  passionate about building technology that creates real-world impact.
                  Experienced in developing end-to-end solutions spanning embedded systems, IoT, web applications, cloud services, and machine learning.
                </p>
                <p style={{ color: "var(--text-dim)", lineHeight: 1.7, fontSize: "0.95rem", fontFamily: "Inter, sans-serif" }}>
                  Currently immersed in{" "}
                  <span style={{ color: "var(--green)", fontFamily: "JetBrains Mono, monospace" }}>
                    full-stack development
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "var(--green)", fontFamily: "JetBrains Mono, monospace" }}>
                    IoT engineering
                  </span>
                  . Always building, always learning, always open to meaningful collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
