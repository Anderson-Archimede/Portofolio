"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const LANG_OPTIONS = ["fr", "en"] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["about", "skills", "experience", "terminal", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "#about", label: t.nav.about, id: "about" },
    { href: "#skills", label: t.nav.skills, id: "skills" },
    { href: "#experience", label: t.nav.experience, id: "experience" },
    { href: "#terminal", label: t.nav.terminal, id: "terminal" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-[28px] border-b border-[rgba(255,255,255,0.06)]"
          : "bg-[rgba(8,8,8,0.4)] backdrop-blur-[12px]"
      }`}
      aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-left z-10"
        style={{
          scaleX,
          height: "1.5px",
          background:
            "linear-gradient(to right, var(--color-accent), var(--color-accent-secondary), var(--color-accent-pink))",
        }}
        aria-hidden="true"
      />

      {/* Desktop — logo left | links center | lang right */}
      <div className="hidden md:flex items-center justify-between px-10 py-6">
        {/* Brand */}
        <a
          href="#"
          className="font-display font-bold text-[18px]"
          style={{ color: "var(--color-accent)" }}
          aria-label={lang === "fr" ? "Anderson Kouassi — accueil" : "Anderson Kouassi — home"}
        >
          AK.
        </a>

        {/* Centered nav links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium tracking-wide transition-colors duration-200 relative py-1"
              aria-current={activeSection === link.id ? "true" : undefined}
              style={{
                color: activeSection === link.id ? "#ffffff" : "rgba(255,255,255,0.5)",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== link.id)
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.id)
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                />
              )}
            </a>
          ))}
        </div>

        {/* Language toggle — segmented pill */}
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      {/* Mobile header */}
      <div className="flex md:hidden items-center justify-between px-6 py-5">
        <a
          href="#"
          className="font-display font-bold text-[20px]"
          style={{ color: "var(--color-accent)" }}
          aria-label={lang === "fr" ? "Anderson Kouassi — accueil" : "Anderson Kouassi — home"}
        >
          AK.
        </a>
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} size="sm" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-4 flex flex-col justify-between ml-1"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-full h-[1.5px] bg-text transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-full h-[1.5px] bg-text transition-all duration-300 ${
                isOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block w-full h-[1.5px] bg-text transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[rgba(8,8,8,0.98)] backdrop-blur-[24px] border-b border-border overflow-hidden"
          >
            <div className="flex flex-col items-center gap-7 py-12">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={activeSection === link.id ? "true" : undefined}
                  className={`text-[20px] font-semibold transition-colors duration-200 ${
                    activeSection === link.id
                      ? "text-accent"
                      : "text-text-secondary hover:text-accent"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function LangToggle({
  lang,
  setLang,
  size = "md",
}: {
  lang: string;
  setLang: (l: "fr" | "en") => void;
  size?: "sm" | "md";
}) {
  const isSmall = size === "sm";

  return (
    <div
      role="group"
      aria-label="Sélection de la langue"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "100px",
        padding: "3px",
      }}
    >
      {LANG_OPTIONS.map((l) => {
        const isActive = lang === l;
        return (
          <motion.button
            key={l}
            onClick={() => !isActive && setLang(l)}
            animate={{
              background: isActive ? "var(--color-accent)" : "transparent",
              color: isActive ? "#080808" : "rgba(255,255,255,0.45)",
            }}
            whileHover={
              isActive
                ? {}
                : { color: "rgba(255,255,255,0.85)" }
            }
            transition={{ duration: 0.2 }}
            style={{
              padding: isSmall ? "3px 9px" : "4px 12px",
              borderRadius: "100px",
              fontSize: isSmall ? "10px" : "11px",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: isActive ? "default" : "pointer",
              border: "none",
              outline: "none",
            }}
            aria-pressed={isActive}
            aria-label={l === "fr" ? "Version française" : "English version"}
          >
            {l.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}
