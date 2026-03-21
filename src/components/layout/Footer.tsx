"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-10" style={{ position: "relative" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(0,240,255,0.4), transparent)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-text-muted">
        <p className="font-mono">
          &copy; {new Date().getFullYear()} Anderson Kouassi.{" "}
          <span>{t.footer.rights}</span>
        </p>
        <p className="flex items-center gap-1.5 font-mono">
          {t.footer.made}{" "}
          <span className="text-accent text-[14px]" aria-hidden="true">♥</span>{" "}
          {t.footer.by}
        </p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 font-mono text-text-muted hover:text-accent transition-colors duration-200 group"
          aria-label={t.footer.scrollTop}
        >
          <svg
            className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Top
        </button>
      </div>
    </footer>

  );
}
