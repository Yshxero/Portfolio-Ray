import Image from "next/image";
import type { Skill } from "@/types";

export function SkillCard({ s }: { s: Skill }) {
  const Icon = s.icon;
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-5 py-4 text-slate-200 transition hover:bg-white/5 hover:border-white/20">
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 transition group-hover:scale-[1.03]">
        {s.src ? (
          <Image src={s.src} alt={s.name} width={24} height={24} />
        ) : Icon ? (
          <Icon className="h-5 w-5" />
        ) : null}
      </div>
      <div className="min-w-0">
        <div className="truncate font-medium">{s.name}</div>
        <div className="text-xs text-slate-400">{s.group}</div>
      </div>
    </div>
  );
}
