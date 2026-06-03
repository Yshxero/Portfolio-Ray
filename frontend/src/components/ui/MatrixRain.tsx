"use client";

import { useEffect, useRef } from "react";

const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";

export function MatrixRain() {
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

    const fontSize  = 13;
    let columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(5,10,14,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      columns = Math.floor(canvas.width / fontSize);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const alpha = Math.random() > 0.97 ? 1 : 0.15 + Math.random() * 0.2;
        ctx.fillStyle =
          drops[i] === 1
            ? `rgba(0,255,136,${alpha})`
            : Math.random() > 0.7
            ? `rgba(0,212,255,${alpha * 0.5})`
            : `rgba(0,255,136,${alpha * 0.4})`;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 55);
    return () => {
      clearInterval(interval);
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
        opacity: 0.28,
        pointerEvents: "none",
      }}
    />
  );
}
