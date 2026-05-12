module.exports = {
  "**/*.{ts,tsx,js,jsx}": ["biome check --write --unsafe", "node scripts/check-density.mjs"],

  "**/*.{png,jpeg,jpg,webp,svg}": ["node scripts/check-image-size.mjs"],

  "**/*.{json,css}": ["biome format --write --files-ignore-unknown=true"],
};
