"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

export function SystemLogConsole() {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add default initial logs
    const now = new Date().toLocaleTimeString();
    setLogs([
      `[${now}] Kernel initialized.`,
      `[${now}] System status: OPTIMAL.`,
      `[${now}] Standing by for operator signals...`,
    ]);
  }, []);

  useEffect(() => {
    const handleLog = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev, `[${timestamp}] ${msg}`].slice(-30));
      // Auto expand on first log if not already open
      setOpen(true);
    };

    window.addEventListener("system-log", handleLog);
    return () => window.removeEventListener("system-log", handleLog);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [logs, open]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 100,
        fontFamily: "var(--font-mono), JetBrains Mono, monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(5,10,14,0.92)",
            border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: "30px",
            padding: "8px 16px",
            color: "var(--cyan)",
            fontSize: "0.68rem",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 8px rgba(0,212,255,0.15)",
            transition: "all 0.2s",
            letterSpacing: "0.08em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,212,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.5), 0 0 8px rgba(0,212,255,0.15)";
          }}
        >
          <Terminal size={12} className="animate-pulse" style={{ color: "var(--green)" }} />
          <span>SYSTEM_LOG</span>
          <ChevronUp size={12} style={{ opacity: 0.7 }} />
        </button>
      ) : (
        <div
          style={{
            width: "300px",
            height: "220px",
            background: "rgba(5,10,14,0.95)",
            border: "1px solid rgba(0,212,255,0.25)",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(0,212,255,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              background: "rgba(0,0,0,0.4)",
              borderBottom: "1px solid rgba(0,212,255,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5f57" }} />
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffbd2e" }} />
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#28c840" }} />
              <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.08em", marginLeft: "4px" }}>
                SYSTEM_LOG
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setLogs([])}
                title="Clear logs"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--amber)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Trash2 size={11} />
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Logs List */}
          <div
            ref={listRef}
            style={{
              flex: 1,
              padding: "10px 12px",
              overflowY: "auto",
              fontSize: "0.62rem",
              lineHeight: 1.45,
              color: "rgba(226,234,245,0.8)",
            }}
          >
            {logs.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.6rem", fontStyle: "italic" }}>
                Console buffer cleared.
              </p>
            ) : (
              logs.map((log, index) => {
                const isError = log.includes("Error") || log.includes("Warning");
                const isSuccess = log.includes("established") || log.includes("loaded") || log.includes("Welcome");
                let color = "rgba(226,234,245,0.75)";
                if (isError) color = "var(--amber)";
                else if (isSuccess) color = "var(--green)";
                else if (log.includes("[SYS_LOG]")) color = "var(--cyan)";

                return (
                  <div key={index} style={{ marginBottom: "4px", color, wordBreak: "break-all" }}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
