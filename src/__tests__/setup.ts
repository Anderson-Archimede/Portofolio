/**
 * Global test setup — runs before every test file.
 * - Imports @testing-library/jest-dom to extend Vitest's `expect`.
 * - Polyfills browser APIs that jsdom does not provide out of the box.
 */

import "@testing-library/jest-dom";
import { vi } from "vitest";

// ── IntersectionObserver ──────────────────────────────────────────────────────
// Used by Navbar (active-section detection) and ParticleCanvas.

class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);
  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// ── ResizeObserver ────────────────────────────────────────────────────────────
// Used internally by some framer-motion and browser layout calculations.

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

// ── matchMedia ────────────────────────────────────────────────────────────────
// Used by ParticleCanvas to detect hover capability.

Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ── HTMLCanvasElement.getContext ──────────────────────────────────────────────
// ParticleCanvas calls getContext("2d"). It already handles `null` gracefully,
// so returning null here is intentional and correct.

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  writable: true,
  configurable: true,
  value: vi.fn(() => null),
});

// ── window.scrollTo ───────────────────────────────────────────────────────────
// Used by the Footer "back to top" button.

Object.defineProperty(globalThis, "scrollTo", {
  writable: true,
  configurable: true,
  value: vi.fn(),
});

// ── navigator.clipboard ───────────────────────────────────────────────────────
// jsdom 26 ships a real Clipboard object on navigator with non-configurable
// instance methods. Individual tests that need to spy on clipboard operations
// use vi.spyOn(Clipboard.prototype, "writeText") directly (see contact tests).

// ── document.execCommand ──────────────────────────────────────────────────────
// Removed from jsdom 26 but used as a clipboard fallback in the Contact
// component. Stub it globally so tests can spy on it.

Object.defineProperty(document, "execCommand", {
  writable: true,
  configurable: true,
  value: vi.fn().mockReturnValue(true),
});
