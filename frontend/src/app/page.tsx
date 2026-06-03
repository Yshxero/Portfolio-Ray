"use client";

import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/hero/Hero";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";
import { Skills } from "@/components/skills/Skills";
import { Contact } from "@/components/contact/Contact";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { DataStreams } from "@/components/ui/DataStreams";

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

        <section
          id="home"
          className="scroll-mt-16 min-h-screen flex flex-col justify-center"
        >
          <Hero />
        </section>


        <div className="section-divider" />


        <section id="projects" className="scroll-mt-10 min-h-screen">
          <ChapterHeader
            title="Projects"
            sub="Systems I've architected, built, and deployed"
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


        <section id="contact" className="scroll-mt-10 min-h-screen flex flex-col justify-center">
          <Contact />
        </section>
      </main>
    </div>
  );
}

function ChapterHeader({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <div
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2
          className="font-display text-3xl sm:text-4xl font-bold"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-dim)", fontFamily: "JetBrains Mono, monospace" }}
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
