# DaenggleJeju Client

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
    atoms/        # 단일 역할 UI 단위 (Button, Chip, TextField …)
    molecules/    # atoms 조합, 특정 기능 보유 (SearchHeader, FilterSection …)
    views/        # 페이지 섹션급 복합 뷰 (Skeleton 그룹 등)
    styles/       # 전역 색상·타이포 토큰 (COLORS, TYPO)
    index.ts      # named export만, export default 금지

apps/web/src/
  app/            # Next.js App Router 라우트
    {page}/
      page.tsx        # 라우트 진입점 — UI만, 로직은 훅으로
      layout.tsx      # (필요 시)
      loading.tsx     # 반드시 작성 — 빈 화면 금지
      style.css.ts    # 해당 페이지 전용 vanilla-extract 스타일
      _util.ts        # 해당 페이지 전용 상수·유틸 (라우팅 대상 아님)
      ui/             # 해당 페이지 전용 컴포넌트 (다른 페이지에서 안 씀)
  ui/                 # 앱 전용 공유 UI (여러 페이지에서 재사용, daenggle-ui엔 안 어울림)
    atoms/            # 단일 역할 UI 단위 (Button, Chip, TextField …)
    molecules/        # atoms 조합, 특정 기능 보유 (SearchHeader, FilterSection …)
    views/            # 페이지 섹션급 복합 뷰 (Skeleton 그룹 등)
  components/         # Provider·Portal·Context 등 UI가 아닌 래퍼 패턴
    providers/        # (예: SWRProvider)
  api/                # API 호출 함수 (도메인별 파일)
  hooks/    
    api/              # SWR 기반 데이터 훅 (useAuth, usePlaces …)
    *.ts              # 그 외 범용 훅 (useKakaoMap, useModal …)
  stores/             # 전역 클라이언트 상태 (Zustand)
  constants/          # 전역 상수 (navData, routes 등)
  types/              # 도메인 타입 정의 (camelCase 파일명)
  utils/              # 순수 유틸 함수 (camelCase 파일명)
  lib/                # 외부 라이브러리 설정 (swr fetcher 등) — 배럴 export 금지
  styles/             # 앱 레벨 vanilla-extract 토큰 (colors, typography)
```

### 컴포넌트 위치 판단 기준

| 조건 | 위치 |
|---|---|
| 다른 프로젝트에서도 쓸 수 있는 범용 UI | `packages/daenggle-ui/src/` |
| 이 앱 전용이지만 여러 페이지에서 재사용 | `apps/web/src/ui/` |
| 특정 페이지에서만 사용 | `app/{page}/ui/` |

의존 방향: `atoms → molecules → views` (역방향 금지)

## 핵심 규칙

코드 작성·수정·리뷰 시 아래 규칙을 항상 적용한다.

@.claude/commands/refactor.md

## React / Next.js Best Practice

@.claude/rules/async-api-routes.md

@.claude/rules/async-suspense-boundaries.md

@.claude/rules/client-swr-dedup.md
