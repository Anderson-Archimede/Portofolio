/**
 * i18n Validation Tests
 *
 * Pure data assertions — no DOM, no React.
 * Validates that the FR and EN translation objects are structurally complete,
 * consistent, and contain well-formed data values.
 */

import { describe, it, expect } from "vitest";
import { translations } from "@/lib/i18n";

const fr = translations.fr;
const en = translations.en;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Recursively walk an object and collect dot-notation paths to every
 * non-array-element leaf value.  Array fields are compared by length
 * separately; only their first element's shape is used for key parity.
 */
function leafPaths(obj: unknown, prefix = ""): Set<string> {
  const paths = new Set<string>();
  if (obj === null || obj === undefined || typeof obj !== "object") {
    paths.add(prefix);
    return paths;
  }
  if (Array.isArray(obj)) {
    // Record the array itself as a leaf path for length comparison.
    paths.add(prefix + "[]");
    // Recurse into index 0 to capture the element schema shape.
    if (obj.length > 0) {
      for (const p of leafPaths(obj[0], prefix + "[0].")) {
        paths.add(p);
      }
    }
    return paths;
  }
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    for (const p of leafPaths(value, next)) {
      paths.add(p);
    }
  }
  return paths;
}

/** All non-empty string leaf values in an object (recursively). */
function collectStrings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(collectStrings);
  if (obj && typeof obj === "object") {
    return Object.values(obj).flatMap(collectStrings);
  }
  return [];
}

// ── Structural parity ─────────────────────────────────────────────────────────

describe("FR / EN structural parity", () => {
  it("both locales have the same top-level keys", () => {
    expect(Object.keys(fr)).toEqual(Object.keys(en));
  });

  it("leaf path sets are identical across both locales", () => {
    const frPaths = leafPaths(fr);
    const enPaths = leafPaths(en);

    const onlyInFr = [...frPaths].filter((p) => !enPaths.has(p));
    const onlyInEn = [...enPaths].filter((p) => !frPaths.has(p));

    expect(onlyInFr).toEqual([]);
    expect(onlyInEn).toEqual([]);
  });
});

// ── Array length parity ───────────────────────────────────────────────────────

describe("array length parity", () => {
  it("about.metrics — same count", () => {
    expect(fr.about.metrics.length).toBe(en.about.metrics.length);
    expect(fr.about.metrics.length).toBeGreaterThan(0);
  });

  it("experience.jobs — same count", () => {
    expect(fr.experience.jobs.length).toBe(en.experience.jobs.length);
    expect(fr.experience.jobs.length).toBeGreaterThan(0);
  });

  it("projects.list — same count", () => {
    expect(fr.projects.list.length).toBe(en.projects.list.length);
    expect(fr.projects.list.length).toBeGreaterThan(0);
  });

  it("skills.certifications — same count", () => {
    expect(fr.skills.certifications.length).toBe(en.skills.certifications.length);
    expect(fr.skills.certifications.length).toBeGreaterThan(0);
  });

  it("skills.languages — same count", () => {
    expect(fr.skills.languages.length).toBe(en.skills.languages.length);
    expect(fr.skills.languages.length).toBeGreaterThan(0);
  });

  it("terminal.education — same count", () => {
    expect(fr.terminal.education.length).toBe(en.terminal.education.length);
    expect(fr.terminal.education.length).toBeGreaterThan(0);
  });

  it("skills categories — same keys in both locales", () => {
    const frCatKeys = Object.keys(fr.skills.categories);
    const enCatKeys = Object.keys(en.skills.categories);
    expect(frCatKeys).toEqual(enCatKeys);
  });

  it("each skill category has same item count across locales", () => {
    const frCats = fr.skills.categories as Record<string, { items: readonly string[] }>;
    const enCats = en.skills.categories as Record<string, { items: readonly string[] }>;
    for (const key of Object.keys(frCats)) {
      expect(frCats[key].items.length).toBe(enCats[key].items.length);
    }
  });
});

// ── No empty strings ──────────────────────────────────────────────────────────

describe("no empty translation strings", () => {
  it("no empty string values in FR locale", () => {
    const strings = collectStrings(fr);
    const empties = strings.filter((s) => s.trim() === "");
    expect(empties).toEqual([]);
  });

  it("no empty string values in EN locale", () => {
    const strings = collectStrings(en);
    const empties = strings.filter((s) => s.trim() === "");
    expect(empties).toEqual([]);
  });
});

// ── Experience jobs ───────────────────────────────────────────────────────────

