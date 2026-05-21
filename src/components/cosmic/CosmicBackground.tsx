"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  tw: number;
  phase: number;
};

function makeStars(width: number, height: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.2,
      base: 0.15 + Math.random() * 0.55,
      tw: 0.05 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return stars;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = w * h;
      const count = Math.min(520, Math.max(140, Math.floor(area / 9000)));
      stars = makeStars(w, h, count);
    };

    const drawFrame = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const t = (now - t0) / 1000;

      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(
        w * 0.15,
        h * 0.1,
        0,
        w * 0.35,
        h * 0.35,
        Math.max(w, h) * 0.55
      );
      g.addColorStop(0, "rgba(120, 70, 220, 0.35)");
      g.addColorStop(0.35, "rgba(40, 20, 90, 0.12)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(
        w * 0.85,
        h * 0.75,
        0,
        w * 0.65,
        h * 0.55,
        Math.max(w, h) * 0.5
      );
      g2.addColorStop(0, "rgba(20, 200, 255, 0.12)");
      g2.addColorStop(0.4, "rgba(10, 60, 120, 0.06)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const pulse = s.base + s.tw * Math.sin(t * 1.7 + s.phase);
        const a = Math.min(0.95, Math.max(0.05, pulse));
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 240, 255, ${a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(drawFrame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(drawFrame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050510]" />
      <div
        className="absolute -left-[20%] top-[-10%] h-[55vh] w-[55vw] rounded-full bg-purple-600/25 blur-[120px]"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute -right-[15%] bottom-[-15%] h-[50vh] w-[50vw] rounded-full bg-cyan-500/20 blur-[110px]"
        style={{ transform: "translateZ(0)" }}
      />
      <div className="absolute left-[30%] top-[40%] h-[35vh] w-[35vw] rounded-full bg-fuchsia-600/15 blur-[100px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050510]/80" />
    </div>
  );
}
