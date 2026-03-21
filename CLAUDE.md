# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Production build → outputs to /out/ (static export)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Next.js 15 static portfolio site** (TypeScript + Tailwind CSS 4 + Framer Motion).
Configured for static HTML export (`output: "export"` in `next.config.ts`) — no SSR, no API routes.

### Source layout

```
src/
├── app/
│   ├── page.tsx          # Root page — composes all sections
│   ├── layout.tsx        # Root layout: fonts, metadata, LanguageProvider wrapper
│   └── globals.css       # CSS custom properties (colors, typography classes)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, About, Skills, Experience, Projects, Terminal, Contact
│   ├── animations/       # ScrollReveal (Framer Motion whileInView wrapper)
│   └── ui/               # ParticleCanvas (canvas particle effect), SectionLabel
└── lib/
    ├── i18n.ts           # All FR/EN translation strings
    └── LanguageContext.tsx  # Context + useLanguage hook
```

### Key patterns

- **Bilingual (FR/EN):** All user-facing text lives in `src/lib/i18n.ts`. Components consume translations via `useLanguage()` hook from `LanguageContext`. French is the default.
- **Animations:** `ScrollReveal` wraps Framer Motion `whileInView` for scroll-triggered reveals. Section-level animations use Framer Motion directly.
- **Styling:** Tailwind utility classes + reusable semantic classes defined in `globals.css` (`.hero-title`, `.section-title`, `.card`, `.label-badge`, `.section-padding`).
- **Dark theme:** Color palette defined as CSS variables on `:root` in `globals.css` — violet (`#7c3aed`), cyan (`#06b6d4`), pink (`#ff6b9d`) accents on `#0a0a0a` background.
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (terminal/code) — loaded via `next/font/google` in `layout.tsx`.
- **Path alias:** `@/*` maps to `src/*`.

### Adding content

- **New section:** Create `src/components/sections/MySection.tsx`, add translations to both `fr` and `en` objects in `i18n.ts`, import and place in `src/app/page.tsx`.
- **New translations:** Always add keys to both `fr` and `en` in `i18n.ts` simultaneously.
