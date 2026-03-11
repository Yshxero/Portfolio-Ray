"use client";

import { useEffect, useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { NavLogo } from "./NavLogo";

const navItems = [
  { id: "home", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = useCallback((id: string) => {
    scrollToId(id);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 120;
        let current = "home";
        for (const item of navItems) {
          const section = document.getElementById(item.id);
          if (section && section.offsetTop <= scrollPosition) current = item.id;
        }
        setActiveSection((prev) => (prev === current ? prev : current));
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavLogo onClick={() => handleNavClick("home")} />

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={[
                      "px-4 py-2 rounded-lg transition-all duration-300",
                      isActive
                        ? "font-semibold text-cyan-300 bg-cyan-400/10"
                        : "font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onMouseDown={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 border-b border-white/10 bg-slate-950/95 px-6 py-4 flex flex-col gap-1"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={[
                    "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-base",
                    isActive
                      ? "font-semibold text-cyan-300 bg-cyan-400/10"
                      : "font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
