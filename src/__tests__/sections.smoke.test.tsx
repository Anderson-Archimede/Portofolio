/**
 * Sections smoke tests
 *
 * Renders every section (and footer) inside a LanguageProvider and asserts:
 *  1. The component mounts without throwing.
 *  2. The section's anchor `id` is present in the DOM.
 *  3. At least one piece of the French label text is rendered.
 *
 * Heavy dependencies (framer-motion, next/image) are replaced by the
 * lightweight test mocks wired up in vitest.config.ts resolve.alias.
 */

import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { LanguageProvider } from "@/lib/LanguageContext";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Terminal from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

// Wrap every render inside the LanguageProvider
function withProvider(ui: React.ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
  });
}

// ── Hero ──────────────────────────────────────────────────────────────────────

describe("Hero section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Hero />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders the greeting text", () => {
    withProvider(<Hero />);
    expect(screen.getByText("Salut, je suis")).toBeInTheDocument();
  });

  it("renders the full name", () => {
    withProvider(<Hero />);
    expect(screen.getByText("Anderson Kouassi")).toBeInTheDocument();
  });

  it("renders the primary CTA link", () => {
    withProvider(<Hero />);
    expect(screen.getByRole("link", { name: /en savoir plus/i })).toBeInTheDocument();
  });

  it("renders the contact CTA link", () => {
    withProvider(<Hero />);
    expect(screen.getByRole("link", { name: /me contacter/i })).toBeInTheDocument();
  });

  it("profile image has correct alt text", () => {
    withProvider(<Hero />);
    expect(screen.getByAltText("Anderson Kouassi")).toBeInTheDocument();
  });
});

// ── About ─────────────────────────────────────────────────────────────────────

describe("About section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<About />);
    expect(container.querySelector("#about")).toBeTruthy();
  });

  it("section has id=about", () => {
    const { container } = withProvider(<About />);
    expect(container.querySelector("#about")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    withProvider(<About />);
    expect(screen.getByText("À propos")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    withProvider(<About />);
    expect(screen.getByText("Mon histoire")).toBeInTheDocument();
  });

  it("renders all 3 metric cards", () => {
    withProvider(<About />);
    // All three value strings appear in the DOM
    expect(screen.getByText("3.5+")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("~150K€")).toBeInTheDocument();
  });
});

// ── Experience ────────────────────────────────────────────────────────────────

describe("Experience section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Experience />);
    expect(container.querySelector("#experience")).toBeTruthy();
  });

  it("section has id=experience", () => {
    const { container } = withProvider(<Experience />);
    expect(container.querySelector("#experience")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    withProvider(<Experience />);
    expect(screen.getByText("Parcours")).toBeInTheDocument();
  });

  it("renders all 3 company names", () => {
    withProvider(<Experience />);
    expect(screen.getAllByText("Malakoff Humanis").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Optimum Mobility").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Veo Worldwide Services").length).toBeGreaterThan(0);
  });
});

// ── Skills ────────────────────────────────────────────────────────────────────

describe("Skills section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Skills />);
    expect(container.querySelector("#skills")).toBeTruthy();
  });

  it("section has id=skills", () => {
    const { container } = withProvider(<Skills />);
    expect(container.querySelector("#skills")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    withProvider(<Skills />);
    expect(screen.getByText("Compétences")).toBeInTheDocument();
  });

  it("renders all 4 category card headings", () => {
    withProvider(<Skills />);
    expect(screen.getByText("Analytics & Data Engineering")).toBeInTheDocument();
    expect(screen.getByText("Bases de données & Cloud")).toBeInTheDocument();
    expect(screen.getByText("Data Viz & BI")).toBeInTheDocument();
    expect(screen.getByText("DevOps, Outils & Gestion")).toBeInTheDocument();
  });

  it("renders certification cards", () => {
    withProvider(<Skills />);
    expect(screen.getByText("Microsoft PL-300")).toBeInTheDocument();
    expect(screen.getByText("Dataiku Advanced Designer")).toBeInTheDocument();
  });
});

// ── Projects ──────────────────────────────────────────────────────────────────

describe("Projects section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Projects />);
    expect(container.querySelector("#projects")).toBeTruthy();
  });

  it("section has id=projects", () => {
    const { container } = withProvider(<Projects />);
    expect(container.querySelector("#projects")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    withProvider(<Projects />);
    expect(screen.getByText("Projets")).toBeInTheDocument();
  });

  it("renders all 3 project cards", () => {
    withProvider(<Projects />);
    expect(
      screen.getByText("Modern Data Stack & Modélisation Analytique")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pipeline ETL Automatisé Conteneurisé")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Dashboard Power BI & Data Warehouse")
    ).toBeInTheDocument();
  });

  it("renders year badges", () => {
    withProvider(<Projects />);
    expect(screen.getAllByText("2025").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2024").length).toBeGreaterThan(0);
  });
});

// ── Terminal ──────────────────────────────────────────────────────────────────

describe("Terminal (profile snapshot) section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Terminal />);
    expect(container.querySelector("#terminal")).toBeTruthy();
  });

  it("section has id=terminal", () => {
    const { container } = withProvider(<Terminal />);
    expect(container.querySelector("#terminal")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    withProvider(<Terminal />);
    expect(screen.getByText("Profil")).toBeInTheDocument();
  });

  it("renders the identity card name", () => {
    withProvider(<Terminal />);
    expect(screen.getByText("Anderson Kouassi")).toBeInTheDocument();
  });

  it("avatar image has correct alt text", () => {
    withProvider(<Terminal />);
    expect(screen.getByAltText("Anderson Kouassi")).toBeInTheDocument();
  });

  it("renders education entries", () => {
    withProvider(<Terminal />);
    expect(screen.getByText("HETIC")).toBeInTheDocument();
    expect(screen.getByText("ESLSCA Business School")).toBeInTheDocument();
  });
});

// ── Contact ───────────────────────────────────────────────────────────────────

describe("Contact section", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Contact />);
    expect(container.querySelector("#contact")).toBeTruthy();
  });

  it("section has id=contact", () => {
    const { container } = withProvider(<Contact />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    withProvider(<Contact />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders the email address", () => {
    withProvider(<Contact />);
    expect(
      screen.getAllByText("andersonkouassi2016@gmail.com").length
    ).toBeGreaterThan(0);
  });

  it("renders the copy email button", () => {
    withProvider(<Contact />);
    expect(
      screen.getByRole("button", { name: /copier l'e-mail/i })
    ).toBeInTheDocument();
  });

  it("renders the CV download link", () => {
    withProvider(<Contact />);
    const cvLink = screen.getByRole("link", { name: /télécharger mon cv/i });
    expect(cvLink).toBeInTheDocument();
    expect(cvLink).toHaveAttribute("href", "/cv.pdf");
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────

describe("Footer", () => {
  it("renders without crashing", () => {
    const { container } = withProvider(<Footer />);
    expect(container.querySelector("footer")).toBeTruthy();
  });

  it("renders the scroll-to-top button", () => {
    withProvider(<Footer />);
    expect(
      screen.getByRole("button", { name: /retour en haut/i })
    ).toBeInTheDocument();
  });

  it("renders the copyright year", () => {
    withProvider(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
