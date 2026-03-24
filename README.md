# Portfolio — Kouassi Anderson Ehoussou

Site portfolio personnel d'**Anderson Kouassi**, Analytics Engineer & Data Analyst, conçu comme une single-page application statique bilingue (FR/EN).

**Production** → [portofolio-pi-sand-46.vercel.app](https://portofolio-pi-sand-46.vercel.app)

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 15.3.3 | Framework React (export statique) |
| React | 19.1.0 | UI |
| TypeScript | 5.8.3 | Typage statique |
| Tailwind CSS | 4.1.8 | Styles utilitaires + variables CSS |
| Framer Motion | 12.12.1 | Animations et transitions |
| react-icons/si | 5.6.0 | Icônes de marques (Simple Icons) |

---

## Commandes

```bash
npm install        # Installer les dépendances
npm run dev        # Serveur de développement (hot reload)
npm run build      # Build de production → /out/ (export statique)
npm run start      # Serveur de production
npm run lint       # Analyse ESLint
vercel --prod      # Déploiement Vercel production
```

> Build 100% statique (`output: "export"`). Aucun serveur Node.js requis en production.

---

## Structure du projet

```
Portofolio/
├── public/
│   ├── images/profile.jpg              # Photo de profil
│   └── Kouassi Anderson Ehoussou.pdf   # CV téléchargeable
├── src/
│   ├── app/
│   │   ├── page.tsx           # Page racine — compose toutes les sections
│   │   ├── layout.tsx         # Layout global : fonts, metadata, LanguageProvider
│   │   └── globals.css        # Variables CSS (couleurs, classes typographiques)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Navbar fixe : scroll progress bar, toggle FR/EN, toggle thème
│   │   │   └── Footer.tsx     # Pied de page
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Accueil : photo, titre massif, subtitle, CTA
│   │   │   ├── About.tsx      # Présentation narrative + métriques ROI
│   │   │   ├── Skills.tsx     # Stack technique + certifications + langues
│   │   │   ├── Experience.tsx # Timeline alternée des expériences pro
│   │   │   ├── Projects.tsx   # Projets techniques avec stack pills
│   │   │   ├── Terminal.tsx   # Bento card "Profil en un coup d'œil"
│   │   │   └── Contact.tsx    # Email copiable, réseaux, téléchargement CV
│   │   ├── animations/
│   │   │   └── ScrollReveal.tsx       # Wrapper Framer Motion (whileInView)
│   │   └── ui/
│   │       ├── ParticleCanvas.tsx     # Anneaux lumineux animés (style crshdn.com)
│   │       └── SectionLabel.tsx       # Badge label de section
│   └── lib/
│       ├── i18n.ts            # Toutes les traductions FR/EN
│       └── LanguageContext.tsx # Context React + hook useLanguage() + thème
├── next.config.ts             # Config Next.js (output: "export")
└── tsconfig.json              # Config TypeScript
```

---

## Fonctionnalités

### Sections

- **Hero** — Photo de profil avec anneau rotatif, titre massif (crshdn-style), subtitle ROI, pill de disponibilité, deux CTA
- **About** — 3 paragraphes alignés CV + grille de 3 métriques clés (3,5+ ans, 3 secteurs, ~150K€ ROI)
- **Skills** — 4 cartes de compétences techniques avec icônes de marques (react-icons/si) + 9 certifications avec dates et icônes + langues avec niveaux CECRL
- **Experience** — Timeline alternée avec ligne de progression verte animée au scroll ; chaque poste : période, société, rôle, lieu, réalisations clés, pills de compétences mobilisées
- **Projects** — 3 projets techniques avec stack pills et highlight de performance
- **Terminal (Profil)** — Bento layout : carte identité (photo + badges disponibilité / localisation / mobilité), stats ROI, éducation, stack technique, timeline d'expérience
- **Contact** — Email avec copie en 1 clic, cards LinkedIn/GitHub/téléphone, téléchargement CV, pill de disponibilité

### Thèmes

Deux thèmes sombres premium, basculables via le toggle Navbar :

| Thème | Fond | Description |
|---|---|---|
| **Zinc** (défaut) | `#18181b` | Zinc-dark premium, excellent contraste |
| **Near-black** (toggle) | `#080808` | Quasi-noir absolu, maximal contrast |

Accents identiques sur les deux thèmes : cyan `#00f0ff`, violet `#a855f7`, rose `#ff6b9d`, vert `#22c55e`.

### ParticleCanvas

Animation canvas entièrement en style **crshdn.com** :
- Anneaux creux (`ctx.arc` + `ctx.stroke`, fond transparent via `clearRect`)
- 2 arcs orbitaux cyan très atténués centrés sur la zone photo (~44% viewport)
- Lignes de connexion courbes (quadratic bezier, opacité variable par distance)
- Vitesse max 0,45 px/frame, retour élastique ; ~45% des nœuds ont un anneau interne

### Certifications (9)

| Certification | Organisme | Date |
|---|---|---|
| Microsoft PL-300 Power BI | Microsoft | En cours 2025 |
| Dataiku Advanced Designer | Dataiku | Mai 2024 |
| Dataiku ML Practitioner | Dataiku | Jan 2024 |
| Dataiku Core Designer | Dataiku | Jan 2024 |
| Google Analytics | Google | Mar 2024 |
| Python for Data Science | IBM | Fév 2024 |
| Data Visualization with R | IBM | Fév 2024 |
| Hadoop Foundations Level 1 | IBM | Fév 2024 |
| Introduction to CRM with HubSpot | Coursera | Fév 2024 |

### Internationalisation (i18n)

Bilingue **Français / Anglais** — toutes les chaînes dans [`src/lib/i18n.ts`](src/lib/i18n.ts).

- Le hook `useLanguage()` expose `{ lang, setLang, t, theme, toggleTheme }`
- Langue et thème persistés dans `localStorage`
- Le français est la langue par défaut

### Accessibilité

- Lien "Skip to content" visible au focus (WCAG 2.4.1)
- Attributs `aria-label`, `aria-current`, `aria-expanded`, `aria-pressed` sur tous les éléments interactifs
- Focus visible via outline cyan, support `prefers-reduced-motion`

---

## Ajouter du contenu

### Nouvelle section

1. Créer `src/components/sections/MaSection.tsx`
2. Ajouter les clés dans `fr` **et** `en` de `src/lib/i18n.ts`
3. Importer et positionner dans `src/app/page.tsx`

### Nouvelle certification

Dans `src/lib/i18n.ts`, ajouter dans les deux tableaux `certifications` (FR et EN) :

```ts
{
  name: "Nom de la certification",
  org: "Organisme",
  detail: "Description courte",
  status: "Obtenu",   // ou "En cours" / "Obtained" / "In progress"
  color: "#hexcode",  // couleur de marque
  date: "Mois AAAA",
}
```

---

## Déploiement

```bash
npm run build   # génère /out/ (export statique)
vercel --prod   # déploie sur Vercel production
```

Chaque push sur `main` déclenche un redéploiement automatique via Vercel CI/CD.

---

## Auteur

**Kouassi Anderson Ehoussou** — Analytics Engineer & Data Analyst
Paris, France · Mobilité nationale & internationale · Disponible immédiatement
[linkedin.com/in/kouassi-anderson-ehoussou](https://www.linkedin.com/in/kouassi-anderson-ehoussou) · [github.com/Anderson-Archimede](https://github.com/Anderson-Archimede)
