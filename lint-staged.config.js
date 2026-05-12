module.exports = {
  // daenggle-ui 검사
  "packages/daenggle-ui/src/**/*.{ts,tsx}": [
    "biome check --write --unsafe",
    "node scripts/check-density.mjs",
    "node scripts/check-atomic-deps.mjs"
  ],
  // web 앱 검사
  "apps/web/src/**/*.{ts,tsx}": [
    "biome check --write --unsafe",
    "node scripts/check-density.mjs",
    "node scripts/check-atomic-deps.mjs"
  ],

  "**/src/**/*.{png,jpeg,jpg,webp,svg}": [
    "node scripts/check-image-size.mjs"
  ],
};