"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.contact.email);
    } catch {
      const el = document.createElement("textarea");
      el.value = t.contact.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const stats = [
    { value: "3.5+", label: t.contact.statsExp },
    { value: "10+", label: t.contact.statsProjects },
    { value: "~150K$", label: t.contact.statsSavings },
    { value: "95%", label: t.contact.statsSatisfaction },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      handle: "kouassi-anderson-ehoussou",
      href: t.contact.linkedin,
      color: "#0A66C2",
      icon: (
        <svg
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      handle: "Anderson-Archimede",
      href: t.contact.github,
      color: "#6e7681",
      icon: (
        <svg
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: t.contact.phoneLabel,
      handle: "+33 7 45 30 31 45",
      href: "tel:+33745303145",
      color: "#22c55e",
      icon: (
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,240,255,0.04) 0%, transparent 70%)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal className="text-center">
          <SectionLabel text={t.contact.label} />
          <h2 className="section-title font-display mt-4 mb-4">
            {t.contact.title}
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "var(--color-text-secondary)",
              maxWidth: "500px",
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        {/* Stats strip */}
        <ScrollReveal delay={0.1}>
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{
              gap: "1px",
              background: "var(--color-border)",
              border: "1px solid var(--color-border)",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "48px",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 16px",
                  textAlign: "center",
                  background: "var(--color-bg-card-inner)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(22px, 3vw, 30px)",
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
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Main email CTA */}
        <ScrollReveal delay={0.15}>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            {/* Glow behind */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-20px",
                background:
                  "radial-gradient(ellipse, rgba(0,240,255,0.08), transparent 70%)",
                borderRadius: "24px",
                pointerEvents: "none",
              }}
            />
            {/* Email card — div wrapper (no interactive nesting) */}
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 24px 64px rgba(0,240,255,0.14)" }}
              transition={{ duration: 0.25 }}
              data-contact="email-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "24px 28px",
                background: "rgba(0,240,255,0.04)",
                border: "1px solid rgba(0,240,255,0.2)",
                borderRadius: "14px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,240,255,0.4)";
                el.style.background = "rgba(0,240,255,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,240,255,0.2)";
                el.style.background = "rgba(0,240,255,0.04)";
              }}
            >
              {/* Clickable email info — the actual mailto link */}
              <a
                href={`mailto:${t.contact.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(0,240,255,0.1)",
                    border: "1px solid rgba(0,240,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00f0ff",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-muted)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Email
                  </div>
                  <div
                    data-contact="email-text"
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {t.contact.email}
                  </div>
                </div>
              </a>

              {/* Actions — siblings of <a>, not nested inside */}
              <div
                data-contact="email-actions"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={copyEmail}
                  style={{
                    padding: "10px 14px",
                    minHeight: "44px",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border-light)",
                    background: "var(--color-bg-card)",
                    color: copied ? "#22c55e" : "var(--color-text-secondary)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s",
                  }}
                  aria-label={t.contact.copyEmail}
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {t.contact.copied}
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {t.contact.copyEmail}
                    </>
                  )}
                </button>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "rgba(0,240,255,0.5)" }} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Social links card grid */}
        <ScrollReveal delay={0.25}>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  padding: "20px",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = `${link.color}60`;
                  el.style.background = `${link.color}08`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "var(--color-border)";
                  el.style.background = "var(--color-bg-card)";
                }}
              >
                <div style={{ color: link.color, opacity: 0.8 }}>
                  {link.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "var(--color-text)",
                      marginBottom: "3px",
                    }}
                  >
                    {link.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {link.handle}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        {/* CV Download button */}
        <ScrollReveal delay={0.3}>
          <motion.a
            href="/cv.pdf"
            download="Kouassi_Anderson_CV.pdf"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "14px 24px",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border-light)",
              borderRadius: "10px",
              textDecoration: "none",
              color: "var(--color-text-secondary)",
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              letterSpacing: "0.5px",
              transition: "all 0.2s",
              marginBottom: "40px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(168,85,247,0.4)";
              el.style.color = "#a855f7";
              el.style.background = "rgba(168,85,247,0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--color-border-light)";
              el.style.color = "var(--color-text-secondary)";
              el.style.background = "var(--color-bg-card)";
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            {t.contact.downloadCV}
          </motion.a>
        </ScrollReveal>

        {/* Availability + what I'm open to */}
        <ScrollReveal delay={0.35}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                padding: "10px 20px",
                borderRadius: "100px",
                border: "1px solid rgba(34,197,94,0.2)",
                background: "rgba(34,197,94,0.04)",
                marginBottom: "12px",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 10px rgba(34,197,94,0.7)",
                  animation: "pulse 2s ease-in-out infinite",
                  flexShrink: 0,
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--font-mono)",
                  color: "#22c55e",
                  fontWeight: 500,
                }}
              >
                {t.contact.available}
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t.contact.openTo}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
