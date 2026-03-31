"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RingNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  outerR: number;
  innerR: number;
  colorR: string;
  colorHex: string;
  opacity: number;
  strokeW: number;
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PALETTE = [
  { hex: "#00f0ff", r: "0, 240, 255" },
  { hex: "#ff6b9d", r: "255, 107, 157" },
  { hex: "#a855f7", r: "168, 85, 247" },
  { hex: "#22d3ee", r: "34, 211, 238" },
];

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildNodes(width: number, height: number, isMobile: boolean): RingNode[] {
  // Three-tier sizing: small phone (<480px), mobile (<768px), desktop
  const isSmall = isMobile && width < 480;
  const count = isSmall ? 7 : (isMobile ? 10 : 20);
  const cols = isSmall ? 2 : (isMobile ? 3 : 5);
  const rows = Math.ceil(count / cols);
  const cellW = width / cols;
  const cellH = height / rows;
  const nodes: RingNode[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const px = PALETTE[i % PALETTE.length];

    const outerR = (isSmall ? 3 : (isMobile ? 4 : 5)) + Math.random() * (isSmall ? 10 : (isMobile ? 16 : 20));
    const hasInner = Math.random() < 0.45;
    const innerR = hasInner ? outerR * (0.45 + Math.random() * 0.2) : 0;

    nodes.push({
      x: cellW * col + cellW * 0.1 + Math.random() * cellW * 0.8,
      y: cellH * row + cellH * 0.1 + Math.random() * cellH * 0.8,
      baseX: 0,
      baseY: 0,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      outerR,
      innerR,
      colorR: px.r,
      colorHex: px.hex,
      opacity: 0.2 + Math.random() * 0.48,
      strokeW: 0.8 + Math.random() * 1.0,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
      connections: [],
    });
  }

  nodes.forEach((n) => {
    n.baseX = n.x;
    n.baseY = n.y;
  });

  // Connect each node to its nearest neighbours
  const maxConn = isSmall ? 1 : (isMobile ? 2 : 3);
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((n, j) => {
        if (j === i) return { j, d: Infinity };
        const dx = nodes[i].x - n.x;
        const dy = nodes[i].y - n.y;
        return { j, d: Math.sqrt(dx * dx + dy * dy) };
      })
      .sort((a, b) => a.d - b.d)
      .slice(0, maxConn);
    nodes[i].connections = dists.map((d) => d.j);
  }

  return nodes;
}

// ─── Main Component ───────────────────────────────────────────────────────────

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

    let isMobile = width < 768;
    let nodes = buildNodes(width, height, isMobile);
    let running = true;

    // ── Main draw loop ──────────────────────────────────────────────────────
    function draw() {
      if (!ctx || !running) return;

      // Clear completely — CSS background color shows through
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Large faint orbital arcs (centered around profile area) ────────
      const cx = width / 2;
      const cy = height * 0.28;
      const baseOrbitR = Math.min(width, height) * (isMobile ? 0.38 : 0.44);

      for (let arc = 0; arc < 2; arc++) {
        const r = baseOrbitR * (1 + arc * 0.32);
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${arc === 0 ? 0.04 : 0.025})`;
        ctx.lineWidth = arc === 0 ? 0.8 : 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // ── Update nodes ────────────────────────────────────────────────────
      for (const n of nodes) {
        n.pulsePhase += n.pulseSpeed;
        n.x += n.vx;
        n.y += n.vy;

        // Elastic return to base
        n.vx += (n.baseX - n.x) * 0.0006;
        n.vy += (n.baseY - n.y) * 0.0006;

        // Speed cap
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 0.45) { n.vx = (n.vx / spd) * 0.45; n.vy = (n.vy / spd) * 0.45; }

        // Mouse repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 0) {
          const force = ((160 - dist) / 160) * 0.035;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }
      }

      // ── Draw connection lines ────────────────────────────────────────────
      const maxConnDist = isMobile ? 260 : 320;
      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          if (i >= j) continue;
          const n1 = nodes[i], n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > maxConnDist) continue;

          const alpha = (1 - d / maxConnDist) * 0.07;
          // Slight curve
          const cpx = (n1.x + n2.x) / 2 + (n2.y - n1.y) * 0.12;
          const cpy = (n1.y + n2.y) / 2 - (n2.x - n1.x) * 0.12;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(cpx, cpy, n2.x, n2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Draw ring nodes ─────────────────────────────────────────────────
      for (const n of nodes) {
        const pulse = 1 + Math.sin(n.pulsePhase) * 0.08;
        const r = n.outerR * pulse;

        // Subtle glow behind ring
        ctx.save();
        ctx.shadowBlur = (isMobile && width < 480) ? 5 : (isMobile ? 8 : 18);
        ctx.shadowColor = n.colorHex;
        ctx.globalAlpha = n.opacity * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = n.colorHex;
        ctx.lineWidth = n.strokeW;
        ctx.stroke();
        ctx.restore();

        // Outer ring — crisp stroke
        ctx.save();
        ctx.globalAlpha = n.opacity;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = n.colorHex;
        ctx.lineWidth = n.strokeW;
        ctx.stroke();
        ctx.restore();

        // Inner concentric ring
        if (n.innerR > 0) {
          ctx.save();
          ctx.globalAlpha = n.opacity * 0.45;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.innerR * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = n.colorHex;
          ctx.lineWidth = n.strokeW * 0.6;
          ctx.stroke();
          ctx.restore();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    // ── Resize ──────────────────────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nw = window.innerWidth;
        const nh = window.innerHeight;
        if (Math.abs(nw - width) > 50 || Math.abs(nh - height) > 50) {
          width = nw; height = nh;
          isMobile = width < 768;
          canvas.width = width; canvas.height = height;
          nodes = buildNodes(width, height, isMobile);
        }
      }, 200);
    };

    // ── Mouse ────────────────────────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    // ── Intersection Observer — pause when off-screen ────────────────────────
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animRef.current) {
        animRef.current = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting) {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    }, { threshold: 0 });
    observer.observe(canvas);

    window.addEventListener("resize", onResize, { passive: true });
    if (!window.matchMedia("(hover: none)").matches) {
      window.addEventListener("mousemove", onMouse, { passive: true });
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      observer.disconnect();
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
