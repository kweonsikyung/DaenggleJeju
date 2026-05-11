module.exports = {
  "**/*.{ts,tsx,js,jsx}": ["biome check --write --unsafe"],
  "**/*.{json,css}": ["biome format --write --files-ignore-unknown=true"],
};
