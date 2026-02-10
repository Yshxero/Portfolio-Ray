"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const y = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

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
          if (section && section.offsetTop <= scrollPosition) {
            current = item.id;
          }
        }

        setActiveSection((prev) => (prev === current ? prev : current));
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="shrink-0"
            aria-label="Go to Home"
          >
            <span className="bg-linear-to-r from-cyan-400 to-cyan-600 bg-clip-text text-xl font-semibold text-transparent">
              {"<Dev/ Simon >"}
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
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

          <div className="md:hidden">
            <button
              onClick={() => scrollToSection("contact")}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
