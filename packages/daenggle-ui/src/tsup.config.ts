import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/ui/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "next", "@vanilla-extract/css"],
});
