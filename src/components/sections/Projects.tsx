"use client";

import { motion } from "framer-motion";
import {
  SiDbt,
  SiGooglebigquery,
  SiGit,
  SiPython,
  SiDocker,
  SiApacheairflow,
  SiPostgresql,
} from "react-icons/si";
import React from "react";
import type { IconType } from "react-icons";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

/* ─── Custom SVG for missing brand icons ─── */
const PowerBIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M11.5 3.25a.75.75 0 0 0-.75.75v16a.75.75 0 0 0 1.5 0V4a.75.75 0 0 0-.75-.75zM7.5 7.25a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 1.5 0V8a.75.75 0 0 0-.75-.75zm8-2a.75.75 0 0 0-.75.75v14a.75.75 0 0 0 1.5 0V6a.75.75 0 0 0-.75-.75zm-12 4a.75.75 0 0 0-.75.75v10a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75zm16 2a.75.75 0 0 0-.75.75v8a.75.75 0 0 0 1.5 0V12a.75.75 0 0 0-.75-.75z" />
  </svg>
);

const SQLServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
    <path d="M4 5.5v4C4 11.43 7.58 13 12 13s8-1.57 8-3.5v-4C20 7.43 16.42 9 12 9S4 7.43 4 5.5z" />
    <path d="M4 9.5v4C4 15.43 7.58 17 12 17s8-1.57 8-3.5v-4C20 11.43 16.42 13 12 13S4 11.43 4 9.5z" />
    <path d="M4 13.5v4C4 19.43 7.58 21 12 21s8-1.57 8-3.5v-4C20 15.43 16.42 17 12 17S4 15.43 4 13.5z" />
  </svg>
);

const DAXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M3 17l6-8 4 5 3-4 5 7H3z" opacity="0.9" />
    <path d="M3 20h18v1.5H3z" />
  </svg>
);

const STACK_ICONS: Record<string, IconType | React.ComponentType> = {
  "dbt":               SiDbt,
  "Google BigQuery":   SiGooglebigquery,
  "SQL":               SiPostgresql,
  "Git":               SiGit,
  "Python":            SiPython,
  "Docker":            SiDocker,
  "Apache Airflow":    SiApacheairflow,
  "API REST":          SiGit,   // no specific icon — generic
  "REST API":          SiGit,
  "SQL Server":        SQLServerIcon,
  "Power BI":          PowerBIIcon,
  "DAX":               DAXIcon,
};

/* Accent colors per project card */
const ACCENTS = ["#7c3aed", "#06b6d4", "#ff6b9d"] as const;

export default function Projects() {
  const { t } = useLanguage();
  const projects = t.projects.list;

  return (
    <section id="projects" className="section-padding">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <ScrollReveal>
          <SectionLabel text={t.projects.label} />
          <h2 className="section-title font-display mt-4 mb-4">
            {t.projects.title}
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--color-text-secondary)",
              marginBottom: "56px",
            }}
          >
            {t.projects.subtitle}
          </p>
        </ScrollReveal>

        {/* Project cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "20px",
          }}
        >
          {projects.map((project, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <ScrollReveal key={project.title} delay={i * 0.1}>
                <ProjectCard project={project} accent={accent} index={i} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  year: string;
  description: string;
  stack: readonly string[];
  highlight: string;
};

function ProjectCard({
  project,
  accent,
  index,
}: {
  project: Project;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderTop: `3px solid ${accent}`,
        borderRadius: "14px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s",
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 24px 60px rgba(0,0,0,0.35), 0 0 30px ${accent}18`,
      }}
    >
      {/* Top glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "80px",
          background: `radial-gradient(ellipse at 50% 0%, ${accent}0e 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Year badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            padding: "3px 10px",
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
            borderRadius: "100px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            color: accent,
            letterSpacing: "0.06em",
          }}
        >
          {project.year}
        </span>
        {/* Highlight metric */}
        <span
          style={{
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            color: "#22c55e",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            padding: "3px 10px",
            borderRadius: "100px",
          }}
        >
          {project.highlight}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          color: "var(--color-text)",
          lineHeight: 1.3,
          marginBottom: "12px",
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          marginBottom: "22px",
          flex: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tech stack pills with icons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {project.stack.map((tech) => {
          const IconComp = STACK_ICONS[tech];
          return (
            <span
              key={tech}
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                padding: "4px 10px",
                background: `${accent}10`,
                border: `1px solid ${accent}28`,
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 500,
                color: accent,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
            >
              {IconComp && (
                <span style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
                  <IconComp />
                </span>
              )}
              {tech}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}
