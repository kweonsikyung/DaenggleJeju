import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = resolve(__dirname, "../messages");

function loadJson(locale) {
  return JSON.parse(readFileSync(resolve(messagesDir, `${locale}.json`), "utf-8"));
}

function getLeafKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      keys.push(...getLeafKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const base = loadJson("ko");
const baseKeys = new Set(getLeafKeys(base));

const locales = ["en", "ja"];
let hasError = false;

for (const locale of locales) {
  const target = loadJson(locale);
  const targetKeys = new Set(getLeafKeys(target));

  const missing = [...baseKeys].filter((k) => !targetKeys.has(k));
  const extra = [...targetKeys].filter((k) => !baseKeys.has(k));

  if (missing.length > 0) {
    console.error(`\n[${locale}] 누락된 키 (${missing.length}개):`);
    for (const k of missing) console.error(`  - ${k}`);
    hasError = true;
  }

  if (extra.length > 0) {
    console.error(`\n[${locale}] ko에 없는 잉여 키 (${extra.length}개):`);
    for (const k of extra) console.error(`  + ${k}`);
    hasError = true;
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log(`[${locale}] ✓ ko와 키 일치`);
  }
}

if (hasError) {
  console.error("\n번역 키를 동기화한 뒤 다시 커밋하세요.");
  process.exit(1);
}
