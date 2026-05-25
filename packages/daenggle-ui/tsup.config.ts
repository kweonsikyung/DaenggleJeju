import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
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
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  banner: {
    js: '"use client";',
  },
});
