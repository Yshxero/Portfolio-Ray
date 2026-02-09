"use client";

import Image from "next/image";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28">
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-12 flex justify-center">
          <div className="relative w-350 h-162.5 max-w-[98vw] rounded-4xl bg-slate-900 border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.85)]">

            <div className="flex items-center gap-3 px-8 py-5 border-b border-white/10">
              <span className="h-4 w-4 rounded-full bg-red-600" />
              <span className="h-4 w-4 rounded-full bg-yellow-500" />
              <span className="h-4 w-4 rounded-full bg-green-500" />
            </div>

            <div className="h-147.5 grid md:grid-cols-2 gap-10 px-16 py-12 bg-black/60 backdrop-blur-md rounded-b-4xl items-center">

              <div className="relative flex justify-center translate-y-12">
                <div className="absolute h-95 w-95 rounded-full ring-4 ring-cyan-400/50 shadow-[0_0_180px_rgba(34,211,238,0.45)]" />

                <div className="relative h-95 w-95 rounded-full overflow-hidden bg-black">
                  <Image
                    src="/profile.svg"
                    alt="Profile"
                    fill
                    className="object-cover object-bottom"
                    priority
                  />
                </div>

                <div className="absolute -top-39.5 h-95 w-95 pointer-events-none">
                  <Image
                    src="/profile.svg"
                    alt="Profile"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div>
                <p className="text-cyan-400 font-semibold tracking-wide text-xl">
                  Hello there,
                </p>

                <h1 className="mt-4 text-6xl md:text-7xl font-black tracking-tight leading-tight">
                  I&apos;m <span className="text-cyan-400">Ray Simon</span>!
                </h1>

                <p className="mt-8 text-slate-300 text-xl leading-relaxed max-w-2xl">
                  A Computer Engineering student who enjoys designing and building
                  systems that solve real problems.
                </p>

                <p className="mt-8 text-slate-300 text-xl leading-relaxed max-w-2xl">
                  I&apos;m currently focused on full-stack development and IoT
                  projects, and I&apos;m always excited to learn new technologies
                  and collaborate on interesting projects.
                </p>

                <div className="mt-10 flex gap-6">
                  <button
                    onClick={() => scrollToId("projects")}
                    className="rounded-2xl bg-cyan-500 px-8 py-3 text-lg font-medium text-white hover:bg-cyan-700 transition"
                  >
                    View Projects
                  </button>

                  <button
                    onClick={() => scrollToId("contact")}
                    className="rounded-2xl border border-white/20 px-8 py-3 text-lg font-medium text-slate-200 hover:bg-white/10 transition"
                  >
                    Contact Me
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
