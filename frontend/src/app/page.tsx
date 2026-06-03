"use client";

import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/hero/Hero";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";
import { Skills } from "@/components/skills/Skills";
import { Contact } from "@/components/contact/Contact";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { DataStreams } from "@/components/ui/DataStreams";
import { SystemLogConsole } from "@/components/ui/SystemLogConsole";

export default function HomePage() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "var(--bg)", position: "relative", zIndex: 2 }}>

      <MatrixRain />
      <DataStreams />
      <SystemLogConsole />


      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      <main
        className="relative"
        style={{
          zIndex: 2,
          opacity: booted ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >

        <Hero />


        <div className="section-divider" />


        <section id="projects" className="scroll-mt-10 min-h-screen">
          <ChapterHeader
            title="Projects"
            sub="Systems I've architected, built, and deployed"
            command="query --archive=projects"
          />
          <div className="mx-auto max-w-7xl px-6 pb-16">
            <ProjectsCarousel />
          </div>
        </section>

        <div className="section-divider" />


        <section id="skills" className="scroll-mt-10 min-h-screen">
          <Skills />
        </section>

        <div className="section-divider" />


        <section id="contact" className="scroll-mt-10 min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  );
}

import { logSystemEvent } from "@/lib/logger";

function ChapterHeader({
  title,
  sub,
  command,
}: {
  title: string;
  sub: string;
  command: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          logSystemEvent(`Querying database archive: ${title.toLowerCase()}_db...`);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [title]);

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <div
        style={{
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
          <span style={{ color: "var(--text)" }}>{command}</span>
        </div>
        <h2
          className="font-display text-3xl sm:text-4xl font-bold"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono), JetBrains Mono, monospace" }}
        >
          {"> "}{sub}
        </p>
        <div
          className="mt-4 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,255,136,0.5), rgba(0,212,255,0.5), transparent)",
            width: vis ? "100%" : "0%",
            transition: "width 1s ease 0.3s",
          }}
        />
      </div>
    </div>
  );
}
