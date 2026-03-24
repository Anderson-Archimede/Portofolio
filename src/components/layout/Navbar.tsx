"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import type { Theme } from "@/lib/LanguageContext";

const LANG_OPTIONS = ["fr", "en"] as const;

export default function Navbar() {
  const { lang, setLang, t, theme, toggleTheme } = useLanguage();
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
    { href: "#experience", label: t.nav.experience, id: "experience" },
    { href: "#skills", label: t.nav.skills, id: "skills" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#terminal", label: t.nav.terminal, id: "terminal" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--color-bg-overlay)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(28px)" : "blur(12px)",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      }}
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
                color: activeSection === link.id ? "var(--color-text)" : "var(--color-text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== link.id)
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.id)
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-secondary)";
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

        {/* Controls: theme toggle + language toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} lang={lang} />
          <LangToggle lang={lang} setLang={setLang} theme={theme} />
        </div>
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
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} lang={lang} size="sm" />
          <LangToggle lang={lang} setLang={setLang} size="sm" theme={theme} />
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
              background: "var(--color-bg-overlay)",
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
                          ? "var(--color-accent-glow)"
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
                  borderTop: "1px solid var(--color-border)",
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

function ThemeToggle({
  theme,
  toggleTheme,
  lang,
  size = "md",
}: {
  theme: Theme;
  toggleTheme: () => void;
  lang: string;
  size?: "sm" | "md";
}) {
  const isSmall = size === "sm";
  const dim = isSmall ? "36px" : "38px";
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.15 }}
      style={{
        width: dim,
        height: dim,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "1px solid var(--color-border-light)",
        background: "var(--color-bg-card)",
        color: "var(--color-text-secondary)",
        flexShrink: 0,
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = "var(--color-bg-card-hover)";
        el.style.borderColor = "var(--color-accent)";
        el.style.color = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = "var(--color-bg-card)";
        el.style.borderColor = "var(--color-border-light)";
        el.style.color = "var(--color-text-secondary)";
      }}
      aria-label={
        isDark
          ? lang === "fr" ? "Passer en mode gris" : "Switch to dim mode"
          : lang === "fr" ? "Passer en mode sombre" : "Switch to dark mode"
      }
      aria-pressed={!isDark}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {isDark ? (
          /* Sun icon — shown in dark mode to switch to light */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          /* Moon icon — shown in light mode to switch to dark */
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </motion.span>
    </motion.button>
  );
}

function LangToggle({
  lang,
  setLang,
  size = "md",
  theme,
}: {
  lang: string;
  setLang: (l: "fr" | "en") => void;
  size?: "sm" | "md";
  theme: Theme;
}) {
  const isSmall = size === "sm";
  // Hardcoded per-theme so the container is always visibly distinct,
  // regardless of CSS variable resolution order (Tailwind v4 `*` scope issue).
  const containerBg = theme === "light" ? "#3f3f46" : "#1e1e20";
  const containerBorder = theme === "light" ? "1px solid #52525b" : "1px solid #2e2e32";

  return (
    <div
      role="group"
      aria-label="Sélection de la langue"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        background: containerBg,
        border: containerBorder,
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
              color: isActive ? "var(--color-bg)" : "var(--color-text-secondary)",
            }}
            whileHover={
              isActive
                ? {}
                : { color: "var(--color-text)" }
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
