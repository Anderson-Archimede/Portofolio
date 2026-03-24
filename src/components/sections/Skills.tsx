"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

/* ─── SVG icon map — one per category key, stroke-based 22×22 ─── */
const CATEGORY_ICONS: Record<string, ReactNode> = {
  // Bar chart — Data Viz & BI
  dataViz: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  ),
  // Code brackets — Data Engineering
  dataEng: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  // Cloud upload — Cloud & DevOps
  cloud: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <polyline points="12 13 12 21" />
      <polyline points="9 18 12 21 15 18" />
    </svg>
  ),
  // Target — Management & Methods
  management: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  // Magnifying glass with + — Business Analysis
  businessAnalysis: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  ),
  // Lightning bolt — Methodologies & Project
  methodology: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  // Settings cog — IS & Data & Tools
  tools: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  ),
};

const TECH_KEYS = ["dataViz", "dataEng", "cloud", "management"];
const FUNC_KEYS = ["businessAnalysis", "methodology", "tools"];

const GREEN = "#22c55e";
const CYAN = "#00f0ff";

type Category = {
  name: string;
  emoji: string;
  description: string;
  items: readonly string[];
};

export default function Skills() {
  const { t } = useLanguage();

  const all = Object.entries(t.skills.categories) as [string, Category][];
  const techCats = all.filter(([k]) => TECH_KEYS.includes(k));
  const funcCats = all.filter(([k]) => FUNC_KEYS.includes(k));

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <ScrollReveal>
          <SectionLabel text={t.skills.label} />
          <h2 className="section-title font-display mt-4 mb-12 md:mb-20">
            {t.skills.title}
          </h2>
        </ScrollReveal>

        {/* ── Technical group ── */}
        <ScrollReveal>
          <GroupLabel label={t.skills.groupTech} color={GREEN} />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {techCats.map(([key, cat], i) => (
            <ScrollReveal key={key} delay={Math.min(i * 0.08, 0.24)}>
              <SkillCard
                category={cat}
                accent={GREEN}
                index={i + 1}
                icon={CATEGORY_ICONS[key]}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* ── Functional group ── */}
        <ScrollReveal>
          <GroupLabel label={t.skills.groupFunc} color={CYAN} />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          {funcCats.map(([key, cat], i) => (
            <ScrollReveal key={key} delay={Math.min(i * 0.08, 0.24)}>
              <SkillCard
                category={cat}
                accent={CYAN}
                index={techCats.length + i + 1}
                icon={CATEGORY_ICONS[key]}
              />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Group label ─── */

function GroupLabel({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, ${color}40, transparent)`,
        }}
      />
    </div>
  );
}

/* ─── Card ─── */

function SkillCard({
  category,
  accent,
  index,
  icon,
}: {
  category: Category;
  accent: string;
  index: number;
  icon?: ReactNode;
}) {
  const num = String(index).padStart(2, "0");

  return (
    <div
      className="group"
      data-card="skill"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderTop: `3px solid ${accent}`,
        borderRadius: "12px",
        padding: "28px 28px 24px",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.4), 0 0 30px ${accent}14`;
        el.style.background = "var(--color-bg-card-hover)";
        el.style.borderColor = `${accent}55`;
        el.style.borderTopColor = accent;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.background = "var(--color-bg-card)";
        el.style.borderColor = "var(--color-border)";
        el.style.borderTopColor = accent;
      }}
    >
      {/* Subtle top glow strip */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: `radial-gradient(ellipse at 50% 0%, ${accent}0f 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Card number */}
      <span
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          color: `${accent}50`,
          letterSpacing: "0.08em",
        }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Icon */}
      <div
        style={{
          marginBottom: "16px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: `${accent}12`,
          border: `1px solid ${accent}28`,
          color: accent,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          color: "var(--color-text)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: "12px",
        }}
      >
        {category.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          marginBottom: "20px",
          flex: 1,
        }}
      >
        {category.description}
      </p>

      {/* Skill pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {category.items.map((item) => (
          <span
            key={item}
            style={{
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 500,
              borderRadius: "100px",
              background: `${accent}10`,
              border: `1px solid ${accent}28`,
              color: accent,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.02em",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
