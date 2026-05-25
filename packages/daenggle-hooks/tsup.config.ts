import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  bundle: true,
  splitting: true,
  external: ["react", "react-dom"],
  tsconfig: "tsconfig.json",
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
