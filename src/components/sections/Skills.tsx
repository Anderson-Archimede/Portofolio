"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

// Keys belonging to each group (order matches i18n object order)
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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const tipOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);

  const all = Object.entries(t.skills.categories) as [string, Category][];
  const techCats = all.filter(([k]) => TECH_KEYS.includes(k));
  const funcCats = all.filter(([k]) => FUNC_KEYS.includes(k));

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-bg-secondary">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <ScrollReveal>
          <SectionLabel text={t.skills.label} />
          <h2 className="section-title font-display mt-4 mb-12 md:mb-20">
            {t.skills.title}
          </h2>
        </ScrollReveal>

        {/* ─── DESKTOP TIMELINE ─── */}
        <div className="hidden md:block" style={{ position: "relative" }}>

          {/* Static base line — subtle green tint */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.06) 100%)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Animated green fill */}
          <motion.div
            style={{
              position: "absolute",
              left: "calc(20px - 1.5px)",
              top: 0,
              width: "3px",
              height: lineHeight,
              background:
                "linear-gradient(to bottom, #22c55e 0%, #16a34a 80%, rgba(34,197,94,0.3) 100%)",
              boxShadow:
                "0 0 8px rgba(34,197,94,0.5), 0 0 20px rgba(34,197,94,0.2)",
              borderRadius: "2px",
              zIndex: 2,
            }}
          />

          {/* Glowing moving tip */}
          <motion.div
            style={{
              position: "absolute",
              left: "20px",
              top: lineHeight,
              opacity: tipOpacity,
              transform: "translateX(-50%) translateY(-50%)",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #22c55e 30%, rgba(34,197,94,0.3) 100%)",
              boxShadow:
                "0 0 16px rgba(34,197,94,0.9), 0 0 32px rgba(34,197,94,0.5), 0 0 48px rgba(34,197,94,0.2)",
              zIndex: 5,
            }}
          />

          {/* Content — offset to the right of timeline */}
          <div style={{ paddingLeft: "56px" }}>

            {/* ── GROUP 1: Technical ── */}
            <GroupDivider label={t.skills.groupTech} color={GREEN} count={techCats.length} />
            {techCats.map(([key, cat], i) => (
              <ScrollReveal key={key} delay={Math.min(i * 0.1, 0.3)}>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <TimelineDot accent={GREEN} highlighted={i === 0} delay={Math.min(i * 0.1, 0.3)} />
                  <SkillCard
                    category={cat}
                    accent={GREEN}
                    highlighted={i === 0}
                  />
                </div>
              </ScrollReveal>
            ))}

            {/* ── GROUP 2: Functional ── */}
            <GroupDivider label={t.skills.groupFunc} color={CYAN} count={funcCats.length} topGap />
            {funcCats.map(([key, cat], i) => (
              <ScrollReveal key={key} delay={Math.min((i + techCats.length + 1) * 0.1, 0.3)}>
                <div
                  style={{
                    position: "relative",
                    marginBottom: i < funcCats.length - 1 ? "20px" : 0,
                  }}
                >
                  <TimelineDot
                    accent={CYAN}
                    highlighted={i === 0}
                    delay={Math.min((i + techCats.length + 1) * 0.1, 0.3)}
                  />
                  <SkillCard
                    category={cat}
                    accent={CYAN}
                    highlighted={i === 0}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── MOBILE: stacked cards ─── */}
        <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <MobileGroupLabel label={t.skills.groupTech} color={GREEN} />
          {techCats.map(([key, cat], i) => (
            <ScrollReveal key={key} delay={Math.min(i * 0.08, 0.24)}>
              <SkillCard category={cat} accent={GREEN} highlighted={i === 0} mobile />
            </ScrollReveal>
          ))}

          <div style={{ marginTop: "16px" }}>
            <MobileGroupLabel label={t.skills.groupFunc} color={CYAN} />
          </div>
          {funcCats.map(([key, cat], i) => (
            <ScrollReveal key={key} delay={Math.min(i * 0.08, 0.24)}>
              <SkillCard category={cat} accent={CYAN} highlighted={i === 0} mobile />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function GroupDivider({
  label,
  color,
  count,
  topGap = false,
}: {
  label: string;
  color: string;
  count: number;
  topGap?: boolean;
}) {
  return (
    <ScrollReveal>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          marginTop: topGap ? "52px" : "0",
        }}
      >
        {/* Diamond marker on timeline */}
        <div
          style={{
            position: "absolute",
            left: "-36px",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
            width: "8px",
            height: "8px",
            background: color,
            boxShadow: `0 0 10px ${color}cc`,
            zIndex: 10,
          }}
        />
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
        {/* Count badge */}
        <span
          style={{
            fontSize: "10px",
            color,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            borderRadius: "100px",
            padding: "1px 8px",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          ×{count}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: `linear-gradient(to right, ${color}40, transparent)`,
          }}
        />
      </div>
    </ScrollReveal>
  );
}

function MobileGroupLabel({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <h3
      style={{
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color,
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        marginBottom: "8px",
      }}
    >
      {label}
    </h3>
  );
}

function TimelineDot({
  accent,
  highlighted,
  delay,
}: {
  accent: string;
  highlighted: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: delay + 0.15 }}
      style={{
        position: "absolute",
        left: "-36px",
        top: "26px",
        transform: "translateX(-50%)",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "var(--color-bg-secondary)",
        border: `${highlighted ? "3px" : "2px"} solid ${accent}`,
        boxShadow: `0 0 ${highlighted ? "12px" : "7px"} ${accent}cc, 0 0 ${highlighted ? "24px" : "14px"} ${accent}55`,
        zIndex: 10,
      }}
    />
  );
}

function SkillCard({
  category,
  accent,
  highlighted,
  mobile = false,
}: {
  category: Category;
  accent: string;
  highlighted: boolean;
  mobile?: boolean;
}) {
  const borderLeft = highlighted
    ? `3px solid ${accent}`
    : "1px solid var(--color-border)";

  return (
    <div
      className="group"
      style={{
        background: highlighted
          ? `radial-gradient(ellipse at top left, ${accent}0d 0%, var(--color-bg-card) 55%)`
          : "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderLeft,
        padding: mobile ? "18px 20px" : "24px 28px",
        borderRadius: "4px",
        transition:
          "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (mobile) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${accent}70`;
        el.style.transform = "translateY(-4px) scale(1.01)";
        el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.35), 0 0 24px ${accent}18`;
        el.style.background = highlighted
          ? `radial-gradient(ellipse at top left, ${accent}14 0%, var(--color-bg-card-hover) 60%)`
          : "var(--color-bg-card-hover)";
      }}
      onMouseLeave={(e) => {
        if (mobile) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--color-border)";
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "none";
        el.style.background = highlighted
          ? `radial-gradient(ellipse at top left, ${accent}0d 0%, var(--color-bg-card) 55%)`
          : "var(--color-bg-card)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <span style={{ fontSize: "22px", lineHeight: 1 }} aria-hidden="true">
          {category.emoji}
        </span>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: highlighted ? accent : "var(--color-text)",
            letterSpacing: "-0.01em",
          }}
        >
          {category.name}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          marginBottom: "14px",
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
              background: highlighted ? `${accent}12` : "var(--color-bg)",
              border: `1px solid ${highlighted ? `${accent}35` : "var(--color-border)"}`,
              color: highlighted ? accent : "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.02em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
