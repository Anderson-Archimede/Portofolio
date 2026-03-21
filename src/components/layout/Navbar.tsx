"use client";

import { useState, useEffect, useCallback } from "react";
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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    },
    [isOpen]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
      <div className="flex md:hidden items-center justify-between px-5 py-4">
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
            className="flex items-center justify-center ml-1 rounded-lg"
            style={{
              width: "44px",
              height: "44px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
            aria-label={
              isOpen
                ? lang === "fr" ? "Fermer le menu" : "Close menu"
                : lang === "fr" ? "Ouvrir le menu" : "Open menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="w-6 h-4 flex flex-col justify-between" aria-hidden="true">
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
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-b border-border overflow-hidden"
            style={{
              background: "rgba(8,8,8,0.99)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            <nav aria-label={lang === "fr" ? "Menu principal" : "Main menu"}>
              <div className="flex flex-col py-6 px-5" style={{ gap: "2px" }}>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={activeSection === link.id ? "page" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      fontSize: "17px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                      color:
                        activeSection === link.id
                          ? "var(--color-accent)"
                          : "var(--color-text-secondary)",
                      background:
                        activeSection === link.id
                          ? "rgba(0,240,255,0.06)"
                          : "transparent",
                      borderLeft:
                        activeSection === link.id
                          ? "2px solid var(--color-accent)"
                          : "2px solid transparent",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              {/* Footer zone: cta */}
              <div
                style={{
                  padding: "12px 21px 20px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary"
                  style={{ fontSize: "13px", padding: "10px 20px", display: "inline-flex" }}
                >
                  {lang === "fr" ? "Me contacter" : "Contact me"}
                </a>
              </div>
            </nav>
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
