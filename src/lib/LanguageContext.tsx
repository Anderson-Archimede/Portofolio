"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { Lang, translations } from "./i18n";

type TranslationSet = (typeof translations)[Lang];
export type Theme = "dark" | "light";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationSet;
  theme: Theme;
  toggleTheme: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [theme, setThemeState] = useState<Theme>("dark");

  // Initialize from localStorage (SSR-safe)
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang | null;
    if (savedLang === "fr" || savedLang === "en") {
      setLangState(savedLang);
    }

    // Dark is the canonical default — never auto-follow OS preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const resolvedTheme: Theme =
      savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";
    setThemeState(resolvedTheme);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, []);

  // Stable reference — persists to localStorage and syncs html[lang]
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  // Stable context value — only changes when lang or theme changes
  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang], theme, toggleTheme }),
    [lang, setLang, theme, toggleTheme]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