describe("experience.jobs data integrity", () => {
  const allJobs = [...fr.experience.jobs, ...en.experience.jobs];

  it.each(allJobs)("$company has required fields", (job) => {
    expect(job.company).toBeTruthy();
    expect(job.role).toBeTruthy();
    expect(job.location).toBeTruthy();
    expect(job.period).toBeTruthy();
    expect(Array.isArray(job.highlights)).toBe(true);
    expect(job.highlights.length).toBeGreaterThan(0);
    expect(Array.isArray(job.competences)).toBe(true);
    expect((job.competences as string[]).length).toBeGreaterThan(0);
  });

  it("FR and EN jobs have matching companies", () => {
    fr.experience.jobs.forEach((frJob, i) => {
      expect(frJob.company).toBe(en.experience.jobs[i].company);
    });
  });

  it("FR and EN jobs have the same number of highlights per role", () => {
    fr.experience.jobs.forEach((frJob, i) => {
      expect(frJob.highlights.length).toBe(en.experience.jobs[i].highlights.length);
    });
  });
});

// ── Projects ──────────────────────────────────────────────────────────────────

describe("projects.list data integrity", () => {
  const allProjects = [...fr.projects.list, ...en.projects.list];

  it.each(allProjects)("$title has required fields", (project) => {
    expect(project.title).toBeTruthy();
    expect(project.year).toMatch(/^\d{4}$/);
    expect(project.description).toBeTruthy();
    expect(Array.isArray(project.stack)).toBe(true);
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.highlight).toBeTruthy();
  });

  it("FR and EN projects have the same stack length per project", () => {
    // Stack item names may differ by locale (e.g. "API REST" vs "REST API").
    // What must match is the count — every project should reference the same
    // number of technologies in both languages.
    fr.projects.list.forEach((frProj, i) => {
      expect(frProj.stack.length).toBe(en.projects.list[i].stack.length);
    });
  });

  it("FR and EN projects have matching years", () => {
    fr.projects.list.forEach((frProj, i) => {
      expect(frProj.year).toBe(en.projects.list[i].year);
    });
  });
});

// ── Certifications ────────────────────────────────────────────────────────────

describe("skills.certifications data integrity", () => {
  it("each certification has name, org, status, and a hex color", () => {
    [...fr.skills.certifications, ...en.skills.certifications].forEach((cert) => {
      expect(cert.name).toBeTruthy();
      expect(cert.org).toBeTruthy();
      expect(cert.status).toBeTruthy();
      expect(cert.color).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    });
  });

  it("FR and EN certifications are ordered by the same org sequence", () => {
    // Cert names may be translated (e.g. word-order differs in French).
    // What must be stable is the issuing org — the order represents the same
    // credential set in both locales.
    fr.skills.certifications.forEach((frCert, i) => {
      expect(frCert.org).toBe(en.skills.certifications[i].org);
    });
  });

  it("FR and EN certifications have matching colors", () => {
    fr.skills.certifications.forEach((frCert, i) => {
      expect(frCert.color).toBe(en.skills.certifications[i].color);
    });
  });
});

// ── Contact — URL and email validation ───────────────────────────────────────

describe("contact data integrity", () => {
  it("email is the same in both locales", () => {
    expect(fr.contact.email).toBe(en.contact.email);
  });

  it("email matches a basic address pattern", () => {
    expect(fr.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("phone number is the same in both locales", () => {
    expect(fr.contact.phone).toBe(en.contact.phone);
  });

  it("linkedin URL starts with https://", () => {
    expect(fr.contact.linkedin).toMatch(/^https:\/\//);
  });

  it("linkedin URL is the same in both locales", () => {
    expect(fr.contact.linkedin).toBe(en.contact.linkedin);
  });

  it("github URL starts with https://", () => {
    expect(fr.contact.github).toMatch(/^https:\/\//);
  });

  it("github URL is the same in both locales", () => {
    expect(fr.contact.github).toBe(en.contact.github);
  });
});

// ── About metrics ─────────────────────────────────────────────────────────────

describe("about.metrics data integrity", () => {
  it("each metric has a non-empty value and label", () => {
    [...fr.about.metrics, ...en.about.metrics].forEach((m) => {
      expect(m.value).toBeTruthy();
      expect(m.label).toBeTruthy();
    });
  });

  it("FR and EN metrics are non-empty (values may use locale-specific currency)", () => {
    // "~150K€" (FR) and "~$150K" (EN) are intentionally different.
    // We only assert that every metric has a non-empty value in both locales.
    fr.about.metrics.forEach((m) => expect(m.value).toBeTruthy());
    en.about.metrics.forEach((m) => expect(m.value).toBeTruthy());
  });
});

// ── Nav links ─────────────────────────────────────────────────────────────────

describe("nav labels completeness", () => {
  const navKeys = ["about", "skills", "experience", "projects", "terminal", "contact"] as const;

  it.each(navKeys)("nav.%s is non-empty in both locales", (key) => {
    expect(fr.nav[key]).toBeTruthy();
    expect(en.nav[key]).toBeTruthy();
  });
});

// ── Terminal education ────────────────────────────────────────────────────────

describe("terminal.education data integrity", () => {
  it("each education entry has year, school, and degree", () => {
    [...fr.terminal.education, ...en.terminal.education].forEach((edu) => {
      expect(edu.year).toMatch(/^\d{4}$/);
      expect(edu.school).toBeTruthy();
      expect(edu.degree).toBeTruthy();
    });
  });
});
