"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Project = {
  title: string;
  desc: string;
  image: string;
  pdf: string | null;
  live: string | null;
  tech: string[];
  repo?: string | null;
};

const projects: Project[] = [
  {
    title: "Listing App",
    desc: "A task management web application that helps users create, organize, and track to-do items with a clean and responsive interface.",
    image: "/projects/Listing.png",
    pdf: null,
    live: "https://listing-task.vercel.app/",
    tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Node.js", "Express"],
    repo: "https://github.com/Yshxero/Listing-App",
  },
  {
    title: "CPELEX Mobile App & Embedded System",
    desc: "A mobile and embedded toll gate system that automates vehicle access and payment using sensor integration and real-time mobile app control.",
    image: "/projects/CPELEX.png",
    pdf: "/pdfs/CPELEX Toll Gate System.pdf",
    live: null,
    tech: ["Flutter", "Dart", "Android Studio", "Firebase", "Micropython", "Raspberry Pi", "Sensors"],
    repo: null,
  },
  {
    title: "Egg-Size Classification System",
    desc: "A machine learning system that automatically classifies egg sizes using image processing and clustering techniques to improve accuracy and consistency.",
    image: "/projects/EggClassifier.png",
    pdf: "/pdfs/Egg-Classifier.pdf",
    live: null,
    tech: ["Html", "CSS", "Javascript", "FastAPI", "Python", "Machine Learning", "K-means Clustering"],
    repo: "https://github.com/Yshxero/Egg-Size-Classification.git",
  },
  {
    title: "TapDrop: A Gcash-Enabled Water Vending Machine & IoT System",
    desc: "An IoT-based water vending system that enables cashless payments via GCash while monitoring usage and sensor data in real time.",
    image: "/projects/TapDrop.png",
    pdf: "/pdfs/TAPDROP_ A Gcash-Enabled Water Vending Machine IEEE.pdf",
    live: null,
    tech: ["Html", "CSS", "Javascript", "Firebase", "Micropython", "ESP32", "Sensors"],
    repo: null,
  },
  {
    title: "Pahina: A Book Exchange Online Platform",
    desc: "A mobile platform that allows users to exchange, list, and discover books within a community using a centralized Firebase backend.",
    image: "/projects/Pahina.png",
    pdf: null,
    live: null,
    tech: ["Android Studio", "Kotlin", "XML", "Firebase"],
    repo: null,
  },
  {
    title: "React Calculator",
    desc: "A calculator web application that allows users to perform basic arithmetic operations using a clean and responsive interface.",
    image: "/projects/calculator.png",
    pdf: null,
    live: null,
    tech: ["React", "JavaScript", "CSS"],
    repo: null,
  },

];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function ProjectsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  const total = projects.length;

  const gor = () => { setActive((a) => mod(a + 1, total)); };
  const gol = () => { setActive((a) => mod(a - 1, total)); };

  useEffect(() => {
    if (paused || open) return;
    const id = window.setInterval(() => gor(), 3500);
    return () => window.clearInterval(id);
  }, [paused, open, total]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") gol();
      if (e.key === "ArrowRight") gor();
      if (e.key === "Enter") setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const indices = useMemo(() => {
    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map((d) => mod(active + d, total));
  }, [active, total]);

  const distance = (i: number) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const activeProject = projects[active];

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-3 text-slate-400">A few things I’ve built recently</p>
        <button
          onClick={() => gol()}
          aria-label="Previous project"
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10"
        >
          <span className="text-2xl leading-none">‹</span>
        </button>

        <button
          onClick={() => gor()}
          aria-label="Next project"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10"
        >
          <span className="text-2xl leading-none">›</span>
        </button>

        <div className="relative mx-auto h-110 sm:h-150 overflow-hidden px-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-slate-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-slate-900 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            {projects.map((p, i) => {
              const d = distance(i);
              const inRange = Math.abs(d) <= 2;
              const scale = d === 0 ? 1 : Math.abs(d) === 1 ? 0.82 : 0.68;
              const opacity = d === 0 ? 1 : Math.abs(d) === 1 ? 0.55 : 0.25;
              const x = d * 420;
              const z = 50 - Math.abs(d);

              return (
                <button
                  key={i}
                  onClick={() => {
                    if (i === active) setOpen(true);
                    else setActive(i);
                  }}
                  className="absolute text-left focus:outline-none"
                  style={{
                    transform: `translateX(${x}px) scale(${scale})`,
                    opacity: inRange ? opacity : 0,
                    zIndex: z,
                    pointerEvents: inRange ? "auto" : "none",
                    transition:
                      "transform 650ms cubic-bezier(.22,.61,.36,1), opacity 650ms ease",
                  }}
                >
                  <article
                    className={[
                      "w-[320px] sm:w-95 overflow-hidden rounded-2xl border bg-white/3",
                      d === 0
                        ? "border-cyan-400/30 shadow-[0_0_120px_rgba(34,211,238,0.18)]"
                        : "border-white/10",
                    ].join(" ")}
                  >
                    <div className="relative h-44 sm:h-52 bg-black/20">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    </div>

                    <div className="p-6 bg-black/60">
                      <h3 className="text-lg font-semibold text-slate-100">{p.title}</h3>
                      <p className="mt-3 text-sm text-slate-300">{p.desc}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tech.slice(0, 7).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {d === 0 && (
                        <p className="mt-4 text-xs text-cyan-200/80">
                          Click to view full details.
                        </p>
                      )}
                    </div>
                  </article>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === active ? "bg-cyan-300" : "bg-white/20 hover:bg-white/30",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-100 hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-100">
                {activeProject.title}
              </h3>
              <p className="mt-3 text-slate-300">{activeProject.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {activeProject.pdf && (
                  <>
                    <a
                      href={activeProject.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                      View PDF
                    </a>

                    <a
                      href={activeProject.pdf}
                      download
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                      Download PDF
                    </a>
                  </>
                )}

                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/25"
                  >
                    Live App
                  </a>
                )}

                {activeProject.repo && (
                  <a
                    href={activeProject.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
