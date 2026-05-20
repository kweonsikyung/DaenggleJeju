/**
 * 이미지 최적화 스크립트
 * =======================
 * public/assets 내 PNG/JPG 이미지를 sharp로 압축합니다.
 * 원본 파일을 덮어쓰며, 압축 전후 크기를 리포트합니다.
 *
 * 사용법:
 *   node scripts/optimize-images.mjs              # 전체 실행
 *   node scripts/optimize-images.mjs --dry-run    # 실제 변경 없이 예상 결과만 확인
 */

import fs from "fs";
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const TARGET_DIR = "apps/web/public";
const DRY_RUN = process.argv.includes("--dry-run");
const MIN_SIZE_KB = 100; // 100KB 이하는 건너뜀

const PNG_OPTIONS = { compressionLevel: 9, effort: 10 };
const JPEG_OPTIONS = { quality: 85, mozjpeg: true };

if (DRY_RUN) {
  console.log("[optimize-images] DRY RUN — 파일을 실제로 변경하지 않습니다.\n");
}

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  const beforeKB = stats.size / 1024;

  if (beforeKB < MIN_SIZE_KB) return null;

  const ext = path.extname(filePath).slice(1).toLowerCase();
  const instance = sharp(filePath);

  let buffer;
  if (ext === "png") {
    buffer = await instance.png(PNG_OPTIONS).toBuffer();
  } else if (ext === "jpg" || ext === "jpeg") {
    buffer = await instance.jpeg(JPEG_OPTIONS).toBuffer();
  } else {
    return null;
  }

  const afterKB = buffer.length / 1024;
  const savedKB = beforeKB - afterKB;
  const savedPct = ((savedKB / beforeKB) * 100).toFixed(1);

  if (!DRY_RUN && savedKB > 0) {
    fs.writeFileSync(filePath, buffer);
  }

  return { filePath, beforeKB, afterKB, savedKB, savedPct };
}

async function run() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
        files.push(full);
      }
    }
  }
  walk(TARGET_DIR);

  const results = await Promise.all(files.map(optimizeImage));
  const valid = results.filter(Boolean).sort((a, b) => b.savedKB - a.savedKB);

  if (!valid.length) {
    console.log("최적화할 이미지가 없습니다.");
    return;
  }

  const totalBefore = valid.reduce((s, r) => s + r.beforeKB, 0);
  const totalAfter = valid.reduce((s, r) => s + r.afterKB, 0);
  const totalSaved = totalBefore - totalAfter;

  console.log("파일명".padEnd(60) + "전".padStart(10) + "후".padStart(10) + "절감".padStart(10));
  console.log("─".repeat(90));
  for (const r of valid) {
    const name = r.filePath.replace(`${TARGET_DIR}/`, "");
    const saved = r.savedKB > 0 ? `-${r.savedKB.toFixed(0)}KB (${r.savedPct}%)` : "변화 없음";
    console.log(
      name.padEnd(60) +
        `${r.beforeKB.toFixed(0)}KB`.padStart(10) +
        `${r.afterKB.toFixed(0)}KB`.padStart(10) +
        saved.padStart(10)
    );
  }

  console.log("─".repeat(90));
  console.log(
    `총 ${valid.length}개 파일 — ${(totalBefore / 1024).toFixed(1)}MB → ${(totalAfter / 1024).toFixed(1)}MB (${(totalSaved / 1024).toFixed(1)}MB 절감)`
  );

  if (DRY_RUN) {
    console.log("\n실제 적용하려면 --dry-run 없이 실행하세요.");
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
