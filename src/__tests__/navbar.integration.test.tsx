/**
 * Navbar integration tests
 *
 * Tests real user interactions:
 *  - Mobile menu opens when the hamburger button is clicked.
 *  - Mobile menu closes when a nav link inside the drawer is clicked.
 *  - Mobile menu closes when the Escape key is pressed.
 *  - Language toggle switches all rendered text to the other locale.
 *  - aria-expanded attribute on the hamburger tracks open/closed state.
 */

import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "@/components/layout/Navbar";

function renderNavbar() {
  return render(<Navbar />, {
    wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
  });
}

// ── Hamburger / mobile menu ───────────────────────────────────────────────────

describe("Navbar — mobile menu", () => {
  it("hamburger button is present in the DOM", () => {
    renderNavbar();
    expect(
      screen.getByRole("button", { name: /ouvrir le menu/i })
    ).toBeInTheDocument();
  });

  it("hamburger has aria-expanded=false initially", () => {
    renderNavbar();
    const hamburger = screen.getByRole("button", { name: /ouvrir le menu/i });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking the hamburger opens the mobile menu", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const hamburger = screen.getByRole("button", { name: /ouvrir le menu/i });
    await user.click(hamburger);

    // The inner mobile menu nav element becomes visible
    expect(
      screen.getByRole("navigation", { name: /menu principal/i })
    ).toBeInTheDocument();
  });

  it("hamburger aria-expanded becomes true when menu is open", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const hamburger = screen.getByRole("button", { name: /ouvrir le menu/i });
    await user.click(hamburger);

    // After clicking, the same button now says "Fermer le menu"
    const closeBtn = screen.getByRole("button", { name: /fermer le menu/i });
    expect(closeBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking a nav link inside the drawer closes the menu", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));

    // Find nav links inside the mobile menu
    const mobileMenu = screen.getByRole("navigation", { name: /menu principal/i });
    const aboutLink = within(mobileMenu).getByText("À propos");
    await user.click(aboutLink);

    expect(
      screen.queryByRole("navigation", { name: /menu principal/i })
    ).not.toBeInTheDocument();
  });

  it("pressing Escape closes the open mobile menu", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: /ouvrir le menu/i }));
    expect(
      screen.getByRole("navigation", { name: /menu principal/i })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: /menu principal/i })
    ).not.toBeInTheDocument();
  });
});

// ── Language toggle ───────────────────────────────────────────────────────────

describe("Navbar — language toggle", () => {
  it("renders FR nav labels by default", () => {
    renderNavbar();
    // "À propos" is the French label for the About section
    expect(screen.getAllByText("À propos").length).toBeGreaterThan(0);
  });

  it("clicking EN switches nav labels to English", async () => {
    const user = userEvent.setup();
    renderNavbar();

    // Multiple EN buttons may exist (desktop + mobile header toggles).
    // Click the first one found.
    const enButtons = screen.getAllByRole("button", { name: /english version/i });
    await user.click(enButtons[0]);

    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    // French label should no longer appear
    expect(screen.queryByText("À propos")).not.toBeInTheDocument();
  });

  it("switching back to FR restores French labels", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const enButtons = screen.getAllByRole("button", { name: /english version/i });
    await user.click(enButtons[0]);

    const frButtons = screen.getAllByRole("button", { name: /version française/i });
    await user.click(frButtons[0]);

    expect(screen.getAllByText("À propos").length).toBeGreaterThan(0);
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });
});

// ── Scroll progress bar ───────────────────────────────────────────────────────

describe("Navbar — scroll progress bar", () => {
  it("renders the scroll progress bar element", () => {
    const { container } = renderNavbar();
    // The progress bar is inside the nav, positioned absolutely at the top.
    // It has aria-hidden="true" and a gradient background style.
    const progressBar = container.querySelector('[aria-hidden="true"]');
    expect(progressBar).toBeTruthy();
  });
});

// ── Brand link ────────────────────────────────────────────────────────────────

describe("Navbar — brand", () => {
  it("brand link 'AK.' is rendered", () => {
    renderNavbar();
    expect(screen.getAllByText("AK.").length).toBeGreaterThan(0);
  });

  it("brand link points to page root (#)", () => {
    renderNavbar();
    const brandLinks = screen.getAllByRole("link", { name: /anderson kouassi/i });
    brandLinks.forEach((link) => expect(link).toHaveAttribute("href", "#"));
  });
});
