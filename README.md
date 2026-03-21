# Portfolio — Kouassi Anderson Ehoussou

Site portfolio personnel de **Anderson Kouassi**, Data Analyst & Consultant BI, conçu comme une single-page application statique bilingue (FR/EN).

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 15.3.3 | Framework React (export statique) |
| React | 19.1.0 | UI |
| TypeScript | 5.8.3 | Typage statique |
| Tailwind CSS | 4.1.8 | Styles utilitaires |
| Framer Motion | 12.12.1 | Animations et transitions |

---

## Commandes

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (hot reload)
npm run dev

# Générer le build de production (export statique → /out/)
npm run build

# Démarrer le serveur de production
npm run start

# Lancer l'analyse ESLint
npm run lint
```

> Le build produit un export HTML statique dans `/out/` (configurable via `next.config.ts`).
> Aucun serveur Node.js n'est requis en production — le dossier `/out/` peut être hébergé sur n'importe quel CDN ou serveur statique (Vercel, Netlify, GitHub Pages, etc.).

---

## Structure du projet

```
Portofolio/
├── public/                    # Assets statiques (CV, favicon, images)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Page racine — compose toutes les sections
│   │   ├── layout.tsx         # Layout global : fonts, metadata, LanguageProvider
│   │   └── globals.css        # Variables CSS (couleurs, classes typographiques)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Barre de navigation fixe avec toggle FR/EN
│   │   │   └── Footer.tsx     # Pied de page
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Section d'accueil (titre, CTA)
│   │   │   ├── About.tsx      # Présentation + métriques clés
│   │   │   ├── Skills.tsx     # Grille de compétences (technique + fonctionnel)
│   │   │   ├── Experience.tsx # Timeline des expériences professionnelles
│   │   │   ├── Terminal.tsx   # Terminal interactif simulé
│   │   │   └── Contact.tsx    # Informations de contact + liens
│   │   ├── animations/
│   │   │   └── ScrollReveal.tsx  # Wrapper Framer Motion (whileInView)
│   │   └── ui/
│   │       ├── ParticleCanvas.tsx  # Effet de particules canvas
│   │       └── SectionLabel.tsx    # Badge label de section
│   └── lib/
│       ├── i18n.ts            # Toutes les traductions FR/EN
│       └── LanguageContext.tsx # Context React + hook useLanguage()
├── next.config.ts             # Config Next.js (output: "export")
├── tailwind.config.ts         # Config Tailwind (si applicable)
└── tsconfig.json              # Config TypeScript
```

---

## Fonctionnalites

### Sections

- **Hero** — Accroche principale avec titre animé, statut de disponibilité, et deux CTA (En savoir plus / Me contacter)
- **About** — Présentation narrative avec 3 métriques clés : 3,5+ ans d'expérience, 3 secteurs couverts, ~150K EUR de ROI generés
- **Skills** — Grille de compétences organisée en deux groupes :
  - *Expertise Technique* : Data Viz & BI, Data Engineering, Cloud & DevOps, Gestion & Méthodo
  - *Expertise Fonctionnelle* : Business Analysis, Méthodologies & Gestion de projet, SI & Data & Outils
- **Experience** — Timeline des 3 expériences professionnelles (Malakoff Humanis, Optimum Mobility, Veo Worldwide Services) avec liste de réalisations
- **Terminal** — Terminal interactif simulé avec les commandes : `help`, `whoami`, `about`, `skills`, `experience`, `education`, `contact`, `clear`
- **Contact** — Email copiable en un clic, téléphone, liens LinkedIn et GitHub, statistiques, bouton téléchargement CV

### Internationalisation (i18n)

Le site est entièrement bilingue **Français / Anglais**.

- Toutes les chaînes de texte sont centralisées dans [`src/lib/i18n.ts`](src/lib/i18n.ts)
- Le hook `useLanguage()` expose la langue active et la fonction de bascule
- Le français est la langue par défaut
- Le toggle de langue est accessible depuis la Navbar

### Animations

- **ScrollReveal** — Révélation au scroll (Framer Motion `whileInView`) appliquée à chaque section
- **Framer Motion** — Transitions d'entrée, animations de survol sur les cartes de compétences et les boutons
- **ParticleCanvas** — Effet de particules animées en arrière-plan via Canvas API

### Design

- **Theme sombre** — Fond `#0a0a0a` avec accents violet (`#7c3aed`), cyan (`#06b6d4`) et rose (`#ff6b9d`)
- **Responsive** — Adapté mobile, tablette et desktop via classes Tailwind
- **Accessibilité** — Lien "Skip to content" pour la navigation clavier (WCAG 2.4.1), attributs `aria` sur les éléments interactifs
- **Fonts** — Space Grotesk (titres), Inter (corps), JetBrains Mono (terminal/code) via `next/font/google`

### Alias de chemin

```ts
// tsconfig.json
"@/*" → "src/*"

// Exemple
import { useLanguage } from "@/lib/LanguageContext";
```

---

## Ajouter du contenu

### Nouvelle section

1. Créer `src/components/sections/MaSection.tsx`
2. Ajouter les clés de traduction dans les objets `fr` et `en` de `src/lib/i18n.ts`
3. Importer et positionner le composant dans `src/app/page.tsx`

### Nouvelles traductions

Toujours ajouter les clés simultanément dans `fr` et `en` dans [`src/lib/i18n.ts`](src/lib/i18n.ts) pour éviter les erreurs TypeScript.

---

## Déploiement

Le site s'exporte en HTML statique via `npm run build`. Le dossier `/out/` généré peut être déployé directement sur :

- **Vercel** — connexion GitHub, déploiement automatique
- **Netlify** — drag & drop du dossier `/out/` ou CI/CD
- **GitHub Pages** — push du contenu de `/out/` sur la branche `gh-pages`
- Tout serveur HTTP statique (Apache, Nginx, etc.)

---

## Auteur

**Kouassi Anderson Ehoussou**
Data Analyst & Consultant BI — Paris, France
[linkedin.com/in/kouassi-anderson-ehoussou](https://www.linkedin.com/in/kouassi-anderson-ehoussou) · [github.com/Anderson-Archimede](https://github.com/Anderson-Archimede)
