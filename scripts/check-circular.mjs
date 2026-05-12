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
 * - 4. 검사 대상: `apps/web/src/` 및 `packages/daenggle-ui/src/`
 * - 프로젝트의 주요 소스 코드가 위치한 디렉토리를 대상으로 검사합니다.
 * - 다른 디렉토리는 검사 대상에서 제외하여 검사 시간을 최적화합니다.
 * 
 * - 5. 도구: madge 라이브러리 사용
 * - madge는 JavaScript 및 TypeScript 프로젝트에서 모듈 의존성을 분석하는 데 널리 사용되는 도구입니다.
 */
import madge from 'madge';
import path from 'path';

// 1. 검사할 대상 정의 
const targets = [
  'apps/web/src',
  'packages/daenggle-ui/src'
];

async function checkCircular() {
  console.log('🔍 순환 참조 검사 시작...');
  let totalCircular = 0;

  for (const target of targets) {
    const targetPath = path.resolve(process.cwd(), target);
    
    // 폴더가 실제로 존재하는지 확인 후 실행
    console.log(`\n📂 대상: ${target}`);
    
    const res = await madge(targetPath, {
      fileExtensions: ['ts', 'tsx', 'js', 'jsx'],
      // Next.js나 TS Alias 설정을 쓰고 있다면 필요할 수 있음
    });

    const circular = res.circular();
    
    if (circular.length > 0) {
      console.log(`❌ ${target}에서 ${circular.length}개의 순환 참조 발견`);
      console.log(circular);
      totalCircular += circular.length;
    } else {
      console.log(`✅ ${target}: 이상 없음`);
    }
  }

  if (totalCircular > 0) {
    process.exit(1);
  }
}

checkCircular();