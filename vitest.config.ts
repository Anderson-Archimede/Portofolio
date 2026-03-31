import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    // Exclude Next.js build artifacts and worktrees
    exclude: ["node_modules/**", ".next/**", ".claude/**", "out/**"],
  },
  resolve: {
    alias: {
      // App path alias
      "@": path.resolve(__dirname, "./src"),
      // Replace next/image with a lightweight img passthrough for tests
      "next/image": path.resolve(__dirname, "./src/__tests__/__mocks__/NextImage.tsx"),
      // Replace framer-motion with a no-op passthrough (no animations in jsdom)
      "framer-motion": path.resolve(__dirname, "./src/__tests__/__mocks__/framer-motion.ts"),
    },
  },
});
