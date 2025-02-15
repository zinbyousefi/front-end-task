import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/components/tests/setup.ts",
    css: true,
    include: ["src/components/tests/{test,spec}.{js,ts,jsx,tsx}"],
    reporters: ["verbose"],
  },
});
