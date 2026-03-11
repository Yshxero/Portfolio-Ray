import Image from "next/image";
import { site } from "@/data/site";

export function Hero() {
  return (
    <div className="flex justify-center">
      <div className="relative w-full md:w-350 md:max-w-[98vw] rounded-2xl md:rounded-4xl bg-slate-900 border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.85)]">

        <div className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-5 border-b border-white/10">
          <span className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-red-600" />
          <span className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-green-500" />
        </div>

        <div className="grid md:grid-cols-2 md:h-147.5 gap-6 md:gap-10 px-6 sm:px-10 md:px-16 py-8 md:py-12 bg-black/60 backdrop-blur-md rounded-b-2xl md:rounded-b-4xl items-center">

          <div className="hidden md:flex relative justify-center translate-y-12">
            <div className="absolute h-95 w-95 rounded-full ring-4 ring-cyan-400/50 shadow-[0_0_180px_rgba(34,211,238,0.45)]" />
            <div className="relative h-95 w-95 rounded-full overflow-hidden bg-black">
              <Image src="/profile.svg" alt="Profile" fill className="object-cover object-bottom" priority />
            </div>
            <div className="absolute -top-39.5 h-95 w-95 pointer-events-none">
              <Image src="/profile.svg" alt="Profile" fill className="object-cover object-top" />
            </div>
          </div>

          <div>
            <p className="text-cyan-400 font-semibold tracking-wide text-base md:text-xl">
              Hello there,
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mt-1">
              I&apos;m <span className="text-cyan-400">Ray Simon</span>!
            </h1>
            <p className="mt-5 md:mt-8 text-slate-300 text-base md:text-xl leading-relaxed max-w-2xl">
              A Computer Engineering student who enjoys designing and building systems that solve real problems.
            </p>
            <p className="mt-3 md:mt-4 text-slate-300 text-base md:text-xl leading-relaxed max-w-2xl">
              I&apos;m currently focused on full-stack development and IoT projects, and I&apos;m always excited to learn new technologies and collaborate on interesting projects.
            </p>
            <div className="mt-7 md:mt-10 flex flex-wrap gap-3 md:gap-6">
              <a
                href={site.cv}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-cyan-500 px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-medium text-white hover:bg-cyan-700 transition"
              >
                View Resume
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-white/20 px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-medium text-slate-200 hover:bg-white/10 transition"
              >
                Contact Me
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
