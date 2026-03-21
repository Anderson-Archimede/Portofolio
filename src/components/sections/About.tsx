"use client";

import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="section-padding"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,240,255,0.03) 0%, transparent 70%)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ScrollReveal>
          <SectionLabel text={t.about.label} />
          <h2 className="section-title font-display mt-4 mb-10 md:mb-16">
            {t.about.title}
          </h2>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* P1 — short powerful lead, italic accent with left border */}
          <ScrollReveal delay={0.1}>
            <p
              style={{
                fontSize: "clamp(16px, 2.2vw, 22px)",
                lineHeight: "1.65",
                color: "var(--color-text)",
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontStyle: "italic",
                borderLeft: "3px solid var(--color-accent)",
                paddingLeft: "16px",
              }}
            >
              {t.about.p1}
            </p>
          </ScrollReveal>

          {/* P2 — context paragraph */}
          <ScrollReveal delay={0.18}>
            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: "1.85",
                color: "var(--color-text-secondary)",
              }}
            >
              {t.about.p2}
            </p>
          </ScrollReveal>

          {/* P3 — value proposition */}
          <ScrollReveal delay={0.26}>
            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: "1.85",
                color: "var(--color-text-secondary)",
              }}
            >
              {t.about.p3}
            </p>
          </ScrollReveal>

          {/* Key metrics strip */}
          <ScrollReveal delay={0.36}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                marginTop: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {t.about.metrics.map((m) => (
                <div
                  key={m.label}
                  data-card="metric"
                  style={{
                    padding: "20px 16px",
                    textAlign: "center",
                    background: "rgba(8,8,8,0.7)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(20px, 4vw, 32px)",
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                      background: "linear-gradient(135deg, #00f0ff, #7dd3fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.1,
                      marginBottom: "6px",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      fontFamily: "var(--font-mono)",
                      lineHeight: 1.4,
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
