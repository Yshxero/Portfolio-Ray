import Image from "next/image";
import type { Project } from "@/types";

type Props = { project: Project; onClose: () => void };

export function ProjectModal({ project, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 sm:h-72">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-100 hover:bg-white/20"
          >
            Close
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
          <p className="mt-3 text-slate-300">{project.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.pdf && (
              <>
                <a href={project.pdf} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">View PDF</a>
                <a href={project.pdf} download className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Download PDF</a>
              </>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-500/25">Live App</a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">GitHub Repo</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
