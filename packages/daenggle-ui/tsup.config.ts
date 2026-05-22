import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.stories.{ts,tsx}"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: false,
  clean: true,
  bundle: true,
  splitting: true,
  external: [
    "react",
    "react-dom",
    "next",
    "@vanilla-extract/css",
    "@vanilla-extract/recipes",
    "embla-carousel-react",
    "vaul",
    "react-icons",
  ],
  tsconfig: "tsconfig.json",
  esbuildPlugins: [vanillaExtractPlugin()],
  banner: {
    js: '"use client";',
  },
});
