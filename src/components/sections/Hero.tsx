"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import ParticleCanvas from "@/components/ui/ParticleCanvas";

export default function Hero() {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      <ParticleCanvas />

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none z-10" />

      <div className="relative z-20 flex flex-col items-center text-center px-5 sm:px-8 w-full max-w-[1200px] mx-auto">

        {/* Profile photo — spinning ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 md:mb-5"
        >
          {/* Responsive photo size: 140px mobile, 200px md+ */}
          <div className="w-[140px] h-[140px] md:w-[200px] md:h-[200px]" style={{ position: "relative" }}>
            {/* Background glow orb — clipped to section overflow-hidden */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-30px",
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
            {/* Mask to separate ring from photo — adapts to theme */}
            <div
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                background: "var(--color-bg)",
              }}
              aria-hidden="true"
            />
            {/* Photo container — fills parent div */}
            <div
              className="hero-photo-frame"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
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
                <div className="w-full h-full flex items-center justify-center bg-bg-card text-[40px] md:text-[56px] font-display font-bold text-accent">
                  AK
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Role & since — just below profile photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-8 md:mb-10 flex flex-col items-center gap-2"
        >
          <span
            className="hero-title-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 22px",
              background: "var(--color-accent)",
              color: "var(--color-bg)",
              fontSize: "clamp(13px, 1.2vw, 16px)",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: "100px",
              boxShadow: "0 0 24px rgba(0,240,255,0.35)",
            }}
          >
            {t.hero.title}
          </span>
          <p
            style={{
              fontSize: "clamp(12px, 1.1vw, 14px)",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              opacity: 0.65,
              letterSpacing: "0.05em",
            }}
          >
            {t.hero.since}
          </p>
        </motion.div>

        {/* MASSIVE title — crshdn style */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 w-full"
        >
          <h1
            className="crshdn-title font-display"
            style={{ fontSize: isMobile ? "1.875rem" : "clamp(34px, 10vw, 170px)" }}
          >
            <span className="block text-text">{t.hero.greeting}</span>
            <span
              className="crshdn-name block text-text"
              style={{
                fontSize: isMobile ? "1.875rem" : "clamp(72px, 10vw, 124px)",
                whiteSpace: isMobile ? "normal" : "nowrap",
              }}
            >
              {t.hero.name}
              <span style={{ color: "var(--color-accent)" }}>.</span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle — key value proposition */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          style={{
            fontSize: "clamp(14px, 1.6vw, 17px)",
            color: "var(--color-text-secondary)",
            maxWidth: "600px",
            lineHeight: 1.8,
            marginBottom: "32px",
          }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Availability status pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <a
            href="#experience"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              padding: "9px 16px",
              borderRadius: "100px",
              border: "1px solid var(--color-border-light)",
              background: "var(--color-bg-card)",
              transition: "all 0.2s",
              backdropFilter: "blur(8px)",
              fontFamily: "var(--font-mono)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(34,197,94,0.4)";
              el.style.color = "#22c55e";
              el.style.background = "rgba(34,197,94,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--color-border-light)";
              el.style.color = "var(--color-text-secondary)";
              el.style.background = "var(--color-bg-card)";
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                flexShrink: 0,
                animation: "pulse 2s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            {t.hero.currently}
          </a>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-3 md:justify-center items-stretch md:items-center">
            <a href="#about" className="btn btn-primary w-full md:w-auto" style={{ justifyContent: "center" }}>
              {t.hero.cta}
            </a>
            <a href="#contact" className="btn btn-secondary w-full md:w-auto" style={{ justifyContent: "center" }}>
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
