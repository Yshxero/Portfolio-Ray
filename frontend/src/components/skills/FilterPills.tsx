"use client";

import { Brain, Cpu, Server, Smartphone, Database, FlaskConical, Wrench } from "lucide-react";
import { groups } from "@/data/skills";
import type { Group } from "@/types";

const groupIcon: Record<Exclude<Group, "All">, React.ComponentType<{ className?: string }>> = {
  Database,
  "Web Frontend": Brain,
  Backend: Server,
  Mobile: Smartphone,
  "IoT / Embedded": Cpu,
  "Data / ML": FlaskConical,
  "Other Tools": Wrench,
};

type Props = { active: Group; setActive: (g: Group) => void };

export function FilterPills({ active, setActive }: Props) {
  return (
    <div className="overflow-x-auto pb-1 -mx-1 px-1">
      <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
        {groups.map((g) => {
          const Icon = g === "All" ? Brain : groupIcon[g];
          const isActive = active === g;
          return (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition whitespace-nowrap",
                isActive
                  ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
}
