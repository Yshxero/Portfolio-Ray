"use client";
import Image from "next/image";
import { ProjectsCarousel } from "@/components/Projects";
import { Hero } from "@/components/Hero";
import { Skills }  from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function HomePage() {

  return (
    <div>
      <main>
        <section id="home" className="scroll-mt-28 border-b border-white/10 bg-slate-900 pt-10 min-h-screen flex items-center">
          <div className="min-h-auto w-full px-6 py-16 md:py-24">
            <Hero/>
          </div>
        </section>

        <section id="projects" className="scroll-mt-28 border-b border-white/10 bg-slate-900 min-h-screen">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <h2 className="text-3xl font-bold">Projects</h2>
            <p className="mt-3 text-slate-400">
              A few things I’ve built recently
            </p>
            <ProjectsCarousel />
          </div>
        </section>

        <section id="skills" className="scroll-mt-28 border-b border-white/10 bg-slate-900 min-h-screen">
            <Skills />
        </section>

        <section id="contact" className="scroll-mt-28 bg-slate-900 min-h-screen">
            <Contact />
        </section>
      </main>
    </div>
  );
}