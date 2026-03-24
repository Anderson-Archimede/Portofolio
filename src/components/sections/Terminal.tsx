"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

type SkillColor = { bg: string; border: string; text: string };

const SKILL_COLORS: SkillColor[] = [
  { bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.28)", text: "#c4b5fd" },
  { bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.28)", text: "#67e8f9" },
  { bg: "rgba(255,107,157,0.1)", border: "rgba(255,107,157,0.28)", text: "#fda4b8" },
  { bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.28)", text: "#fde68a" },
];

function Pill({ label, color }: { label: string; color: SkillColor }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 11px",
        background: color.bg,
        border: `1px solid ${color.border}`,
        borderRadius: "20px",
        fontSize: "12px",
        color: color.text,
        whiteSpace: "nowrap",
        lineHeight: 1.5,
      }}
    >
      {label}
    </span>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
        marginBottom: "18px",
      }}
    >
      {children}
    </p>
  );
}

const cardBase: React.CSSProperties = {
  background: "var(--color-bg-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "16px",
  padding: "24px",
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  };
}

export default function Terminal() {
  const { t, lang } = useLanguage();
  const cats = t.skills.categories;

  const skillGroups = [
    { items: cats.analytics.items, color: SKILL_COLORS[0] },
    { items: cats.databases.items, color: SKILL_COLORS[1] },
    { items: cats.dataviz.items, color: SKILL_COLORS[2] },
    { items: cats.devops.items, color: SKILL_COLORS[3] },
  ];

  return (
    <section id="terminal" className="section-padding bg-bg-secondary">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <SectionLabel text={t.terminal.label} />
          <h2 className="section-title font-display mt-4 mb-4">
            {t.terminal.title}
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--color-text-secondary)",
            }}
          >
            {t.terminal.subtitle}
          </p>
        </ScrollReveal>

        {/* ── Bento layout ── */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* ════════ LEFT COLUMN ════════ */}
          <div
            style={{
              flex: "0 0 340px",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* ── Identity card ── */}
            <motion.div
              {...fadeUp(0)}
              style={{
                ...cardBase,
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, var(--color-bg-card) 65%)",
                borderColor: "rgba(124,58,237,0.22)",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "16px",
                  flexShrink: 0,
                  border: "2px solid rgba(124,58,237,0.35)",
                  boxShadow: "0 0 0 3px rgba(124,58,237,0.1)",
                }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Anderson Kouassi"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                Anderson Kouassi
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--color-text-secondary)",
                  marginBottom: "18px",
                }}
              >
                {t.hero.title}
              </p>

              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    borderRadius: "20px",
                    fontSize: "11px",
                    color: "#86efac",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      flexShrink: 0,
                    }}
                  />
                  {lang === "fr" ? "Disponible" : "Available now"}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "5px 12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "20px",
                    fontSize: "11px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Paris, France
                </span>
              </div>
            </motion.div>

            {/* ── Stats row (3 mini cards) ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {t.about.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.08 + i * 0.06)}
                  style={{
                    ...cardBase,
                    padding: "16px 10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.2,
                      marginBottom: "5px",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      lineHeight: 1.3,
                    }}
                  >
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Education card ── */}
            <motion.div {...fadeUp(0.2)} style={cardBase}>
              <CardLabel>{t.terminal.eduLabel}</CardLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {t.terminal.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#7c3aed",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        paddingTop: "2px",
                        flexShrink: 0,
                        minWidth: "36px",
                      }}
                    >
                      {edu.year}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          lineHeight: 1.3,
                        }}
                      >
                        {edu.degree}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--color-text-muted)",
                          marginTop: "2px",
                        }}
                      >
                        {edu.school}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════════ RIGHT COLUMN ════════ */}
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {/* ── Skills card ── */}
            <motion.div {...fadeUp(0.1)} style={cardBase}>
              <CardLabel>{t.terminal.stackLabel}</CardLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skillGroups.map((group, gi) => (
                  <div key={gi} style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.items.map((item: string) => (
                      <Pill key={item} label={item} color={group.color} />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Experience card ── */}
            <motion.div
              {...fadeUp(0.17)}
              style={{ ...cardBase, flex: 1 }}
            >
              <CardLabel>{t.terminal.expLabel}</CardLabel>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {t.experience.jobs.map((job, i) => {
                  const isLast = i === t.experience.jobs.length - 1;
                  return (
                    <div key={i} style={{ display: "flex", gap: "16px" }}>
                      {/* Timeline dot + line */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: i === 0 ? "#7c3aed" : "rgba(255,255,255,0.12)",
                            border:
                              i === 0
                                ? "2px solid rgba(124,58,237,0.5)"
                                : "2px solid rgba(255,255,255,0.1)",
                            marginTop: "4px",
                            flexShrink: 0,
                          }}
                        />
                        {!isLast && (
                          <div
                            style={{
                              width: 1,
                              flex: 1,
                              background: "var(--color-border)",
                              marginTop: "5px",
                              marginBottom: "5px",
                              minHeight: "28px",
                            }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ paddingBottom: isLast ? "0" : "22px" }}>
                        <div
                          style={{
                            fontSize: "10px",
                            color: "var(--color-text-muted)",
                            fontFamily: "var(--font-mono)",
                            marginBottom: "3px",
                          }}
                        >
                          {job.period}
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.3,
                            marginBottom: "3px",
                          }}
                        >
                          {job.company}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {job.role}
                        </div>
                        {i === 0 && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "2px 8px",
                              background: "rgba(124,58,237,0.1)",
                              border: "1px solid rgba(124,58,237,0.25)",
                              borderRadius: "4px",
                              fontSize: "10px",
                              color: "#c4b5fd",
                              fontWeight: 500,
                              marginTop: "6px",
                            }}
                          >
                            {lang === "fr"
                              ? "Contrat professionnel · CDD"
                              : "Fixed-term contract · CDD"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
