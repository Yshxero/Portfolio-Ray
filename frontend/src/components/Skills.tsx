"use client";

import Image from "next/image";
import { Cpu, CreditCard, Brain } from "lucide-react";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-28 border-b border-white/10 bg-slate-900 min-h-screen"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-slate-100">Skills</h2>
        <p className="mt-3 text-slate-400">
          Technologies I’ve used across my projects
        </p>

        <div className="mt-12 space-y-14">
            <SkillGroup title="Database">
                <SkillSVG src="/skills.colored/mongodb.svg" name="MongoDB Atlas" />
                <SkillSVG src="/skills.colored/firebase.svg" name="Firebase" />
            </SkillGroup>

            <SkillGroup title="Frontend">
                <SkillSVG src="/skills.colored/next.svg" name="Next.js" />
                <SkillSVG src="/skills.colored/typescript.svg" name="TypeScript" />
                <SkillSVG src="/skills.colored/javascript.svg" name="JavaScript" />
                <SkillSVG src="/skills.colored/html.svg" name="HTML" />
                <SkillSVG src="/skills.colored/css.svg" name="CSS" />
                <SkillSVG src="/skills.colored/tailwind.svg" name="Tailwind CSS" />
                <SkillSVG src="/skills.colored/reactjs.svg" name="React.js" />
            </SkillGroup>

            <SkillGroup title="Backend">
                <SkillSVG src="/skills.colored/node.svg" name="Node.js" />
                <SkillSVG src="/skills.colored/expressjs.svg" name="Express.js" />
            </SkillGroup>

            <SkillGroup title="Mobile">
                <SkillSVG src="/skills.colored/flutter.svg" name="Flutter" />
                <SkillSVG src="/skills.colored/dart.svg" name="Dart" />
                <SkillSVG src="/skills.colored/kotlin.svg" name="Kotlin" />
                <SkillSVG src="/skills.colored/android.svg" name="Android" />
            </SkillGroup>

            <SkillGroup title="IoT / Embedded">
                <SkillSVG src="/skills.colored/espressif.svg" name="ESP32" />
                <SkillSVG src="/skills.colored/raspberry.svg" name="Raspberry Pi" />
                <SkillSVG src="/skills.colored/arduino.svg" name="Aduino Uno" />
                <SkillSVG src="/skills.colored/Micro.svg" name="Micropython" />
                <SkillFallback icon={Cpu} name="Sensors" />
            </SkillGroup>

            <SkillGroup title="Data / ML">
                <SkillSVG src="/skills.colored/python.svg" name="Python" />
                <SkillSVG src="/skills.colored/machine.svg" name="Machine Learning" />
            </SkillGroup>

            <SkillGroup title="Other Tools">
                <SkillSVG src="/skills.colored/git.svg" name="Git" />
                <SkillSVG src="/skills.colored/github.svg" name="GitHub" />
                <SkillSVG src="/skills.colored/docker.svg" name="Docker" />
            </SkillGroup>

        </div>
      </div>
    </section>
  );
}

function SkillGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold uppercase tracking-wide text-slate-100">
        {title}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {children}
      </div>
    </div>
  );
}

function SkillSVG({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/3 px-5 py-4 text-slate-200">
      <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5">
        <Image src={src} alt={name} width={24} height={24} />
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
}

function SkillFallback({
  icon: Icon,
  name,
}: {
  icon: any;
  name: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/3 px-5 py-4 text-slate-200">
      <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5">
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
}
