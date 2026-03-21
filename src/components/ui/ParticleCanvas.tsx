"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: "solid-cyan" | "ring-pink" | "ring-purple" | "dot";
  lineWidth: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const COLORS = {
  cyan: "#00f0ff",
  pink: "#ff6b9d",
  purple: "#a855f7",
} as const;

function buildParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  const speed = () => (Math.random() - 0.5) * 0.35;

  // Solid cyan circles
  for (let i = 0; i < 7; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: speed(),
      vy: speed(),
      radius: 12 + Math.random() * 14,
      type: "solid-cyan",
      lineWidth: 0,
      opacity: 0.7 + Math.random() * 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    });
  }

  // Pink hollow rings
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: speed(),
      vy: speed(),
      radius: 16 + Math.random() * 20,
      type: "ring-pink",
      lineWidth: 1.5 + Math.random(),
      opacity: 0.5 + Math.random() * 0.4,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.006 + Math.random() * 0.01,
    });
  }

  // Purple hollow rings
  for (let i = 0; i < 7; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: speed(),
      vy: speed(),
      radius: 12 + Math.random() * 18,
      type: "ring-purple",
      lineWidth: 1 + Math.random(),
      opacity: 0.4 + Math.random() * 0.4,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.007 + Math.random() * 0.01,
    });
  }

  // Tiny scattered dots
  const dotCount = Math.floor((width * height) / 35000);
  for (let i = 0; i < Math.min(dotCount, 40); i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: speed() * 0.5,
      vy: speed() * 0.5,
      radius: 1.5 + Math.random() * 2,
      type: "dot",
      lineWidth: 0,
      opacity: 0.25 + Math.random() * 0.35,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    });
  }

  return particles;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = buildParticles(width, height);

    function draw() {
      if (!ctx) return;

      // Subtle fade trail
      ctx.fillStyle = "rgba(8, 8, 8, 0.18)";
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Wrap around edges
        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60;
        if (p.y > height + 60) p.y = -60;

        // Soft mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 180;
        if (dist < repelRadius && dist > 0) {
          const force = ((repelRadius - dist) / repelRadius) * 0.015;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Speed limit
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 0.6;
        if (spd > maxSpeed) {
          p.vx = (p.vx / spd) * maxSpeed;
          p.vy = (p.vy / spd) * maxSpeed;
        }

        // Pulse scale
        const pulse = 1 + Math.sin(p.pulsePhase) * 0.08;
        const r = p.radius * pulse;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.type === "solid-cyan") {
          ctx.shadowBlur = 20;
          ctx.shadowColor = COLORS.cyan;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.cyan;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.type === "ring-pink") {
          ctx.shadowBlur = 12;
          ctx.shadowColor = COLORS.pink;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = COLORS.pink;
          ctx.lineWidth = p.lineWidth;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (p.type === "ring-purple") {
          ctx.shadowBlur = 10;
          ctx.shadowColor = COLORS.purple;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = COLORS.purple;
          ctx.lineWidth = p.lineWidth;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          const dotColor = [COLORS.cyan, COLORS.pink, COLORS.purple][
            Math.floor(p.x * 0.01 + p.y * 0.01) % 3
          ];
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    // Debounced resize — only rebuild if significant size change
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        if (Math.abs(newWidth - width) > 50 || Math.abs(newHeight - height) > 50) {
          width = newWidth;
          height = newHeight;
          canvas.width = width;
          canvas.height = height;
          particles = buildParticles(width, height);
        }
      }, 150);
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", onResize, { passive: true });

    // Only track mouse on non-touch devices
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
