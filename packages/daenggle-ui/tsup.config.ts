import path from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "next",
    "@vanilla-extract/css",
    "@vanilla-extract/recipes",
    "embla-carousel-react",
    "vaul",
  ],
  tsconfig: "tsconfig.json",
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(__dirname, "src"),
    };
  },
});
