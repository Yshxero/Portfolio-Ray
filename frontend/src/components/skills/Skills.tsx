"use client";

import { useMemo, useState } from "react";
import { skills } from "@/data/skills";
import type { Group } from "@/types";
import { FilterPills } from "./FilterPills";
import { SkillCard } from "./SkillCard";
import { SkillsOrbit } from "./SkillsOrbit";

export function Skills() {
  const [active, setActive] = useState<Group>("All");

  const filtered = useMemo(() => {
    if (active === "All") return skills;
    return skills.filter((s) => s.group === active);
  }, [active]);

  return (
    <section id="skills" className="scroll-mt-28 border-b border-white/10 bg-slate-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">Tech Stack</h2>
            <p className="mt-2 text-slate-400">Technologies I&apos;ve used across my projects</p>
          </div>
          <FilterPills active={active} setActive={setActive} />
        </div>

        {active === "All" ? (
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-4xl">
              <SkillsOrbit />
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SkillCard key={`${s.group}-${s.name}`} s={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
