"use client";

import { useCallback, useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function ProjectsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  const total = projects.length;
  const gor = useCallback(() => setActive((a) => mod(a + 1, total)), [total]);
  const gol = useCallback(() => setActive((a) => mod(a - 1, total)), [total]);

  useEffect(() => {
    if (paused || open) return;
    const id = window.setInterval(gor, 3500);
    return () => window.clearInterval(id);
  }, [paused, open, gor]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") gol();
      if (e.key === "ArrowRight") gor();
      if (e.key === "Enter") setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gol, gor]);

  const distance = (i: number) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-3 text-slate-400">A few things I&apos;ve built recently</p>

        <button onClick={gol} aria-label="Previous project" className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10">
          <span className="text-2xl leading-none">‹</span>
        </button>
        <button onClick={gor} aria-label="Next project" className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10">
          <span className="text-2xl leading-none">›</span>
        </button>

        <div className="relative mx-auto h-110 sm:h-150 overflow-hidden px-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-slate-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-slate-900 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.title}
                p={p}
                d={distance(i)}
                onClick={() => { if (i === active) setOpen(true); else setActive(i); }}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`}
              className={["h-2.5 w-2.5 rounded-full transition", i === active ? "bg-cyan-300" : "bg-white/20 hover:bg-white/30"].join(" ")}
            />
          ))}
        </div>
      </div>

      {open && <ProjectModal project={projects[active]} onClose={() => setOpen(false)} />}
    </>
  );
}
