## 프로젝트 스크립트 가이드

이 폴더는 프로젝트 유지보수, 품질 검사 및 배포를 위한 자동화 스크립트를 담고 있습니다.

## 스크립트 목록

| 파일명 | 역할 | 실행 방법 |
| :--- | :--- | :--- |
| **`check-circular.mjs`** | 파일 간 순환 참조(Circular Dependency)를 검사합니다. | `node scripts/check-circular.mjs` |
| **`track-bundle.mjs`** | 번들 사이즈(Disk & Transfer)를 측정하고 히스토리를 기록합니다. | `pnpm size` (통합 명령어 권장) |
| **`check-image-size.mjs`** | `public` 내 이미지 파일이 너무 크지 않은지 검사합니다. | `node scripts/check-image-size.mjs` |
| **`check-density.mjs`** | 이미지 자산의 해상도/밀도가 기준에 맞는지 확인합니다. | `node scripts/check-density.mjs` |
| **`check-atomic-deps.mjs`** | 아토믹 컴포넌트 간의 의존성 규칙이 깨지지 않았는지 검사합니다. | `node scripts/check-atomic-deps.mjs` |
| **`release-web.sh`** | 웹 애플리케이션(`apps/web`)의 배포를 실행합니다. | `./scripts/release-web.sh` |
| **`release-ui.sh`** | UI 라이브러리(`packages/daenggle-ui`)의 배포를 실행합니다. | `./scripts/release-ui.sh` |

## 주의 사항
- 모든 스크립트는 프로젝트 **Root** 경로에서 실행하는 것을 기준으로 작성되었습니다.
- `.mjs` 파일은 Node.js 16버전 이상에서 실행 가능합니다.