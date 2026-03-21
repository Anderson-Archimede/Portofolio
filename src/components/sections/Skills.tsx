"use client";

import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {funcCats.map(([key, cat], i) => (
            <ScrollReveal key={key} delay={Math.min(i * 0.08, 0.24)}>
              <SkillCard
                category={cat}
                accent={CYAN}
                index={techCats.length + i + 1}
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
}: {
  category: Category;
  accent: string;
  index: number;
}) {
  const num = String(index).padStart(2, "0");

  return (
    <div
      className="group"
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

      {/* Emoji */}
      <span
        style={{ fontSize: "32px", lineHeight: 1, marginBottom: "16px", display: "block" }}
        aria-hidden="true"
      >
        {category.emoji}
      </span>

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
