"use client";

import { useEffect, useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { NavLogo } from "./NavLogo";
import { logSystemEvent } from "@/lib/logger";

const navItems = [
  { id: "about",    label: "About",    short: "ABOUT"  },
  { id: "projects", label: "Projects", short: "PROJ"   },
  { id: "skills",   label: "Skills",   short: "STACK"  },
  { id: "contact",  label: "Contact",  short: "SIGNAL" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  const handleNavClick = useCallback((id: string) => {
    const item = navItems.find((n) => n.id === id);
    if (item) {
      logSystemEvent(`Initiating navigation protocol: ${item.short}`);
    }
    scrollToId(id);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        const scrollPosition = window.scrollY + 130;
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeIndex = navItems.findIndex((i) => i.id === activeSection);
  const progressPct = ((activeIndex + 1) / navItems.length) * 100;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(5,10,14,0.92)" : "rgba(5,10,14,0.7)",
          borderBottom: "1px solid rgba(0,212,255,0.10)",
          backdropFilter: "blur(16px)",
          transition: "background 0.3s",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "1px",
            background: "linear-gradient(90deg, rgba(0,255,136,0.8), rgba(0,212,255,0.8))",
            width: `${progressPct}%`,
            transition: "width 0.5s cubic-bezier(.22,.61,.36,1)",
            boxShadow: "0 0 8px rgba(0,212,255,0.6)",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
            <NavLogo onClick={() => handleNavClick("home")} />

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "4px",
                      border: isActive ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
                      background: isActive ? "rgba(0,212,255,0.08)" : "transparent",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: isActive ? "var(--cyan)" : "var(--text-dim)",
                        fontWeight: isActive ? 600 : 400,
                        letterSpacing: "0.04em",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <span
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "var(--green)",
                          boxShadow: "0 0 6px rgba(0,255,136,0.8)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: "4px",
                padding: "6px",
                cursor: "pointer",
                color: "var(--cyan)",
                transition: "all 0.2s",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(5,10,14,0.85)",
            backdropFilter: "blur(12px)",
          }}
          onMouseDown={() => setMobileOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              right: 0,
              borderBottom: "1px solid rgba(0,212,255,0.12)",
              background: "rgba(5,10,14,0.98)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    border: isActive ? "1px solid rgba(0,212,255,0.25)" : "1px solid transparent",
                    background: isActive ? "rgba(0,212,255,0.07)" : "transparent",
                    cursor: "pointer",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: isActive ? "var(--cyan)" : "var(--text-dim)",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.label.toUpperCase()}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "0.65rem",
                        color: "var(--green)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}

            <div
              style={{
                marginTop: "16px",
                padding: "10px 16px",
                borderRadius: "4px",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(0,212,255,0.08)",
              }}
            >
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                <span style={{ color: "var(--green)" }}>{">"}</span>{" "}
                CURRENT_SECTION: <span style={{ color: "var(--cyan)" }}>
                  {navItems.find((i) => i.id === activeSection)?.short}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
