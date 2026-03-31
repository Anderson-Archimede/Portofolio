/**
 * Framer-motion mock for Vitest / jsdom.
 *
 * Goals:
 *  - motion.* elements render as plain HTML equivalents (no animations).
 *  - Animation props (initial, animate, whileInView, …) are stripped before
 *    reaching the DOM so React does not warn about unknown attributes.
 *  - Motion values (useTransform, useSpring, …) return a stable stub that
 *    satisfies shape checks but never actually interpolates.
 *  - Style values that contain motion-value objects (non-primitive) are
 *    stripped to avoid React style serialisation warnings.
 */

import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type AnyProps = {
  children?: React.ReactNode;
  style?: Record<string, unknown>;
  [key: string]: unknown;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Animation-only props that must never reach a real DOM element. */
const MOTION_PROP_KEYS = new Set([
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "whileDrag",
  "transition",
  "viewport",
  "layoutId",
  "layout",
  "drag",
  "dragConstraints",
  "dragElastic",
  "variants",
  "onAnimationComplete",
  "onAnimationStart",
  "onDrag",
  "onDragEnd",
  "onDragStart",
]);

/** Strip animation-specific props so they don't reach the DOM. */
function stripMotionProps(props: AnyProps): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(props).filter(([k]) => !MOTION_PROP_KEYS.has(k))
  );
}

/**
 * Remove any style value that is not a plain CSS primitive (string / number).
 * This prevents React from trying to serialise MotionValue objects as CSS.
 */
function sanitizeStyle(
  style?: Record<string, unknown>
): React.CSSProperties | undefined {
  if (!style) return undefined;
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(style)) {
    if (v === null || v === undefined || typeof v === "string" || typeof v === "number") {
      clean[k] = v;
    }
  }
  return clean as React.CSSProperties;
}

/** Create a passthrough functional component for a given HTML tag. */
function createMotionComponent(tag: string) {
  function MockMotion({ children, style, ...props }: AnyProps) {
    const domProps = stripMotionProps(props);
    return React.createElement(
      tag as keyof React.JSX.IntrinsicElements,
      { ...domProps, style: sanitizeStyle(style) },
      children
    );
  }
  MockMotion.displayName = `motion.${tag}`;
  return MockMotion;
}

// ── Stub MotionValue ──────────────────────────────────────────────────────────

const mv = {
  get: () => 0,
  set: () => {},
  on: () => () => {},
  // Satisfy framer-motion internal duck-typing
  getVelocity: () => 0,
  isAnimating: () => false,
  stop: () => {},
  destroy: () => {},
};

// ── Public API ────────────────────────────────────────────────────────────────

export const motion = {
  div: createMotionComponent("div"),
  a: createMotionComponent("a"),
  p: createMotionComponent("p"),
  span: createMotionComponent("span"),
  button: createMotionComponent("button"),
  nav: createMotionComponent("nav"),
  section: createMotionComponent("section"),
  ul: createMotionComponent("ul"),
  li: createMotionComponent("li"),
  header: createMotionComponent("header"),
  footer: createMotionComponent("footer"),
};

export function AnimatePresence({
  children,
}: {
  children?: React.ReactNode;
}) {
  return React.createElement(React.Fragment, null, children);
}

// Scroll / spring / transform hooks — return stub motion value
export function useScroll() {
  return { scrollYProgress: mv };
}

export function useSpring(value: unknown) {
  return value !== undefined ? value : mv;
}

export function useTransform() {
  return mv;
}

export function useMotionValueEvent() {}

export function useReducedMotion() {
  return false;
}

export function useInView() {
  return true;
}
