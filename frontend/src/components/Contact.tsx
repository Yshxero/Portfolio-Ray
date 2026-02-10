"use client";

import { Mail, Github, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/components/Hero";

export function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-6 md:py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Let&apos;s talk and feel free to reach out. I&apos;m open to collaborations and freelance work.
          </p>
        </div>

        <a
          href="mailto:bantaculoraysimon@gmail.com"
          className="inline-flex items-center justify-center gap-2 rounded-2xl
            bg-cyan-500/20 px-6 py-3 text-cyan-200
            border border-cyan-400/30 hover:bg-cyan-500/30 transition"
        >
          <Mail className="h-5 w-5" />
          Email me
          <ArrowUpRight className="h-4 w-4 opacity-80" />
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/20 bg-black/60 p-8">
          <p className="text-sm font-semibold text-slate-200">Email</p>
          <a
            href="mailto:bantaculoraysimon@gmail.com"
            className="mt-2 block text-slate-300 hover:text-white transition"
          >
            bantaculoraysimon@gmail.com
          </a>
          <p className="mt-4 text-sm text-slate-400">
            Fastest way to reach me.
          </p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-black/60 p-8">
          <p className="text-sm font-semibold text-slate-200">Find me on</p>

          <div className="mt-4 space-y-3">
            <a
              href="https://github.com/Yshxero"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl
                border border-white/10 bg-white/2 px-4 py-3
                hover:bg-white/6 transition"
            >
              <span className="flex items-center gap-3 text-slate-200">
                <Github className="h-5 w-5 text-slate-300 group-hover:text-white transition" />
                GitHub
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-200 transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/bantaculo-raysimon/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl
                border border-white/10 bg-white/2 px-4 py-3
                hover:bg-white/6 transition"
            >
              <span className="flex items-center gap-3 text-slate-200">
                <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white transition" />
                LinkedIn
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-200 transition" />
            </a>

            <a
              href="https://www.facebook.com/RSBantaculo/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl
                    border border-white/10 bg-white/2 px-4 py-3
                    hover:bg-white/6 transition"
            >
              <span className="flex items-center gap-3 text-slate-200">
                <Facebook className="h-5 w-5 text-slate-300 group-hover:text-white transition" />
                Facebook
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-200 transition" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-black/60 p-8">
          <p className="text-sm font-semibold text-slate-200">Status</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.6)]" />
            <p className="text-slate-300">Open to opportunities</p>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            {"Based in PH • Replies within 24 hours."}
          </p>
        </div>
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} Ray. Built with Next.js + Tailwind</p>
        <a onClick={() => scrollToId("home")} className="hover:text-slate-300 transition">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}
