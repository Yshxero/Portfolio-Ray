"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Cpu, Server, Smartphone, Database, Brain, Wrench } from "lucide-react";
import { SkillsOrbit } from "@/components/Skill.globe";

type Group =
  | "All"
  | "Database"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "IoT / Embedded"
  | "Data / ML"
  | "Other Tools";

type Skill = {
  name: string;
  src?: string;
  icon?: any;
  group: Exclude<Group, "All">;
};

const groups: Group[] = [
  "All",
  "Database",
  "Frontend",
  "Backend",
  "Mobile",
  "IoT / Embedded",
  "Data / ML",
  "Other Tools",
];

const skills: Skill[] = [
  { group: "Database", name: "MongoDB Atlas", src: "/skills.colored/mongodb.svg" },
  { group: "Database", name: "Firebase", src: "/skills.colored/firebase.svg" },
  { group: "Frontend", name: "Next.js", src: "/skills.colored/next.svg" },
  { group: "Frontend", name: "TypeScript", src: "/skills.colored/typescript.svg" },
  { group: "Frontend", name: "JavaScript", src: "/skills.colored/javascript.svg" },
  { group: "Frontend", name: "HTML", src: "/skills.colored/html.svg" },
  { group: "Frontend", name: "CSS", src: "/skills.colored/css.svg" },
  { group: "Frontend", name: "Tailwind CSS", src: "/skills.colored/tailwind.svg" },
  { group: "Frontend", name: "React.js", src: "/skills.colored/reactjs.svg" },
  { group: "Backend", name: "Node.js", src: "/skills.colored/node.svg" },
  { group: "Backend", name: "Express.js", src: "/skills.colored/expressjs.svg" },
  { group: "Mobile", name: "Flutter", src: "/skills.colored/flutter.svg" },
  { group: "Mobile", name: "Dart", src: "/skills.colored/dart.svg" },
  { group: "Mobile", name: "Kotlin", src: "/skills.colored/kotlin.svg" },
  { group: "Mobile", name: "Android", src: "/skills.colored/android.svg" },
  { group: "IoT / Embedded", name: "ESP32", src: "/skills.colored/espressif.svg" },
  { group: "IoT / Embedded", name: "Raspberry Pi", src: "/skills.colored/raspberry.svg" },
  { group: "IoT / Embedded", name: "Arduino Uno", src: "/skills.colored/arduino.svg" },
  { group: "IoT / Embedded", name: "MicroPython", src: "/skills.colored/Micro.svg" },
  { group: "IoT / Embedded", name: "Sensors", icon: Cpu },
  { group: "Data / ML", name: "Python", src: "/skills.colored/python.svg" },
  { group: "Data / ML", name: "Machine Learning", src: "/skills.colored/machine.svg" },
  { group: "Other Tools", name: "Git", src: "/skills.colored/git.svg" },
  { group: "Other Tools", name: "GitHub", src: "/skills.colored/github.svg" },
  { group: "Other Tools", name: "Docker", src: "/skills.colored/docker.svg" },
];

const groupIcon: Record<Exclude<Group, "All">, any> = {
  Database,
  Frontend: Brain,
  Backend: Server,
  Mobile: Smartphone,
  "IoT / Embedded": Cpu,
  "Data / ML": Brain,
  "Other Tools": Wrench,
};

function FilterPills({
  active,
  setActive,
}: {
  active: Group;
  setActive: (g: Group) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((g) => {
        const Icon = g === "All" ? Brain : groupIcon[g];
        const isActive = active === g;

        return (
          <button
            key={g}
            onClick={() => setActive(g)}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
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
  );
}

function SkillCard({ s }: { s: Skill }) {
  const Icon = s.icon;
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 px-5 py-4 text-slate-200 transition hover:bg-white/5 hover:border-white/20">
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 transition group-hover:scale-[1.03]">
        {s.src ? (
          <Image src={s.src} alt={s.name} width={24} height={24} />
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>
      <div className="min-w-0">
        <div className="truncate font-medium">{s.name}</div>
        <div className="text-xs text-slate-400">{s.group}</div>
      </div>
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState<Group>("All");

  const filtered = useMemo(() => {
    if (active === "All") return skills;
    return skills.filter((s) => s.group === active);
  }, [active]);

  return (
    <section
      id="skills"
      className="scroll-mt-28 border-b border-white/10 bg-slate-900 min-h-screen"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-100">Tech Stack</h2>
            <p className="mt-2 text-slate-400">Technologies I’ve used across my projects</p>
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
