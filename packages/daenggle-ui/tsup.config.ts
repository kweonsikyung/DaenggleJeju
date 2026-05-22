import { defineConfig } from "tsup";
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { glob } from "node:fs/promises";

const entry = (await Array.fromAsync(glob("src/**/*.{ts,tsx}"))).filter(
  (f) => !f.includes(".stories."),
);

export default defineConfig({
  entry,
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
