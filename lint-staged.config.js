module.exports = {
  // daenggle-ui 검사
  "packages/daenggle-ui/src/**/*.{ts,tsx}": [
    "biome check --write --unsafe --no-errors-on-unmatched",
    "node scripts/check-atomic-deps.mjs",
    "node scripts/check-circular.mjs",
  ],
  // web 앱 검사
  "apps/web/src/**/*.{ts,tsx}": [
    "biome check --write --unsafe --no-errors-on-unmatched",
    "node scripts/check-atomic-deps.mjs",
    "node scripts/check-circular.mjs",
  ],

  "apps/web/public/**/*.{png,jpeg,jpg,webp,svg}": ["node scripts/check-image-size.mjs"],
};
