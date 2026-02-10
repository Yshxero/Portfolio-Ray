"use client";

import { Hero } from "@/components/Hero";
import { ProjectsCarousel } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <div className="bg-slate-900">
      <main>
        <section id="home" className="scroll-mt-28 border-b border-white/10 pt-10 min-h-screen flex items-center">
          <div className="w-full px-6 py-6 md:py-12">
            <Hero />
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 border-b border-white/10 min-h-screen">
          <div className="mx-auto max-w-7xl px-6 py-6 md:py-12">
            <ProjectsCarousel />
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 border-b border-white/10 min-h-screen">
          <Skills />
        </section>

        <section id="contact" className="scroll-mt-28 min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  );
}
