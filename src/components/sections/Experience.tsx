"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Experience() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 25%"],
  });

  // Spring-smooth the scroll progress for a fluid line draw
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const tipOpacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <SectionLabel text={t.experience.label} />
          <h2 className="section-title font-display mt-4 mb-12 md:mb-20">
            {t.experience.title}
          </h2>
        </ScrollReveal>

        {/* Timeline container */}
        <div style={{ position: "relative" }}>

          {/* BASE LINE — static, full height, desktop only */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1.5px",
              background: "linear-gradient(to bottom, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.08) 100%)",
              transform: "translateX(-50%)",
            }}
          />

          {/* ANIMATED FILL LINE — green, spring-driven scroll, desktop only */}
          <motion.div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "calc(50% - 1.5px)",
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

          {/* GLOWING TIP — moves with scroll progress */}
          <motion.div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "50%",
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

          {/* Timeline items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {t.experience.jobs.map((job, i) => (
              <ScrollReveal key={job.company} delay={i * 0.12}>
                {/* Desktop: alternating grid */}
                <div
                  className="hidden md:grid"
                  style={{
                    gridTemplateColumns: "1fr 60px 1fr",
                    alignItems: "start",
                  }}
                >
                  {/* Left slot */}
                  <div style={{ paddingRight: "36px" }}>
                    {i % 2 === 0 && <JobCard job={job} isFirst={i === 0} lang={lang} />}
                  </div>

                  {/* Center dot */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingTop: "28px",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                      style={{
                        width: i === 0 ? "16px" : "12px",
                        height: i === 0 ? "16px" : "12px",
                        borderRadius: "50%",
                        background: "var(--color-bg)",
                        border: `${i === 0 ? "3px" : "2px"} solid #22c55e`,
                        boxShadow:
                          i === 0
                            ? "0 0 16px rgba(34,197,94,0.8), 0 0 32px rgba(34,197,94,0.4)"
                            : "0 0 8px rgba(34,197,94,0.5), 0 0 16px rgba(34,197,94,0.25)",
                        position: "relative",
                        zIndex: 10,
                      }}
                    />
                  </div>

                  {/* Right slot */}
                  <div style={{ paddingLeft: "36px" }}>
                    {i % 2 !== 0 && <JobCard job={job} isFirst={false} lang={lang} />}
                  </div>
                </div>

                {/* Mobile: single column */}
                <div className="md:hidden">
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Mobile dot + line */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                        marginTop: "28px",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: "var(--color-bg)",
                          border: "2px solid #22c55e",
                          boxShadow: "0 0 8px rgba(34,197,94,0.6), 0 0 16px rgba(34,197,94,0.3)",
                        }}
                      />
                      {i < t.experience.jobs.length - 1 && (
                        <div
                          style={{
                            width: "1px",
                            flexGrow: 1,
                            background: "linear-gradient(to bottom, rgba(34,197,94,0.4), rgba(34,197,94,0.1))",
                            marginTop: "8px",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <JobCard job={job} isFirst={i === 0} lang={lang} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JobCard({
  job,
  isFirst,
  lang,
}: {
  job: {
    company: string;
    role: string;
    location: string;
    period: string;
    description?: string;
    highlights: readonly string[];
  };
  isFirst: boolean;
  lang: string;
}) {
  return (
    <div
      className="group"
      style={{
        background: isFirst
          ? "radial-gradient(ellipse at top left, rgba(34,197,94,0.06) 0%, var(--color-bg-card) 55%)"
          : "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderLeft: isFirst ? "3px solid #22c55e" : "2px solid rgba(34,197,94,0.4)",
        padding: "28px 32px",
        borderRadius: "4px",
        transition:
          "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(34,197,94,0.5)";
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3), 0 0 24px rgba(34,197,94,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = isFirst ? "#22c55e" : "rgba(34,197,94,0.4)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Period + badge row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#22c55e",
            fontWeight: 500,
            fontFamily: "var(--font-mono)",
          }}
        >
          {job.period}
        </span>
        {isFirst && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "2px 9px",
              borderRadius: "100px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              fontSize: "10px",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: "#22c55e",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,0.8)",
                animation: "pulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {lang === "fr" ? "En poste" : "Current"}
          </span>
        )}
      </div>

      {/* Company */}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          marginBottom: "4px",
          color: "var(--color-text)",
        }}
      >
        {job.company}
      </h3>

      {/* Role */}
      <p
        style={{
          fontSize: "15px",
          color: "var(--color-text-secondary)",
          marginBottom: "4px",
        }}
      >
        {job.role}
      </p>

      {/* Location */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--color-text-muted)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <svg
          style={{ width: "12px", height: "12px", flexShrink: 0 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {job.location}
      </p>

      {/* Description — context paragraph */}
      {job.description && (
        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.5)",
            fontStyle: "italic",
            marginBottom: "18px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {job.description}
        </p>
      )}

      {/* Highlights */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {job.highlights.map((h, j) => (
          <li
            key={h}
            style={{
              display: "flex",
              gap: "10px",
              fontSize: "14px",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              marginBottom: j < job.highlights.length - 1 ? "10px" : 0,
            }}
          >
            <span
              style={{
                color: "#22c55e",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              →
            </span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
