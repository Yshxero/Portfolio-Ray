"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

type Tech = { name: string; src: string };
type Node = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    z: number;
};

const techs: Tech[] = [
    { name: "Next.js", src: "/skills.colored/next.svg" },
    { name: "TypeScript", src: "/skills.colored/typescript.svg" },
    { name: "JavaScript", src: "/skills.colored/javascript.svg" },
    { name: "React", src: "/skills.colored/reactjs.svg" },
    { name: "Tailwind", src: "/skills.colored/tailwind.svg" },
    { name: "MongoDB", src: "/skills.colored/mongodb.svg" },
    { name: "Firebase", src: "/skills.colored/firebase.svg" },
    { name: "Node.js", src: "/skills.colored/node.svg" },
    { name: "Express", src: "/skills.colored/expressjs.svg" },
    { name: "Flutter", src: "/skills.colored/flutter.svg" },
    { name: "Dart", src: "/skills.colored/dart.svg" },
    { name: "Kotlin", src: "/skills.colored/kotlin.svg" },
    { name: "Android", src: "/skills.colored/android.svg" },
    { name: "ESP32", src: "/skills.colored/espressif.svg" },
    { name: "Raspberry Pi", src: "/skills.colored/raspberry.svg" },
    { name: "Arduino", src: "/skills.colored/arduino.svg" },
    { name: "Python", src: "/skills.colored/python.svg" },
    { name: "Docker", src: "/skills.colored/docker.svg" },
    { name: "Git", src: "/skills.colored/git.svg" },
    { name: "GitHub", src: "/skills.colored/github.svg" },
    { name: "Micropython", src: "/skills.colored/Micro.svg" },

];

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function SkillsOrbit() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodeElsRef = useRef<(HTMLDivElement | null)[]>([]);
    const rafRef = useRef<number | null>(null);
    const lastRef = useRef<number>(0);

    const iconSize = 60;
    const linkDist = 170;
    const speedMin = 18;
    const speedMax = 42;

    const nodes = useMemo<Node[]>(() => {
        return techs.map(() => {
            const sp = rand(speedMin, speedMax);
            const ang = rand(0, Math.PI * 2);
            const z = rand(0.75, 1.2);
            return {
                x: 0,
                y: 0,
                vx: Math.cos(ang) * sp,
                vy: Math.sin(ang) * sp,
                r: (iconSize * z) / 2,
                z,
            };
        });
    }, []);

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
                n.r = (iconSize * n.z) / 2;
                n.x = rand(n.r + 6, r.width - n.r - 6);
                n.y = rand(n.r + 6, r.height - n.r - 6);

                const el = nodeElsRef.current[i];
                if (el) {
                    el.style.transform = `translate3d(${n.x - iconSize / 2}px, ${n.y - iconSize / 2}px, 0) scale(${n.z})`;
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

                if (n.x <= n.r) {
                    n.x = n.r;
                    n.vx *= -1;
                } else if (n.x >= r.width - n.r) {
                    n.x = r.width - n.r;
                    n.vx *= -1;
                }

                if (n.y <= n.r) {
                    n.y = n.r;
                    n.vy *= -1;
                } else if (n.y >= r.height - n.r) {
                    n.y = r.height - n.r;
                    n.vy *= -1;
                }

                const el = nodeElsRef.current[i];
                if (el) {
                    el.style.transform = `translate3d(${n.x - iconSize / 2}px, ${n.y - iconSize / 2}px, 0) scale(${n.z})`;
                }
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
                    const a = nodes[i];
                    const b = nodes[j];

                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);

                    if (d < linkDist) {
                        const alpha = 1 * (1 - d / linkDist);
                        ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
                        ctx.lineWidth = 1;

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

        return () => {
            ro.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [nodes]);

    return (
        <div
            ref={wrapRef}
            className="relative h-[650px] w-full overflow-hidden rounded-3xl border border-white/20 bg-black/60"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.18),transparent_55%)]" />

            <canvas ref={canvasRef} className="absolute inset-0" />

            {techs.map((t, i) => (
                <div
                    key={t.name}
                    ref={(el) => {
                        nodeElsRef.current[i] = el;
                    }}
                    className="group absolute left-0 top-0 will-change-transform"
                    style={{ width: 48, height: 48 }}
                >
                    <div className="grid h-15 w-15 place-items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:scale-110 hover:border-cyan-400/40">
                        <Image src={t.src} alt={t.name} width={40} height={40} />
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-[115%] hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950/80 px-2 py-1 text-xs text-slate-200 group-hover:block">
                        {t.name}
                    </div>
                </div>
            ))}
        </div>
    );
}
