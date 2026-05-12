/**
 * 순환 참조를 검사하는 스크립트
 * ============================
 * - 1. 목적: 모듈 간의 순환 참조 방지
 * - 순환 참조는 코드의 유지보수성을 저하시킬 수 있으며, 런타임 오류를 유발할 수 있습니다.
 * - 이 스크립트는 프로젝트의 `src/` 디렉토리를 대상으로 모듈 간의 의존성을 분석하여 순환 참조를 감지합니다.
 * 
 * - 2. 정책: 순환 참조 발견 시 오류
 * - 순환 참조가 발견되면 에러 메시지와 함께 프로세스를 종료합니다.
 * - 에러 메시지에는 순환 참조에 관련된 파일들의 경로가 포함됩니다.
 * 
 * - 3. 실행 시점: Git Pre-commit Hook
 * - Husky와 lint-staged를 통해 커밋 직전에 실행됩니다.
 * - 스타일 교정(Biome) 이후에 검사하여 최종 커밋본의 품질을 보장합니다.
 * 
 * - 4. 검사 대상: 프로젝트의 `src/` 디렉토리
 */
import madge from 'madge';

const res = await madge('src/');
const circular = res.circular();

if (circular.length > 0) {
  console.error('❌ 순환 참조 발견!', circular);
  process.exit(1);
}