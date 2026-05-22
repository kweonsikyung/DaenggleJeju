/**
 * daenggle-ui 컴포넌트별 번들 사이즈 분석
 *
 * 실행: node scripts/analyze-ui.mjs [--top N]
 *
 * - dist/의 ESM(.mjs) 파일을 gzip 압축 후 크기 순으로 정렬하여 출력합니다.
 * - chunk 파일은 별도로 묶어서 표시합니다.
 * - --top N : 상위 N개만 출력 (기본 20)
 */

import fs from "fs";
import path from "path";
import zlib from "zlib";

const UI_DIST = "packages/daenggle-ui/dist";
const args = process.argv.slice(2);
const topN = (() => {
  const idx = args.indexOf("--top");
  return idx !== -1 ? Number(args[idx + 1]) || 20 : 20;
})();

if (!fs.existsSync(UI_DIST)) {
  console.error(`dist 폴더가 없습니다. 먼저 pnpm build:ui 를 실행하세요.`);
  process.exit(1);
}

const components = [];
const chunks = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (name.endsWith(".mjs")) {
      const buf = fs.readFileSync(full);
      const gzipBytes = zlib.gzipSync(buf).length;
      const rel = path.relative(UI_DIST, full);
      const entry = { path: rel, raw: buf.length, gzip: gzipBytes };
      if (name.startsWith("chunk-")) chunks.push(entry);
      else components.push(entry);
    }
  }
}

walk(UI_DIST);

const totalGzip = [...components, ...chunks].reduce((s, e) => s + e.gzip, 0);

function formatBytes(b) {
  return b < 1024 ? `${b}B` : `${(b / 1024).toFixed(2)}KB`;
}

function printTable(label, items) {
  const sorted = [...items].sort((a, b) => b.gzip - a.gzip).slice(0, topN);
  console.log(`\n── ${label} (gzip 기준, 상위 ${topN}개) ──────────────────────`);
  console.log(`${"파일".padEnd(55)} ${"raw".padStart(8)} ${"gzip".padStart(8)}`);
  console.log("─".repeat(75));
  for (const e of sorted) {
    console.log(
      `${e.path.padEnd(55)} ${formatBytes(e.raw).padStart(8)} ${formatBytes(e.gzip).padStart(8)}`
    );
  }
}

printTable("컴포넌트 (.mjs)", components);
printTable("공유 청크 (chunk-*.mjs)", chunks);

console.log(`\n${"─".repeat(75)}`);
console.log(`전체 ESM gzip 합계: ${formatBytes(totalGzip)}`);
console.log(`(peer deps 제외: react, react-dom, next, vanilla-extract, vaul 등)`);
