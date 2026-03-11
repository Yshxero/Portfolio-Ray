import Image from "next/image";
import type { Project } from "@/types";

type Props = {
  p: Project;
  d: number;
  onClick: () => void;
};

export function ProjectCard({ p, d, onClick }: Props) {
  const inRange = Math.abs(d) <= 2;
  const scale = d === 0 ? 1 : Math.abs(d) === 1 ? 0.82 : 0.68;
  const opacity = d === 0 ? 1 : Math.abs(d) === 1 ? 0.55 : 0.25;
  const x = d * 420;
  const z = 50 - Math.abs(d);

  return (
    <button
      onClick={onClick}
      aria-label={`View ${p.title}`}
      className="absolute text-left focus:outline-none"
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity: inRange ? opacity : 0,
        zIndex: z,
        pointerEvents: inRange ? "auto" : "none",
        transition: "transform 650ms cubic-bezier(.22,.61,.36,1), opacity 650ms ease",
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
          <p className="mt-3 text-sm text-slate-300 line-clamp-3">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.slice(0, 7).map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {t}
              </span>
            ))}
          </div>
          {d === 0 && <p className="mt-4 text-xs text-cyan-200/80">Click to view full details.</p>}
        </div>
      </article>
    </button>
  );
}
