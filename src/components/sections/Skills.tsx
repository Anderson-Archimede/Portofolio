"use client";

import React, { type ReactNode } from "react";
import {
  SiDbt,
  SiApacheairflow,
  SiPython,
  SiPandas,
  SiNumpy,
  SiGooglebigquery,
  SiSnowflake,
  SiPostgresql,
  SiLooker,
  SiMetabase,
  SiGit,
  SiDocker,
  SiJira,
  SiDataiku,
  SiCoursera,
  SiHubspot,
  SiGoogleanalytics,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

/* ─── Custom SVG icons for brands not in Simple Icons (Microsoft, Tableau) ─── */

const PowerBIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M11.5 3.25a.75.75 0 0 0-.75.75v16a.75.75 0 0 0 1.5 0V4a.75.75 0 0 0-.75-.75zM7.5 7.25a.75.75 0 0 0-.75.75v12a.75.75 0 0 0 1.5 0V8a.75.75 0 0 0-.75-.75zm8-2a.75.75 0 0 0-.75.75v14a.75.75 0 0 0 1.5 0V6a.75.75 0 0 0-.75-.75zm-12 4a.75.75 0 0 0-.75.75v10a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75zm16 2a.75.75 0 0 0-.75.75v8a.75.75 0 0 0 1.5 0V12a.75.75 0 0 0-.75-.75z" />
  </svg>
);

const AzureIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M13.05 4.24 6.56 18.05l-4.49-.01 2.94-6.28a.5.5 0 0 0-.04-.52L.21 4.47a.5.5 0 0 1 .44-.77h5.75l6.65 13.07V4.24zm1.31 0h5.53L14.5 20.33a.5.5 0 0 1-.48.36H9.77z" />
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

const TableauIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <rect x="11.25" y="2" width="1.5" height="5" rx="0.75" />
    <rect x="11.25" y="17" width="1.5" height="5" rx="0.75" />
    <rect x="2" y="11.25" width="5" height="1.5" rx="0.75" />
    <rect x="17" y="11.25" width="5" height="1.5" rx="0.75" />
    <rect x="11.25" y="7.5" width="1.5" height="3.5" rx="0.75" />
    <rect x="11.25" y="13" width="1.5" height="3.5" rx="0.75" />
    <rect x="7.5" y="11.25" width="3.5" height="1.5" rx="0.75" />
    <rect x="13" y="11.25" width="3.5" height="1.5" rx="0.75" />
    <circle cx="12" cy="12" r="1.25" />
  </svg>
);

const DAXIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M3 17l6-8 4 5 3-4 5 7H3z" opacity="0.9" />
    <path d="M3 20h18v1.5H3z" />
  </svg>
);

/* ─── Icon map: item name → react-icon or custom SVG ─── */
const ITEM_ICONS: Record<string, IconType | React.ComponentType> = {
  "dbt (Data Build Tool)": SiDbt,
  "dbt":                   SiDbt,
  "Apache Airflow":        SiApacheairflow,
  "Python":                SiPython,
  "Pandas":                SiPandas,
  "NumPy":                 SiNumpy,
  "Google BigQuery":       SiGooglebigquery,
  "Snowflake":             SiSnowflake,
  "Azure Synapse":         AzureIcon,
  "SQL Server":            SQLServerIcon,
  "PostgreSQL":            SiPostgresql,
  "SQL Avancé":            SiPostgresql,
  "Advanced SQL":          SiPostgresql,
  "Power BI":              PowerBIIcon,
  "DAX":                   DAXIcon,
  "Tableau":               TableauIcon,
  "Looker":                SiLooker,
  "Metabase":              SiMetabase,
  "Git / GitHub CI/CD":    SiGit,
  "Git":                   SiGit,
  "Docker":                SiDocker,
  "JIRA":                  SiJira,
  "Dataiku ML Practitioner": SiDataiku,
  "Dataiku ML":            SiDataiku,
  // Cert org-level fallbacks
  "Dataiku":               SiDataiku,
  "Dataiku Advanced Designer": SiDataiku,
  "Dataiku Core Designer": SiDataiku,
  "Google":                SiGoogleanalytics,
  "Certification Google Analytics": SiGoogleanalytics,
  "Google Analytics Certification": SiGoogleanalytics,
  "Python for Data Science": SiPython,
  "Coursera":              SiCoursera,
  "Introduction to CRM with HubSpot": SiHubspot,
};

/* ─── Category header icons (react-icons for real brand logos) ─── */
const CATEGORY_ICONS: Record<string, ReactNode> = {
  analytics: <SiDbt size={22} aria-hidden="true" />,
  databases: <SiGooglebigquery size={22} aria-hidden="true" />,
  dataviz:   <SiMetabase size={22} aria-hidden="true" />,
  devops:    <SiDocker size={22} aria-hidden="true" />,
};

const TECH_KEYS = ["analytics", "databases", "dataviz", "devops"];

const GREEN = "#22c55e";
const CYAN = "#00f0ff";

type Category = {
  name: string;
  emoji: string;
  description: string;
  items: readonly string[];
};

type Certification = {
  name: string;
  org: string;
  detail: string;
  status: string;
  color: string;
  date?: string;
};

type Language = {
  lang: string;
  level: string;
  native: boolean;
};

