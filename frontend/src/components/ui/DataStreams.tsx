"use client";

import { useEffect, useRef } from "react";

interface Stream {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  width: number;
  color: string;
}

export function DataStreams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "rgba(0,212,255,",
      "rgba(0,255,136,",
      "rgba(0,180,220,",
    ];

    const streams: Stream[] = Array.from({ length: 12 }, () => ({
      x:       Math.random() * window.innerWidth,
      y:       -Math.random() * window.innerHeight,
      speed:   0.3 + Math.random() * 0.9,
      opacity: 0.04 + Math.random() * 0.08,
      width:   1 + Math.random() * 1.5,
      color:   colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of streams) {
        const grad = ctx.createLinearGradient(s.x, s.y - 120, s.x, s.y + 120);
        grad.addColorStop(0, `${s.color}0)`);
        grad.addColorStop(0.5, `${s.color}${s.opacity})`);
        grad.addColorStop(1, `${s.color}0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y - 120);
        ctx.lineTo(s.x, s.y + 120);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.stroke();

        s.y += s.speed;
        if (s.y > canvas.height + 200) {
          s.y = -200;
          s.x = Math.random() * canvas.width;
        }
      }
    };

    const raf = { id: 0 };
    const loop = () => { draw(); raf.id = requestAnimationFrame(loop); };
    raf.id = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 1,
        pointerEvents: "none",
      }}
    />
  );
}
