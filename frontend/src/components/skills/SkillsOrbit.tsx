"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { techs } from "@/data/skills";
import type { Tech } from "@/types";

type Node = { x: number; y: number; vx: number; vy: number; r: number; z: number };

const ICON_SIZE = 60;
const LINK_DIST = 170;
const SPEED_MIN = 18;
const SPEED_MAX = 42;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function SkillsOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodeElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  const nodes = useMemo<Node[]>(() =>
    techs.map(() => {
      const sp = rand(SPEED_MIN, SPEED_MAX);
      const ang = rand(0, Math.PI * 2);
      const z = rand(0.75, 1.2);
      return { x: 0, y: 0, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, r: (ICON_SIZE * z) / 2, z };
    }), []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(r.width * dpr);
      canvas.height = Math.floor(r.height * dpr);
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.r = (ICON_SIZE * n.z) / 2;
        n.x = rand(n.r + 6, r.width - n.r - 6);
        n.y = rand(n.r + 6, r.height - n.r - 6);
        const el = nodeElsRef.current[i];
        if (el) {
          el.style.transform = `translate3d(${n.x - ICON_SIZE / 2}px, ${n.y - ICON_SIZE / 2}px, 0) scale(${n.z})`;
          el.style.opacity = `${0.65 + (n.z - 0.75) * 0.5}`;
        }
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const step = (t: number) => {
      const r = wrap.getBoundingClientRect();
      const dt = Math.min(0.033, (t - (lastRef.current || t)) / 1000);
      lastRef.current = t;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x <= n.r) { n.x = n.r; n.vx *= -1; }
        else if (n.x >= r.width - n.r) { n.x = r.width - n.r; n.vx *= -1; }
        if (n.y <= n.r) { n.y = n.r; n.vy *= -1; }
        else if (n.y >= r.height - n.r) { n.y = r.height - n.r; n.vy *= -1; }
        const el = nodeElsRef.current[i];
        if (el) el.style.transform = `translate3d(${n.x - ICON_SIZE / 2}px, ${n.y - ICON_SIZE / 2}px, 0) scale(${n.z})`;
      }
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < nodes.length; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(203,213,225,0.55)";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.5;
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { ro.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [nodes]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        height: "580px",
        width: "100%",
        overflow: "hidden",
        borderRadius: "10px",
        border: "1px solid rgba(0,212,255,0.12)",
        background: "rgba(5,10,14,0.7)",
        boxShadow: "inset 0 0 80px rgba(0,212,255,0.03)",
      }}
    >

      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 60%)",
        }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      {techs.map((t: Tech, i: number) => (
        <div
          key={t.name}
          ref={(el) => { nodeElsRef.current[i] = el; }}
          className="group"
          style={{ position: "absolute", left: 0, top: 0, willChange: "transform", width: 48, height: 48 }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              display: "grid",
              placeItems: "center",
              borderRadius: "10px",
              border: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(13,27,42,0.9)",
              backdropFilter: "blur(4px)",
              transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.5)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(0,212,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.15)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <Image src={t.src} alt={t.name} width={32} height={32} />
          </div>

          <div
            className="group-hover:block hidden"
            style={{
              pointerEvents: "none",
              position: "absolute",
              left: "50%",
              top: "115%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              borderRadius: "4px",
              border: "1px solid rgba(0,212,255,0.2)",
              background: "rgba(5,10,14,0.95)",
              padding: "3px 10px",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.65rem",
              color: "var(--cyan)",
              letterSpacing: "0.08em",
              zIndex: 10,
            }}
          >
            {t.name}
          </div>
        </div>
      ))}
    </div>
  );
}