export default function Skills() {
  const { t } = useLanguage();

  const all = Object.entries(t.skills.categories) as [string, Category][];
  const techCats = all.filter(([k]) => TECH_KEYS.includes(k));
  const certs = t.skills.certifications as readonly Certification[];
  const langs = t.skills.languages as readonly Language[];

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <ScrollReveal>
          <SectionLabel text={t.skills.label} />
          <h2
            className="section-title font-display mt-4 mb-12 md:mb-16"
            style={{ fontSize: "clamp(22px, 6vw, 60px)" }}
          >
            {t.skills.title}
          </h2>
        </ScrollReveal>

        {/* ── Technical group label ── */}
        <ScrollReveal>
          <GroupLabel label={t.skills.groupTech} color={GREEN} />
        </ScrollReveal>

        {/* ── 4 skill cards ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{
            gap: "20px",
            marginBottom: "56px",
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

        {/* ── Certifications & Languages ── */}
        <ScrollReveal>
          <GroupLabel label={t.skills.groupFunc} color={CYAN} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Certification cards — 1-col mobile, 2-col md+ */}
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: "16px" }}
            >
              {certs.map((cert) => (
                <CertCard key={cert.name} cert={cert} />
              ))}
            </div>

            {/* Language badges — max-w-full prevents overflow on narrow screens */}
            <div
              style={{
                maxWidth: "100%",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                alignItems: "center",
                padding: "16px 20px",
                background: "var(--color-bg-card)",
                border: `1px solid ${CYAN}28`,
                borderTop: `3px solid ${CYAN}`,
                borderRadius: "12px",
                overflowX: "hidden",
              }}
            >
              {langs.map((l) => (
                <div key={l.lang} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {l.lang}
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      background: `${CYAN}12`,
                      border: `1px solid ${CYAN}30`,
                      borderRadius: "100px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: CYAN,
                      fontFamily: "var(--font-mono)",
                      marginTop: "4px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {l.level}
                    {l.native && " ★"}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

/* ─── Group label ─── */
function GroupLabel({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
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

/* ─── Certification card ─── */
function CertCard({ cert }: { cert: Certification }) {
  const isObtained = cert.status === "Obtenu" || cert.status === "Obtained";
  const Icon = ITEM_ICONS[cert.name] ?? ITEM_ICONS[cert.org];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 20px",
        background: "var(--color-bg-card)",
        border: `1px solid var(--color-border)`,
        borderLeft: `3px solid ${cert.color}`,
        borderRadius: "12px",
        minWidth: 0,
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "10px",
          background: `${cert.color}18`,
          border: `1px solid ${cert.color}35`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: cert.color,
          fontSize: "18px",
          flexShrink: 0,
        }}
      >
        {Icon ? <Icon /> : <span style={{ fontWeight: 700, fontSize: "13px", fontFamily: "var(--font-mono)" }}>{cert.org[0]}</span>}
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text)", fontFamily: "var(--font-display)", lineHeight: 1.2 }}>
          {cert.name}
        </div>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>
          {cert.detail}
        </div>
        {cert.date && (
          <div style={{ fontSize: "10px", color: "var(--color-text-muted)", marginTop: "2px", fontFamily: "var(--font-mono)", opacity: 0.6 }}>
            {cert.date}
          </div>
        )}
        <span
          style={{
            display: "inline-block",
            marginTop: "5px",
            padding: "2px 8px",
            borderRadius: "100px",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: isObtained ? "rgba(34,197,94,0.1)" : `${cert.color}12`,
            border: `1px solid ${isObtained ? "rgba(34,197,94,0.3)" : cert.color + "35"}`,
            color: isObtained ? "#22c55e" : cert.color,
            fontFamily: "var(--font-mono)",
          }}
        >
          {isObtained ? "✓ " : "◎ "}{cert.status}
        </span>
      </div>
    </div>
  );
}

/* ─── Skill card ─── */
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
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s, background 0.3s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
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
      {/* Glow strip */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "80px",
          background: `radial-gradient(ellipse at 50% 0%, ${accent}0f 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Card number */}
      <span
        style={{
          position: "absolute", top: "20px", right: "24px",
          fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: 700,
          color: `${accent}50`, letterSpacing: "0.08em",
        }}
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Category icon */}
      <div
        style={{
          marginBottom: "16px",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: "44px", height: "44px", borderRadius: "10px",
          background: `${accent}12`, border: `1px solid ${accent}28`,
          color: accent,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-display)",
          color: "var(--color-text)", letterSpacing: "-0.02em",
          lineHeight: 1.2, marginBottom: "12px",
        }}
      >
        {category.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px", lineHeight: 1.75,
          color: "var(--color-text-secondary)", marginBottom: "20px", flex: 1,
        }}
      >
        {category.description}
      </p>

      {/* Skill pills with brand icons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {category.items.map((item) => {
          const IconComp = ITEM_ICONS[item];
          return (
            <span
              key={item}
              style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                padding: "4px 10px",
                fontSize: "11px", fontWeight: 500, borderRadius: "100px",
                background: `${accent}10`, border: `1px solid ${accent}28`,
                color: accent, fontFamily: "var(--font-mono)", letterSpacing: "0.02em",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              {IconComp && (
                <span style={{ fontSize: "12px", lineHeight: 1, display: "flex", alignItems: "center" }}>
                  <IconComp />
                </span>
              )}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
