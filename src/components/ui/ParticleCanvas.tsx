"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  colorR: string;
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[];
}

interface Stream {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  colorR: string;
  size: number;
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  colorR: string;
  size: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PALETTE = [
  { hex: "#00f0ff", r: "0, 240, 255" },
  { hex: "#ff6b9d", r: "255, 107, 157" },
  { hex: "#a855f7", r: "168, 85, 247" },
];

// ─── Builders ─────────────────────────────────────────────────────────────────

function buildNodes(width: number, height: number, isMobile: boolean): Node[] {
  const count = isMobile ? 7 : 12;
  const cols = 3;
  const rows = Math.ceil(count / cols);
  const cellW = width / cols;
  const cellH = height / rows;
  const nodes: Node[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const px = PALETTE[i % PALETTE.length];

    nodes.push({
      x: cellW * col + cellW * 0.15 + Math.random() * cellW * 0.7,
      y: cellH * row + cellH * 0.15 + Math.random() * cellH * 0.7,
      baseX: 0,
      baseY: 0,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: isMobile ? 6 + Math.random() * 5 : 9 + Math.random() * 8,
      color: px.hex,
      colorR: px.r,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.014 + Math.random() * 0.014,
      connections: [],
    });
  }

  // Store base positions after placement
  nodes.forEach((n) => {
    n.baseX = n.x;
    n.baseY = n.y;
  });

  // Connect each node to its 2-3 nearest neighbours
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((n, j) => {
        if (j === i) return { j, d: Infinity };
        const dx = nodes[i].x - n.x;
        const dy = nodes[i].y - n.y;
        return { j, d: Math.sqrt(dx * dx + dy * dy) };
      })
      .sort((a, b) => a.d - b.d)
      .slice(0, isMobile ? 2 : 3);
    nodes[i].connections = dists.map((d) => d.j);
  }

  return nodes;
}

function buildStreams(nodes: Node[], isMobile: boolean): Stream[] {
  const streams: Stream[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (const j of nodes[i].connections) {
      if (i >= j) continue;
      const count = isMobile ? 1 : 1 + Math.floor(Math.random() * 2);
      const px = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      for (let s = 0; s < count; s++) {
        streams.push({
          fromNode: i,
          toNode: j,
          progress: Math.random(),
          speed: 0.0025 + Math.random() * 0.0035,
          colorR: px.r,
          size: 2 + Math.random() * 2,
        });
      }
    }
  }
  return streams;
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
    let streams = buildStreams(nodes, isMobile);
    const ambient: AmbientParticle[] = [];
    let running = true;

    // ── Spawn ambient particles from edges ─────────────────────────────────
    function spawnAmbient() {
      if (isMobile || ambient.length > 25) return;
      const px = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const edge = Math.floor(Math.random() * 4);
      const speed = 0.35 + Math.random() * 0.5;
      let x = 0, y = 0, vx = 0, vy = 0;
      switch (edge) {
        case 0: x = Math.random() * width;  y = 0;      vy =  speed; break;
        case 1: x = width;                  y = Math.random() * height; vx = -speed; break;
        case 2: x = Math.random() * width;  y = height; vy = -speed; break;
        case 3: x = 0;                      y = Math.random() * height; vx =  speed; break;
      }
      ambient.push({
        x, y, vx, vy,
        life: 0,
        maxLife: 100 + Math.random() * 80,
        colorR: px.r,
        size: 1 + Math.random() * 1.5,
      });
    }

    // ── Main draw loop ──────────────────────────────────────────────────────
    function draw() {
      if (!ctx || !running) return;

      // Soft trail — dark overlay
      ctx.fillStyle = "rgba(8, 8, 8, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Update nodes ───────────────────────────────────────────────────
      for (const n of nodes) {
        n.pulsePhase += n.pulseSpeed;
        n.x += n.vx;
        n.y += n.vy;

        // Elastic return to base
        n.vx += (n.baseX - n.x) * 0.0008;
        n.vy += (n.baseY - n.y) * 0.0008;

        // Speed cap
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 0.75) { n.vx = (n.vx / spd) * 0.75; n.vy = (n.vy / spd) * 0.75; }

        // Mouse repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = ((180 - dist) / 180) * 0.045;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }
      }

      // ── Draw connections ───────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          if (i >= j) continue;
          const n1 = nodes[i], n2 = nodes[j];
          const cpx = (n1.x + n2.x) / 2 + (n2.y - n1.y) * 0.18;
          const cpy = (n1.y + n2.y) / 2 - (n2.x - n1.x) * 0.18;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.quadraticCurveTo(cpx, cpy, n2.x, n2.y);
          ctx.strokeStyle = "rgba(255,255,255,0.032)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Draw stream particles ──────────────────────────────────────────
      for (const s of streams) {
        s.progress += s.speed;
        if (s.progress > 1) s.progress = 0;

        const n1 = nodes[s.fromNode], n2 = nodes[s.toNode];
        const cpx = (n1.x + n2.x) / 2 + (n2.y - n1.y) * 0.18;
        const cpy = (n1.y + n2.y) / 2 - (n2.x - n1.x) * 0.18;
        const t  = s.progress;
        const it = 1 - t;

        // Quadratic bezier point
        const bx = it * it * n1.x + 2 * it * t * cpx + t * t * n2.x;
        const by = it * it * n1.y + 2 * it * t * cpy + t * t * n2.y;

        // Fade in & out at endpoints
        const fade = Math.sin(t * Math.PI);
        const gSize = s.size * 3.5;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, gSize);
        grad.addColorStop(0,   `rgba(${s.colorR}, ${0.95 * fade})`);
        grad.addColorStop(0.4, `rgba(${s.colorR}, ${0.45 * fade})`);
        grad.addColorStop(1,   `rgba(${s.colorR}, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.arc(bx, by, gSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      // ── Draw nodes ─────────────────────────────────────────────────────
      for (const n of nodes) {
        const pulse = 1 + Math.sin(n.pulsePhase) * 0.12;
        const r = n.radius * pulse;

        // Outer radial glow halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.5);
        halo.addColorStop(0,   `rgba(${n.colorR}, 0.18)`);
        halo.addColorStop(0.5, `rgba(${n.colorR}, 0.06)`);
        halo.addColorStop(1,   `rgba(${n.colorR}, 0)`);
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
        ctx.restore();

        // Core node
        ctx.save();
        ctx.shadowBlur = isMobile ? 10 : 22;
        ctx.shadowColor = n.color;
        ctx.globalAlpha = 0.88;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        ctx.restore();
      }

      // ── Ambient particles ──────────────────────────────────────────────
      if (!isMobile && Math.random() < 0.04) spawnAmbient();

      for (let i = ambient.length - 1; i >= 0; i--) {
        const p = ambient[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          ambient.splice(i, 1);
          continue;
        }
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.45;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorR}, ${alpha})`;
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    // ── Resize ─────────────────────────────────────────────────────────────
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
          streams = buildStreams(nodes, isMobile);
        }
      }, 200);
    };

    // ── Mouse ──────────────────────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    // ── Intersection Observer — pause when off-screen ──────────────────────
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
