/**
 * 이미지 크기 체크 스크립트
 * ============================
 * - 1. 목적: 고용량 리소스 유입 방지
 * - 500KB가 넘는 이미지는 초기 로딩(LCP) 지표를 빨간색으로 만듭니다.
 * - 압축되지 않은 이미지가 올라오는 것을 방지하기 위한 최소한의 가드입니다.
 *
 * - 2. 정책: 한도 초과 시 오류
 * - SVG: 100KB (벡터 텍스트 파일, 이 이상이면 불필요한 데이터 포함 가능성이 높음)
 * - PNG/JPG/WebP: 1MB (해상도가 중요한 프로젝트 특성상 넉넉하게 설정)
 * - 한도의 70% 이상이면 경고 (커밋은 통과, 최적화 권장)
 * - 1MB 초과 시, 해상도를 낮추기보다 TinyPNG 등을 통한 '포맷 최적화'를 우선 권장합니다.
 * - 정말 부득이하게 한도를 넘어야 한다면, git commit --no-verify 옵션으로 우회할 수 있습니다.
 *
 * - 3. 실행 시점: Git Pre-commit Hook
 * - Husky와 lint-staged를 통해 커밋 직전에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 검사하여 최종 커밋본의 품질을 보장합니다.
 */

import fs from "fs";
import path from "path";

const LIMITS_KB = {
  svg: 100,
  default: 1000,
};
const WARN_THRESHOLD = 0.7;

const files = process.argv.slice(2);
const errors = [];
const warnings = [];

files.forEach((file) => {
  if (!fs.existsSync(file)) return;

  const ext = path.extname(file).slice(1).toLowerCase();
  const limitKB = LIMITS_KB[ext] ?? LIMITS_KB.default;
  const limitBytes = limitKB * 1024;

  const { size } = fs.statSync(file);
  const sizeKB = (size / 1024).toFixed(1);

  if (size > limitBytes) {
    errors.push(`  ✖ ${file} (${sizeKB}KB > 한도 ${limitKB}KB)`);
  } else if (size > limitBytes * WARN_THRESHOLD) {
    warnings.push(`  ⚠ ${file} (${sizeKB}KB — 한도 ${limitKB}KB에 근접)`);
  }
});

if (warnings.length) {
  console.warn(`\n[image-size] 경고 — 최적화 권장:\n${warnings.join("\n")}\n`);
}

if (errors.length) {
  console.error(`\n[image-size] 커밋 차단 — 이미지 크기 초과:\n${errors.join("\n")}`);
  console.error("\n  → TinyPNG(https://tinypng.com) 등으로 압축 후 재시도하세요.");
  console.error("  → 부득이하면 git commit --no-verify 로 우회 가능합니다.\n");
  process.exit(1);
}
