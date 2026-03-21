export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      experience: "Parcours",
      terminal: "Terminal",
      contact: "Contact",
    },
    hero: {
      greeting: "Salut, je suis",
      name: "Anderson Kouassi",
      fullName: "Kouassi Anderson Ehoussou",
      title: "Data Analyst & Consultant BI",
      subtitle:
        "Je transforme des données complexes en recommandations stratégiques pour les directions.",
      since: "Data analyst depuis 2022",
      currently: "Actuellement, Data Analyst @ Malakoff Humanis",
      cta: "En savoir plus",
      contact: "Me contacter",
    },
    about: {
      label: "À propos",
      title: "Mon histoire",
      p1: "Une donnée brute ne prend de la valeur que lorsqu'elle se transforme en décision stratégique.",
      p2: "Aujourd'hui, de nombreuses entreprises possèdent énormément de données, mais manquent de visibilité claire pour piloter leur croissance. Mon rôle de Data Analyst et Consultant BI est précisément de créer ce pont entre la complexité technique des bases de données et les besoins clairs des dirigeants.",
      p3: "Avec plus de 3 ans d'expérience (Finance, Assurance, Mobilité), je ne me contente pas de créer de beaux tableaux de bord. Je conçois des écosystèmes analytiques complets orientés ROI.",
      metrics: [
        { value: "3.5+", label: "ans d'expérience" },
        { value: "3", label: "secteurs couverts" },
        { value: "~150K€", label: "ROI générés" },
      ],
    },
    skills: {
      label: "Compétences",
      title: "Mon expertise",
      groupTech: "Expertise Technique",
      groupFunc: "Expertise Fonctionnelle",
      categories: {
        dataViz: {
          name: "Data Viz & BI",
          emoji: "📊",
          description:
            "Transformation de données brutes en dashboards Power BI percutants, avec modélisation sémantique et optimisation DAX pour des KPIs stratégiques.",
          items: [
            "Power BI",
            "Tableau",
            "DAX",
            "Power Query",
            "Modélisation en étoile",
          ],
        },
        dataEng: {
          name: "Data Engineering",
          emoji: "⚙️",
          description:
            "Construction de pipelines ETL robustes avec Python, SQL optimisé et orchestration de flux de données via Azure Data Factory.",
          items: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "SQL Avancé",
            "SQL Server",
          ],
        },
        cloud: {
          name: "Cloud & DevOps",
          emoji: "☁️",
          description:
            "Déploiement de solutions data sur Azure (Synapse, ADF), conteneurisation Docker et gestion de versions Git.",
          items: [
            "Azure Data Factory",
            "Azure Synapse",
            "Docker",
            "Git",
            "API REST",
          ],
        },
        management: {
          name: "Gestion & Méthodo",
          emoji: "🎯",
          description:
            "Coordination Agile/Scrum, Product Ownership et storytelling data pour aligner équipes techniques et métier.",
          items: [
            "Scrum / Agile",
            "JIRA",
            "Product Ownership",
            "Storytelling Data",
          ],
        },
        businessAnalysis: {
          name: "Business Analysis & Fonctionnel",
          emoji: "🔍",
          description:
            "Recueil et formalisation des besoins métiers, animation d'ateliers, rédaction de spécifications fonctionnelles et pilotage de la recette.",
          items: [
            "Analyse & formalisation des besoins",
            "Animation d'ateliers métiers",
            "Spécifications fonctionnelles",
            "Rédaction de user stories",
            "Alimentation du backlog",
            "Participation aux comités projet",
            "Stratégie de tests & recette",
          ],
        },
        methodology: {
          name: "Méthodologies & Gestion de projet",
          emoji: "⚡",
          description:
            "Maîtrise des méthodologies Agile et cycle en V pour coordonner efficacement équipes métiers et techniques.",
          items: [
            "Agile : Scrum & Kanban",
            "Cycle en V",
            "Cérémonies agiles",
            "Coordination métiers / technique",
          ],
        },
        tools: {
          name: "SI & Data & Outils",
          emoji: "🛠️",
          description:
            "Maîtrise des outils clés de la chaîne data et du SI pour assurer la cohérence entre besoins fonctionnels et solutions techniques.",
          items: [
            "Power BI",
            "SQL",
            "ETL & intégration de données",
            "Jira",
            "Confluence",
            "Git",
          ],
        },
      },
    },
    experience: {
      label: "Parcours",
      title: "Mon expérience",
      jobs: [
        {
          company: "Malakoff Humanis",
          role: "Consultant BI / Business Analyst",
          location: "Orléans, France",
          period: "Déc 2024 — Déc 2025",
          description: "Aujourd'hui, de nombreuses entreprises possèdent énormément de données, mais manquent de visibilité claire pour piloter leur croissance. Mon rôle de Data Analyst et Consultant BI est précisément de créer ce pont entre la complexité technique des bases de données et les besoins clairs des dirigeants.",
          highlights: [
            "Analyser les besoins métiers auprès des directions Assurance, RH et Commerce",
            "Animer des ateliers métiers pour cadrer fonctionnellement les projets et aligner les parties prenantes",
            "Rédaction de spécifications fonctionnelles, règles de gestion et supports métiers",
            "Rédaction de user stories et contribution à l'alimentation du backlog",
            "Accompagnement des équipes techniques dans la compréhension des besoins fonctionnels",
            "Participation aux comités de suivi projet et aux cérémonies agiles",
            "Piloter la qualité des données et fiabiliser les indicateurs de reporting BI",
            "Collaborer avec les équipes data pour modéliser les données et optimiser les flux décisionnels",
            "Identifier les axes d’amélioration et proposer des solutions orientées performance et valeur métier",
            "Contribution à la stratégie de recette fonctionnelle et validation des livrables",
          ],
        },
        {
          company: "Optimum Mobility",
          role: "Data Analyst (Stage)",
          location: "Paris, France",
          period: "Juil 2024 — Sep 2024",
          description: "Avec une bonne expérience en (Finance, Assurance, Mobilité), je ne me contente pas de créer de beaux tableaux de bord. Je conçois des écosystèmes analytiques complets orientés ROI.",
          highlights: [
            "Analyse des besoins fonctionnels et analytiques des équipes métiers",
            "Rédaction des exigences fonctionnelles pour les solutions data",
            "Définition et validation des indicateurs de performance",
            "Contribution aux campagnes de tests fonctionnels et à la recette",
            "Mise en place des scripts d'automatisation pour les taches repetitif (Zapier)",
            "Développement de scripts Python (Pandas, NumPy) pour le traitement de datasets",
            "Études statistiques et analyses comportementales sur données clients",
            "Amélioration des délais de livraison des données (-30%)",
          ],
        },
        {
          company: "Veo Worldwide Services",
          role: "Ingénieur Support Applicatif Data & Assistant Product Owner",
          location: "Bucarest, Roumanie",
          period: "Sep 2021 — Déc 2023",
          description: "Une donnée brute ne prend de la valeur que lorsqu'elle se transforme en décision stratégique. C'est dans ce premier rôle que j'ai forgé cette conviction, en optimisant des processus SQL critiques et en coordonnant des sprints Scrum à fort impact.",
          highlights: [
            "Support fonctionnel auprès des utilisateurs métiers",
            "Analyse des incidents et besoins d'évolution fonctionnelle",
            "Participation à l'amélioration continue des solutions existantes",
            "Collaboration étroite avec les équipes techniques et data",
            "Gestion et optimisation de bases de données SQL (requêtes complexes, indexation)",
            "Support technique niveau L2/L3 et résolution et remonté d'incidents (Jira, GLPI)",
            "Rédaction de documentation technique et amélioration des applications data",
          ],
        },
      ],
    },
    terminal: {
      label: "Terminal",
      title: "Explore mon profil",
      hint: "Interagis avec mon profil en ligne de commande",
      welcome:
        'Bienvenue dans le terminal d\'Anderson. Tapez "help" pour voir les commandes disponibles.',
      prompt: "anderson@portfolio",
      quickAccess: "Raccourcis",
      commands: {
        help: "Commandes disponibles : help, whoami, about, skills, experience, education, contact, clear",
        whoami: "anderson — Data Analyst & Consultant BI\nParis, France · Disponible immédiatement",
        about:
          "Nom        : Kouassi Anderson Ehoussou\nRôle       : Data Analyst & Consultant BI\nExpérience : 3,5 ans\nLocalité   : Paris, France\nStatut     : Disponible immédiatement\n\nSpécialiste Power BI/DAX · Pipelines ETL · Machine Learning\n-98% temps de reporting · 150k$ économies générées",
        skills:
          "DATA VIZ     → Power BI, Tableau, DAX, Power Query\nDATA ENG     → Python, Pandas, NumPy, Scikit-learn, SQL\nCLOUD        → Azure Data Factory, Azure Synapse, Docker\nGESTION      → Scrum, JIRA, Product Ownership",
        experience:
          "2024-2025  Malakoff Humanis     Data Analyst | Business Analyst\n2024       Optimum Mobility    Data Analyst\n2021-2023  Veo Worldwide       Ingénieur Support Data & APO",
        education:
          "2025       HETIC               Master 2 Data & IA\n2024       ESLSCA              MBA Data Science\n2022       Politehnica         Ingénieur Informatique",
        contact:
          "Email    → andersonkouassi2016@gmail.com\nTél      → +33 745 303 145\nLinkedIn → linkedin.com/in/kouassi-anderson-ehoussou\nGitHub   → github.com/Anderson-Archimede",
      },
      notFound: "Commande non reconnue. Tapez 'help' pour la liste des commandes.",
    },
    contact: {
      label: "Contact",
      title: "Travaillons ensemble",
      subtitle:
        "Vous avez un projet data ou une opportunité ? N'hésitez pas à me contacter.",
      email: "andersonkouassi2016@gmail.com",
      phone: "+33 745 303 145",
      phoneLabel: "Téléphone",
      copyEmail: "Copier l'e-mail",
      copied: "Copié !",
      linkedin: "https://www.linkedin.com/in/kouassi-anderson-ehoussou",
      github: "https://github.com/Anderson-Archimede",
      statsExp: "ans d'expérience",
      statsProjects: "projets livrés",
      statsSavings: "d'économies",
      statsSatisfaction: "satisfaction client",
      downloadCV: "Télécharger mon CV",
      available: "Disponible immédiatement",
      openTo: "CDI · Freelance · Missions data",
    },
    footer: {
      made: "Conçu avec",
      by: "par Anderson",
      rights: "Tous droits réservés.",
      scrollTop: "Retour en haut de page",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      terminal: "Terminal",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi there, I'm",
      name: "Anderson",
      fullName: "Kouassi Anderson Ehoussou",
      title: "Data Analyst & BI Consultant",
      subtitle:
        "I turn complex data into strategic recommendations for executive leadership.",
      since: "Data analyst since 2021",
      currently: "Currently, Data Analyst @ Malakoff Humanis",
      cta: "Learn more",
      contact: "Get in touch",
    },
    about: {
      label: "About",
      title: "My story",
      p1: "Raw data only gains value when it transforms into a strategic decision.",
      p2: "Today, many companies have enormous amounts of data but lack the clear visibility to drive their growth. My role as a Data Analyst and BI Consultant is precisely to build this bridge between the technical complexity of databases and the clear needs of executives.",
      p3: "With over 3 years of experience across Finance, Insurance, and Mobility, I don't just build beautiful dashboards. I design complete, ROI-driven analytical ecosystems.",
      metrics: [
        { value: "3.5+", label: "years experience" },
        { value: "3", label: "industries" },
        { value: "~$150K", label: "ROI generated" },
      ],
    },
    skills: {
      label: "Skills",
      title: "My expertise",
      groupTech: "Technical Expertise",
      groupFunc: "Functional Expertise",
      categories: {
        dataViz: {
          name: "Data Viz & BI",
          emoji: "📊",
          description:
            "Turning raw data into impactful Power BI dashboards with semantic modeling and DAX optimization for real-time strategic KPIs.",
          items: [
            "Power BI",
            "Tableau",
            "DAX",
            "Power Query",
            "Star Schema Modeling",
          ],
        },
        dataEng: {
          name: "Data Engineering",
          emoji: "⚙️",
          description:
            "Building robust ETL pipelines with Python, optimized SQL, and data flow orchestration via Azure Data Factory.",
          items: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "Advanced SQL",
            "SQL Server",
          ],
        },
        cloud: {
          name: "Cloud & DevOps",
          emoji: "☁️",
          description:
            "Deploying data solutions on Azure (Synapse, ADF), Docker containerization, and Git version control.",
          items: [
            "Azure Data Factory",
            "Azure Synapse",
            "Docker",
            "Git",
            "REST APIs",
          ],
        },
        management: {
          name: "Management & Methods",
          emoji: "🎯",
          description:
            "Agile/Scrum coordination, Product Ownership and data storytelling to align technical and business teams.",
          items: [
            "Scrum / Agile",
            "JIRA",
            "Product Ownership",
            "Data Storytelling",
          ],
        },
        businessAnalysis: {
          name: "Business Analysis & Functional",
          emoji: "🔍",
          description:
            "Requirements gathering and formalization, workshop facilitation, functional specifications writing, and acceptance testing coordination.",
          items: [
            "Requirements analysis",
            "Business workshop facilitation",
            "Functional specifications",
            "User stories writing",
            "Backlog management",
            "Project steering committees",
            "Test strategy & acceptance",
          ],
        },
        methodology: {
          name: "Methodologies & Project Management",
          emoji: "⚡",
          description:
            "Proficient in Agile and Waterfall methodologies to effectively coordinate business and technical teams.",
          items: [
            "Agile: Scrum & Kanban",
            "Waterfall / V-cycle",
            "Agile ceremonies",
            "Business / tech coordination",
          ],
        },
        tools: {
          name: "IS & Data & Tools",
          emoji: "🛠️",
          description:
            "Command of key data and IS tools to ensure alignment between functional needs and technical solutions.",
          items: [
            "Power BI",
            "SQL",
            "ETL & data integration",
            "Jira",
            "Confluence",
            "Git",
          ],
        },
      },
    },
    experience: {
      label: "Experience",
      title: "My journey",
      jobs: [
        {
          company: "Malakoff Humanis",
          role: "Business Analyst / BI Consultant",
          location: "Orléans, France",
          period: "Dec 2024 — Dec 2025",
          description: "Today, many companies have enormous amounts of data but lack the clear visibility to drive their growth. My role as a Data Analyst and BI Consultant is precisely to build this bridge between the technical complexity of databases and the clear needs of executives.",
          highlights: [
            "Business needs analysis across Insurance, HR and Sales divisions",
            "Facilitation of business workshops for functional project scoping",
            "Writing functional specifications, business rules and support materials",
            "Writing user stories and contributing to backlog refinement",
            "Supporting technical teams in understanding functional requirements",
            "Participating in project steering committees and agile ceremonies",
            "Contributing to functional acceptance strategy and deliverable validation",
          ],
        },
        {
          company: "Optimum Mobility",
          role: "Data Analyst",
          location: "Paris, France",
          period: "Jul 2024 — Sep 2024",
          description: "With over 3 years of experience across Finance, Insurance, and Mobility, I don't just build beautiful dashboards. I design complete, ROI-driven analytical ecosystems.",
          highlights: [
            "Functional and analytical requirements gathering from business teams",
            "Writing functional requirements for data solutions",
            "Definition and validation of performance indicators",
            "Contribution to functional test campaigns and acceptance testing",
            "Improved data delivery timelines by 30%",
          ],
        },
        {
          company: "Veo Worldwide Services",
          role: "Data Support Engineer & Assistant Product Owner",
          location: "Bucharest, Romania",
          period: "Sep 2021 — Dec 2023",
          description: "Raw data only gains value when it transforms into a strategic decision. It was in this first role that I built this conviction — optimizing critical SQL processes and coordinating high-impact Scrum sprints.",
          highlights: [
            "Functional support for business users",
            "Incident analysis and functional improvement requirements",
            "Participation in continuous improvement of existing solutions",
            "Close collaboration with technical and data teams",
          ],
        },
      ],
    },
    terminal: {
      label: "Terminal",
      title: "Explore my profile",
      hint: "Interact with my profile via command line",
      welcome:
        'Welcome to Anderson\'s terminal. Type "help" to see available commands.',
      prompt: "anderson@portfolio",
      quickAccess: "Quick access",
      commands: {
        help: "Available commands: help, whoami, about, skills, experience, education, contact, clear",
        whoami: "anderson — Data Analyst & BI Consultant\nParis, France · Available immediately",
        about:
          "Name       : Kouassi Anderson Ehoussou\nRole       : Data Analyst & BI Consultant\nExperience : 3.5 years\nLocation   : Paris, France\nStatus     : Available immediately\n\nSpecialist Power BI/DAX · ETL Pipelines · Machine Learning\n-98% reporting time · $150K savings generated",
        skills:
          "DATA VIZ     → Power BI, Tableau, DAX, Power Query\nDATA ENG     → Python, Pandas, NumPy, Scikit-learn, SQL\nCLOUD        → Azure Data Factory, Azure Synapse, Docker\nMANAGEMENT   → Scrum, JIRA, Product Ownership",
        experience:
          "2024-2025  Malakoff Humanis     Data Analyst | Business Analyst\n2024       Optimum Mobility    Data Analyst\n2021-2023  Veo Worldwide       Data Support Engineer & APO",
        education:
          "2025       HETIC               Master's Data & AI\n2024       ESLSCA              MBA Data Science\n2022       Politehnica         Computer Engineering",
        contact:
          "Email    → andersonkouassi2016@gmail.com\nPhone    → +33 745 303 145\nLinkedIn → linkedin.com/in/kouassi-anderson-ehoussou\nGitHub   → github.com/Anderson-Archimede",
      },
      notFound: "Command not found. Type 'help' for the list of commands.",
    },
    contact: {
      label: "Contact",
      title: "Let's work together",
      subtitle:
        "Have a data project or opportunity? Don't hesitate to reach out.",
      email: "andersonkouassi2016@gmail.com",
      phone: "+33 745 303 145",
      phoneLabel: "Phone",
      copyEmail: "Copy email",
      copied: "Copied!",
      linkedin: "https://www.linkedin.com/in/kouassi-anderson-ehoussou",
      github: "https://github.com/Anderson-Archimede",
      statsExp: "years experience",
      statsProjects: "projects shipped",
      statsSavings: "in savings",
      statsSatisfaction: "client satisfaction",
      downloadCV: "Download my CV",
      available: "Available immediately",
      openTo: "Permanent · Freelance · Data missions",
    },
    footer: {
      made: "Built with",
      by: "by Anderson",
      rights: "All rights reserved.",
      scrollTop: "Back to top",
    },
  },
} as const;
