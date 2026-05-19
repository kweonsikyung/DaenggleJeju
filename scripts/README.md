# Scripts

프로젝트 품질 자동화 스크립트 모음입니다.  
모든 스크립트는 프로젝트 **루트**에서 실행하는 것을 기준으로 작성되었습니다.

---

## 실행 흐름

```
git commit
  └─ pre-commit (Husky)
       └─ lint-staged
            ├─ biome check --write --unsafe       # 스타일 자동 교정
            ├─ check-density.mjs                  # 코드 가독성 검사
            ├─ check-atomic-deps.mjs              # Atomic Design 의존성 검사
            ├─ check-circular.mjs                 # 순환 참조 검사
            └─ check-image-size.mjs               # 이미지 크기 검사

git push
  └─ pre-push (Husky)
       └─ typecheck                               # TypeScript 타입 검사

pnpm release:ui   # UI 라이브러리 릴리즈
  ├─ 버전 타입 선택 (patch / minor / major)
  ├─ package.json 버전 자동 증가
  ├─ CHANGELOG.md 업데이트 확인 (수동)
  ├─ exports를 dist로 전환
  ├─ pnpm build
  ├─ pnpm check:ui  (publint 패키지 유효성 검사)
  ├─ 로컬 확인 (수동)
  ├─ npm publish
  ├─ exports를 src로 복원 (모노레포용)
  └─ git commit + tag + push → develop

pnpm release:web  # 웹 앱 릴리즈
  ├─ 버전 타입 선택 (patch / minor / major)
  ├─ package.json 버전 자동 증가
  ├─ CHANGELOG.md 업데이트 확인 (수동)
  ├─ pnpm lint
  ├─ pnpm typecheck
  ├─ pnpm build
  └─ git commit + tag + push → develop
```

> `track-bundle.mjs`와 `optimize-images.mjs`는 자동 실행되지 않습니다.  
> `pnpm size` / `pnpm optimize:images` 로 수동 실행하세요.

---

## 스크립트 목록

### check-density.mjs

**목적** 5줄 이상 연속 코드 블록 금지 — "Wall of Code" 방지  
**트리거** pre-commit (lint-staged) — `src/**/*.{ts,tsx}`  
**판단 기준** 주석·빈 줄·import는 카운트 제외, 순수 실행 코드만 카운팅

```bash
node scripts/check-density.mjs apps/web/src/app/page.tsx
```

---

### check-atomic-deps.mjs

**목적** Atomic Design 의존 방향 강제 — `atoms → molecules → views` (역방향 금지)  
**트리거** pre-commit (lint-staged) — `src/**/*.{ts,tsx}`  
**계층 순서** atoms(0) → molecules(1) → organisms(2) → views(3) → pages(4)

위반 예시:
```ts
// atoms/Button.tsx 에서 molecules를 import하면 차단
import { SearchHeader } from "../molecules/SearchHeader"; // ✖
```

```bash
node scripts/check-atomic-deps.mjs apps/web/src/ui/atoms/Button.tsx
```

---

### check-circular.mjs

**목적** 모듈 간 순환 참조 감지  
**트리거** pre-commit (lint-staged) — `src/**/*.{ts,tsx}`  
**검사 대상** `apps/web/src/`, `packages/daenggle-ui/src/`  
**도구** [madge](https://github.com/pahen/madge)

```bash
node scripts/check-circular.mjs
```

---

### check-image-size.mjs

**목적** 대용량 이미지 커밋 차단  
**트리거** pre-commit (lint-staged) — `apps/web/public/**/*.{png,jpeg,jpg,webp,svg}`

| 포맷 | 경고 (커밋 통과) | 차단 |
|---|---|---|
| SVG | 70KB 초과 | 100KB 초과 |
| PNG / JPG / WebP | 700KB 초과 | 1MB 초과 |

차단 시 출력 예시:
```
[image-size] 커밋 차단 — 이미지 크기 초과:
  ✖ apps/web/public/assets/photo.png (1200.0KB > 한도 1000KB)

  → TinyPNG(https://tinypng.com) 등으로 압축 후 재시도하세요.
  → 부득이하면 git commit --no-verify 로 우회 가능합니다.
```

```bash
node scripts/check-image-size.mjs apps/web/public/assets/photo.png
```

---

### optimize-images.mjs

**목적** PNG/JPG 이미지 일괄 압축 (sharp 사용)  
**트리거** 수동 실행 전용  
**대상** `apps/web/public/` 내 PNG/JPG (100KB 미만은 건너뜀)  
**설정** PNG: `compressionLevel: 9`, JPG: `quality: 85 (mozjpeg)`

```bash
pnpm optimize:images          # 전체 압축 실행
pnpm optimize:images:dry      # 변경 없이 예상 결과만 확인
```

> 새 이미지를 추가할 때 커밋 전에 한 번 실행하는 것을 권장합니다.

---

### track-bundle.mjs

**목적** 빌드 번들 사이즈를 `.bundle/bundle-history.json`에 기록 (최근 30건 유지)  
**트리거** 수동 실행 전용 (`pnpm size`의 마지막 단계)  
**전제 조건** `pnpm build`로 `.next/static/chunks`가 생성되어 있어야 함

기록 항목:

| 필드 | 내용 |
|---|---|
| `date` | ISO 8601 타임스탬프 |
| `diskSize` | 청크 디렉터리 물리적 크기 (`du -sh`) |
| `transferSize` | gzip 전송 크기 (size-limit 측정) |
| `commit` | 최신 커밋 메시지 |

```bash
pnpm build && pnpm size   # 빌드 후 사이즈 체크 + 기록
```

> 빌드 없이 실행하면 `diskSize`가 부정확하게 기록됩니다.

---

### release-ui.sh / release-web.sh

**목적** UI 라이브러리 및 웹 앱 배포  
**트리거** 수동 실행 전용

```bash
pnpm release:ui   # packages/daenggle-ui 배포
pnpm release:web  # apps/web 배포
```

**release-ui.sh — exports 전환 이유**

`daenggle-ui`는 npm 패키지이면서 동시에 모노레포 내부 패키지이기 때문에 배포 전후로 `package.json`의 exports 설정이 바뀝니다.

| 상태 | exports 대상 | 이유 |
|---|---|---|
| 평소 (모노레포) | `./src/index.ts` | `apps/web`이 TypeScript 소스를 직접 참조 → `pnpm build:ui` 없이 수정 즉시 반영 |
| npm 배포 직전 | `./dist/index.mjs` | 외부 설치자는 컴파일된 파일이 필요 |

배포가 끝나면 자동으로 `src/`로 복원됩니다. 복원이 안 된 채로 두면 `daenggle-ui` 소스를 수정할 때마다 `pnpm build:ui`를 수동으로 실행해야 `apps/web`에 반영됩니다.

---

## 상태 요약

| 스크립트 | 자동 실행 | 에러 시 메시지 | 상태 |
|---|---|---|---|
| check-density.mjs | pre-commit | 파일:줄번호 출력 | 정상 |
| check-atomic-deps.mjs | pre-commit | 파일:줄번호 출력 | 정상 |
| check-circular.mjs | pre-commit | 순환 경로 출력 | 정상 |
| check-image-size.mjs | pre-commit | 파일명+크기 출력 | 정상 |
| optimize-images.mjs | 수동 | — | 정상 |
| track-bundle.mjs | 수동 | — | 빌드 필요 |
| release-ui.sh | 수동 | — | 정상 |
| release-web.sh | 수동 | — | 정상 |
