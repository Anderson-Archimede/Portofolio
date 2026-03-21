"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import ParticleCanvas from "@/components/ui/ParticleCanvas";

export default function Hero() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      <ParticleCanvas />

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none z-10" />

      <div className="relative z-20 flex flex-col items-center text-center px-5 w-full max-w-[1200px] mx-auto">

        {/* Profile photo — spinning ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <div style={{ position: "relative", width: "200px", height: "200px" }}>
            {/* Background glow orb behind photo */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-40px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            {/* Outer glow ring — animated spin */}
            <div
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, transparent 0%, #00f0ff 30%, transparent 60%, #a855f7 80%, transparent 100%)",
                animation: "spin 8s linear infinite",
                opacity: 0.6,
              }}
              aria-hidden="true"
            />
            {/* Dark mask to separate ring from photo */}
            <div
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                background: "#080808",
              }}
              aria-hidden="true"
            />
            {/* Photo container */}
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(0,240,255,0.3)",
                boxShadow:
                  "0 0 40px rgba(0,240,255,0.15), 0 0 80px rgba(0,240,255,0.08)",
              }}
            >
              {!imgError ? (
                <Image
                  src="/images/profile.jpg"
                  alt="Anderson Kouassi"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-bg-card text-[56px] font-display font-bold text-accent">
                  AK
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero badge with pulsing green availability dot */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <span className="hero-badge">
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                animation: "pulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {t.hero.title}
          </span>
        </motion.div>

        {/* MASSIVE title — crshdn style */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 w-full"
        >
          <h1 className="crshdn-title font-display">
            <span className="block text-text">{t.hero.greeting}</span>
            <span className="block text-text">
              {t.hero.name}
              <span style={{ color: "var(--color-accent)" }}>.</span>
            </span>
          </h1>
        </motion.div>

        {/* Tagline — improved layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="space-y-4 mt-10"
        >
          {/* "Since" line */}
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t.hero.since}
          </p>

          {/* "Currently" pill-link */}
          <a
            href="#experience"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              transition: "all 0.2s",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(0,240,255,0.3)";
              el.style.color = "#00f0ff";
              el.style.background = "rgba(0,240,255,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "rgba(255,255,255,0.7)";
              el.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {t.hero.currently}
            <svg
              style={{ width: "14px", height: "14px", opacity: 0.6 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {/* Two CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="#about" className="btn btn-primary">
              {t.hero.cta}
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t.hero.contact}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <div className="w-[22px] h-[36px] rounded-full border border-border-light flex justify-center pt-[7px]">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-[6px] rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
