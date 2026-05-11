<div align="center">

<img src="public/assets/logo/logo-colored.png" width="200">
    <h3>Daenggle Jeju: Pet-Friendly Vibes & Vids</h3>
    <hr />
  <p style="margin-bottom: 5px;">
     <img src="https://img.shields.io/badge/pnpm-10.14.0-F69220?style=flat&logo=pnpm&logoColor=white" alt="pnpm" />
     <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Next.js-15.4.6-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/SWR-2.3.5-000000?style=flat&logo=swr&logoColor=white" alt="SWR" />
        <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
  
  <p style="margin-bottom: 5px;">
    <img src="https://img.shields.io/badge/Vanilla--Extract-1.17.4-555555?style=flat&logo=vanilla-extract&logoColor=white" alt="Vanilla-Extract" />
    <img src="https://img.shields.io/badge/Jest-30.1.1-C21325?style=flat&logo=jest&logoColor=white" alt="Jest" />
    <img src="https://img.shields.io/badge/Storybook-9.1.1-FF4785?style=flat&logo=storybook&logoColor=white" alt="Storybook" />
  </p>
</div>

---

## 프로젝트 구조

```
daengglejeju-client/
├── apps/
│   └── web/          # Next.js 웹앱
└── packages/
    └── daenggle-ui/  # 공용 UI 컴포넌트 라이브러리 (npm 배포)
```

---

## 시작하기

```bash
pnpm install
pnpm dev        # 웹앱 개발 서버 실행 (localhost:3000)
```

---

## 웹앱 (`apps/web`)

| 명령어 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 프로덕션 서버 실행 |
| `pnpm lint` | lint 검사 |
| `pnpm lint:fix` | lint 자동 수정 |
| `pnpm typecheck` | 타입 검사 |
| `pnpm storybook` | Storybook 실행 (localhost:6006) |
| `pnpm build-storybook` | Storybook 정적 빌드 |
| `pnpm release:web` | 웹앱 릴리즈 (버전 bump + git 태그) |

### 웹앱 릴리즈 절차

```bash
# 1. CHANGELOG.md 업데이트
# 2. 릴리즈 스크립트 실행
pnpm release:web
# → 버전 타입 선택 (patch / minor / major)
# → lint → typecheck → build 자동 검증
# → git 커밋 + web@x.x.x 태그 생성 및 push
```

---

## UI 패키지 (`packages/daenggle-ui`)

| 명령어 | 설명 |
|---|---|
| `pnpm build:ui` | UI 패키지 빌드 |
| `pnpm check:ui` | 패키지 유효성 검사 (publint) |
| `pnpm size:ui` | 번들 사이즈 확인 |
| `pnpm release:ui` | npm 배포 (버전 bump + npm publish + git 태그) |

### UI 패키지 릴리즈 절차

```bash
# 1. packages/daenggle-ui/CHANGELOG.md 업데이트
# 2. 릴리즈 스크립트 실행
pnpm release:ui
# → 버전 타입 선택 (patch / minor / major)
# → publint 유효성 검사 → build 자동 검증
# → npm publish
# → git 커밋 + daenggle-ui@x.x.x 태그 생성 및 push
```

### UI 패키지 로컬 개발

웹앱에서 `daenggle-ui`는 `workspace:*`로 연결되어 있습니다.  
수정 후 빌드하면 웹앱에 즉시 반영됩니다.

```bash
pnpm build:ui   # 수정 후 빌드
pnpm dev        # 웹앱에서 확인
```

---

## Storybook / Chromatic

```bash
pnpm storybook          # 로컬 Storybook 실행
pnpm chromatic          # Chromatic 배포 (시각적 회귀 테스트)
```

---

## Git 자동화 (Husky)

Husky는 git 이벤트 시 스크립트를 자동 실행해주는 도구입니다.  
**별도 명령어 없이** 평소대로 `git commit`, `git push`하면 자동으로 동작합니다.

### 자동 실행 흐름

```
git commit
    │
    ├─ [pre-commit] lint-staged 실행
    │       └─ 스테이징된 apps/web/**/*.{ts,tsx} 파일에 lint:fix 자동 적용
    │               → lint 오류가 있으면 커밋 차단, 자동 수정 후 재시도 필요
    │
    └─ [commit-msg] commitlint 실행
            └─ 커밋 메시지 형식 검증
                    → 형식이 맞지 않으면 커밋 차단

git push
    │
    └─ [pre-push] typecheck 실행
            └─ TypeScript 타입 검사
                    → 타입 에러가 있으면 push 차단
```

### 각 훅 설명

| 훅 | 시점 | 실행 내용 | 실패 시 |
|---|---|---|---|
| `pre-commit` | `git commit` 직전 | 스테이징된 ts/tsx 파일 lint:fix | 커밋 차단 |
| `commit-msg` | 커밋 메시지 입력 후 | 메시지 형식 검증 (commitlint) | 커밋 차단 |
| `pre-push` | `git push` 직전 | 전체 타입 검사 (tsc) | push 차단 |

### 커밋 메시지 형식

```
type: 메시지
```

| type | 용도 |
|---|---|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `chore` | 빌드/설정/패키지 등 기타 작업 |
| `docs` | 문서 수정 |
| `style` | 포맷팅 (코드 동작 변경 없음) |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `test` | 테스트 추가/수정 |
| `perf` | 성능 개선 |
| `revert` | 이전 커밋 되돌리기 |
| `release` | 버전 릴리즈 |

```bash
git commit -m "feat: 메인 배너 컴포넌트 추가"    # ✅ 통과
git commit -m "fix: 로그인 버튼 클릭 이벤트 수정" # ✅ 통과
git commit -m "메인 배너 추가"                   # ❌ 차단 — type 없음
git commit -m "update: 버튼 수정"               # ❌ 차단 — 허용되지 않는 type
```

### 훅을 우회해야 할 때

긴급 상황에서 훅을 건너뛰어야 할 경우 (`--no-verify`는 가급적 사용하지 않도록 합니다):

```bash
git commit --no-verify -m "hotfix: 긴급 수정"  # 모든 pre-commit, commit-msg 훅 건너뜀
git push --no-verify                           # pre-push 훅 건너뜀
```

---

## 직접 실행이 필요한 스크립트

Husky가 자동화하지 않는 나머지 작업은 필요할 때 직접 실행합니다.

| 명령어 | 언제 실행하나 |
|---|---|
| `pnpm dev` | 개발 시작할 때 |
| `pnpm build` | 프로덕션 빌드 확인할 때 |
| `pnpm lint` | lint 오류만 확인할 때 (수정 없음) |
| `pnpm lint:fix` | lint 오류 수동 수정할 때 |
| `pnpm typecheck` | 타입 에러 미리 확인할 때 (push 전 수동 확인 시) |
| `pnpm build:ui` | UI 패키지 수정 후 웹앱에 반영할 때 |
| `pnpm check:ui` | UI 패키지 npm 배포 전 유효성 검사 |
| `pnpm release:web` | 웹앱 버전 올리고 git 태그 찍을 때 |
| `pnpm release:ui` | UI 패키지 npm 배포할 때 |
| `pnpm storybook` | 컴포넌트 UI 확인할 때 |
| `pnpm chromatic` | 시각적 회귀 테스트 배포할 때 |
