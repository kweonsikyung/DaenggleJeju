/**
 * Atomic Design 의존성 체크 스크립트
 * ============================
 * - 1. 목적: Atomic Design 원칙 준수
 * - 계층 순서: Atom(0) < Molecule(1) < Organism(2) < View(3) < Page(4)
 * - 상위 계층은 하위 계층을 포함할 수 있으나, 그 역순은 절대 금지합니다.
 * - 이 규칙을 통해 컴포넌트 간의 결합도를 낮추고 재사용성을 극대화합니다.
 *
 * - 2. 정책: 의존성 규칙 위반 시 오류
 * - 위반이 발견되면 파일명과 라인 번호를 포함한 오류 메시지가 출력됩니다.
 * - 모든 위반 사항이 출력된 후, 스크립트가 실패 상태로 종료됩니다.
 *
 * - 3. 실행 시점: Git Pre-commit Hook
 * - Husky와 lint-staged를 통해 커밋 직전에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 검사하여 최종 커밋본의 품질을 보장합니다.
 */

import fs from "fs";

const ATOMIC_ORDER = ["atoms", "molecules", "organisms", "views", "pages"];
const files = process.argv.slice(2);
let hasError = false;

files.forEach((file) => {
  if (!fs.existsSync(file)) return;

  // 1. 현재 파일의 계층 확인
  const currentLevelIndex = ATOMIC_ORDER.findIndex((level) =>
    file.toLowerCase().includes(`/${level}/`)
  );

  // 아토믹 구조에 포함되지 않는 파일(예: utils, hooks 등)은 검사 제외
  if (currentLevelIndex === -1) return;

  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // 주석 제외
    if (line.trim().startsWith("//") || line.trim().startsWith("/*")) return;

    if (line.includes("import") && (line.includes("from") || line.includes("import("))) {
      // 2. 임포트 경로에서 상위 계층이 포함되어 있는지 확인
      ATOMIC_ORDER.forEach((level, levelIndex) => {
        // 현재 내 단계보다 높은 단계의 키워드가 임포트 경로에 포함되어 있다면 에러
        if (levelIndex > currentLevelIndex) {
          const forbiddenPath = `/${level}`;

          if (line.includes(forbiddenPath)) {
            hasError = true;
          }
        }
      });
    }
  });
});

if (hasError) process.exit(1);
