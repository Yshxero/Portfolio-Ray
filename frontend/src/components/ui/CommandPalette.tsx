"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Command, ArrowRight, FileText, Code, Folder, Mail, X } from "lucide-react";
import { projects, archiveProjects } from "@/data/projects";
import { site } from "@/data/site";
import { scrollToId } from "@/lib/scroll";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems = useMemo(() => {
    const navItems = [
      { id: "nav-home", label: "Go to About Section", type: "navigation", icon: ArrowRight, sub: "Section navigation", action: () => scrollToId("home") },
      { id: "nav-projects", label: "Go to Projects Section", type: "navigation", icon: Folder, sub: "Section navigation", action: () => scrollToId("projects") },
      { id: "nav-skills", label: "Go to Tech Stack", type: "navigation", icon: Code, sub: "Section navigation", action: () => scrollToId("skills") },
      { id: "nav-contact", label: "Go to Contact / Signals", type: "navigation", icon: Mail, sub: "Section navigation", action: () => scrollToId("contact") },
      { id: "action-resume", label: "View Resume [PDF]", type: "action", icon: FileText, sub: "Document link", action: () => window.open(site.cv, "_blank") },
    ];

    const projItems = [...projects, ...archiveProjects].map((p) => ({
      id: `proj-${p.title}`,
      label: p.title,
      type: "project",
      icon: Folder,
      sub: p.tech.join(" • "),
      action: () => {
        scrollToId("projects");
      },
    }));

    return [...navItems, ...projItems];
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) => item.label.toLowerCase().includes(q) || (item.sub && item.sub.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          setQuery("");
        }
      }
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % (filtered.length || 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % (filtered.length || 1));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, filtered, selectedIndex]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        paddingInline: "16px",
        background: "rgba(5,10,14,0.85)",
        backdropFilter: "blur(12px)",
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          border: "1px solid rgba(0,212,255,0.3)",
          background: "rgba(13,27,42,0.98)",
          boxShadow: "0 0 60px rgba(0,212,255,0.15), 0 24px 48px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(0,212,255,0.12)",
          }}
        >
          <Search size={18} style={{ color: "var(--cyan)" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search project or tech stack..."
            autoFocus
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.85rem",
              width: "100%",
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: "320px", overflowY: "auto", padding: "8px" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem" }}>
              No matches found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    background: isSelected ? "rgba(0,212,255,0.12)" : "transparent",
                    border: isSelected ? "1px solid rgba(0,212,255,0.25)" : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <IconComponent size={16} style={{ color: isSelected ? "var(--green)" : "var(--cyan)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", color: isSelected ? "var(--text)" : "var(--text-dim)" }}>
                      {item.label}
                    </div>
                    {item.sub && (
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        {item.sub}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", color: "var(--cyan)" }}>
                      ↵ SELECT
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: "8px 16px",
            borderTop: "1px solid rgba(0,212,255,0.1)",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.65rem",
            color: "var(--text-muted)",
          }}
        >
          <span>Use ↑↓ to navigate, Enter to select</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Command size={10} /> + K
          </span>
        </div>
      </div>
    </div>
  );
}
