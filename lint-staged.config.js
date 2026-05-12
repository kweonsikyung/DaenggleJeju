module.exports = {
  "**/*.{ts,tsx,js,jsx}": ["biome check --write --unsafe", "node scripts/check-density.mjs"],
  "**/*.{json,css}": ["biome format --write --files-ignore-unknown=true"],
};
