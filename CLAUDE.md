# DaenggleJeju Client

**GitHub 레포: `kweonsikyung/DaenggleJeju`** — `gh` 명령 시 항상 이 레포 사용

pnpm 모노레포 — `packages/daenggle-ui` (컴포넌트 라이브러리) + `apps/web` (Next.js 15 App Router)

## 기술 스택

- **Framework**: Next.js 15 App Router
- **Styling**: vanilla-extract (빌드타임 컴파일, `.css.ts` 파일)
- **Data fetching**: SWR (클라이언트), async Server Components (서버)
- **Package manager**: pnpm workspaces
- **Linter/Formatter**: Biome

## 디렉터리 구조

```
packages/
  daenggle-ui/src/
    atoms/        # 단일 역할 UI 단위
    molecules/    # atoms 조합, 특정 기능 보유
    views/        # 페이지 섹션급 복합 뷰
    styles/       # 전역 색상·타이포 토큰
    index.ts      # named export만, export default 금지

apps/web/src/
  app/{page}/
    page.tsx      # 라우트 진입점 — UI만, 로직은 훅으로
    loading.tsx   # 반드시 작성 — 빈 화면 금지
    style.css.ts  # 페이지 전용 vanilla-extract 스타일
    ui/           # 페이지 전용 컴포넌트
  ui/             # 앱 전용 공유 UI (atoms / molecules / views)
  components/     # Provider·Portal·Context 래퍼
  api/            # API 호출 함수 (도메인별 파일)
  hooks/          # SWR 데이터 훅(api/) + 범용 훅
  stores/         # 전역 클라이언트 상태 (Zustand)
  constants/      # 전역 상수
  types/          # 도메인 타입 (camelCase 파일명)
  utils/          # 순수 유틸 함수 (camelCase 파일명)
  lib/            # 외부 라이브러리 설정 — 배럴 export 금지
  styles/         # 앱 레벨 vanilla-extract 토큰
```

## 코드 규칙

@.claude/commands/refactor.md

## React / Next.js Best Practice

@.claude/rules/async-api-routes.md

@.claude/rules/async-suspense-boundaries.md

@.claude/rules/client-swr-dedup.md

## Git

Gitflow — 이슈 생성 → feature/fix 브랜치 → PR → 유저가 직접 머지 (`gh pr merge` 금지)

## 이슈 · PR 작성 규칙

- **존댓말** 사용 (합니다/됩니다/했습니다)
- 이슈: `.github/ISSUE_TEMPLATE/` 형식 그대로 준수
- PR: `.github/PULL_REQUEST_TEMPLATE.md` 형식 그대로 준수 (Summary / Related Issues / Changes / Impact 섹션)

## 위키 작성

위키·기술 블로그 작성 시 아래 규칙 적용. README·코드 주석에는 적용하지 않음.

@.claude/rules/tech-writing-style.md
