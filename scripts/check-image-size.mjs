/**
 * 이미지 크기 체크 스크립트
 * ============================
 * - 1. 목적: 고용량 리소스 유입 방지
 * - 500KB가 넘는 이미지는 초기 로딩(LCP) 지표를 빨간색으로 만듭니다.
 * - 압축되지 않은 이미지가 올라오는 것을 방지하기 위한 최소한의 가드입니다.
 *
 * - 2. 정책: 500KB 초과 시 오류
 * - 해상도가 중요한 프로젝트임을 고려하여 일반적인 기준(200KB)보다 넉넉한 1MB를 마지노선으로 잡습니다.
 * - 1MB 초과 시, 해상도를 낮추기보다 TinyPNG 등을 통한 '포맷 최적화'를 우선 권장합니다.
 * - 특정 이미지가 정말 너무 중요해서 1MB를 무조건 넘어야만 한다면, git commit --no-verify 옵션을 통해 예외적으로 허용할 수 있습니다.
 *
 * - 3. 실행 시점: Git Pre-commit Hook
 * - Husky와 lint-staged를 통해 커밋 직전에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 검사하여 최종 커밋본의 품질을 보장합니다.
 */

import fs from "fs";

const MAX_SIZE_KB = 1000;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;
const files = process.argv.slice(2);
let hasError = false;

files.forEach((file) => {
  if (!fs.existsSync(file)) return;

  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;

  if (fileSizeInBytes > MAX_SIZE_BYTES) {
    const _fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);

    hasError = true;
  }
});

if (hasError) {
  process.exit(1);
}
