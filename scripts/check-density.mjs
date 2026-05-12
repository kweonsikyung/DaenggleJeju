/**
 * 코드 가독성 체크 스크립트
 * ============================
 * * 1. 목적: "Wall of Code" 방지
 * - 로직이 빈 줄 없이 빽빽하게 나열되면 코드 가독성이 급격히 떨어집니다.
 * - 본 스크립트는 5줄 이상의 연속된 코드 블록에 빈 줄 삽입을 강제하여 '숨 쉴 구멍'을 만듭니다.
 * - 빽빽한 코드 대신, 적절한 간격으로 로직을 분리하여 시각적으로 읽기 쉬운 코드를 만들고자 합니다.
 *
 * * 2. 정책: 순수 코드 카운팅
 * - 단순 라인 수가 아닌, '실제 실행 코드'를 기준으로 5줄 제한을 둡니다.
 * - 주석과 빈 줄은 카운트에서 제외하여, 개발자가 로직 단위로 코드를 분리하도록 유도합니다.
 *
 * * 3. 실행 시점: Git Pre-commit Hook
 * - Husky와 lint-staged를 통해 커밋 직전에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 검사하여 최종 커밋본의 가독성을 보장합니다.
 */

import fs from "fs";

const MAX_LINES = 5;
const files = process.argv.slice(2);
let hasError = false;

files.forEach((file) => {
  if (!fs.existsSync(file)) return;

  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  let consecutiveCodeCount = 0;
  let inMultiLineComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. 빈 줄 체크 -> 카운트 초기화
    if (line === "") {
      consecutiveCodeCount = 0;
      continue;
    }

    // 2. 멀티라인 주석 시작 체크 (/*)
    if (!inMultiLineComment && line.startsWith("/*")) {
      inMultiLineComment = true;
      // 한 줄짜리 멀티라인 주석 처리 (/* ... */)
      if (line.endsWith("*/") && line.length > 2) {
        inMultiLineComment = false;
      }
      continue;
    }

    // 3. 멀티라인 주석 종료 체크 (*/)
    if (inMultiLineComment) {
      if (line.includes("*/")) {
        inMultiLineComment = false;
      }
      continue;
    }

    // 4. 싱글라인 주석 체크 (//)
    if (line.startsWith("//")) {
      continue;
    }

    // 5. 여기까지 왔으면 "순수 코드"
    consecutiveCodeCount++;

    if (consecutiveCodeCount >= MAX_LINES) {
      hasError = true;
      break;
    }
  }
});

if (hasError) process.exit(1);
