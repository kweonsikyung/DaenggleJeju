# 002 — 모노레포 공유 패키지 분리 (tsconfig + hooks)

## 무엇을 했나

pnpm 워크스페이스 안에서 앱 전반에서 중복 사용되던 설정과 코드를 독립 패키지로 추출했다.

- `packages/tsconfig` — TypeScript 설정 공유 패키지
- `packages/daenggle-hooks` — 범용 커스텀 훅 패키지

---

## 왜 이걸 분리하는가

모노레포에서 패키지가 늘어날수록 같은 tsconfig 옵션을 각 패키지가 중복 관리하게 된다. `"strict": true`, `"moduleResolution": "bundler"` 같은 기반 설정이 패키지마다 다르면 타입 오류가 패키지 경계에서 발생한다. 마찬가지로 `useModal`, `useWebShare` 같은 범용 훅은 앱 코드에 묻혀 있으면 재사용이 불편하고, 테스트나 버전 관리가 앱 전체 릴리즈에 종속된다.

**독립 패키지로 분리하면:**
- 설정 변경이 한 곳에서 모든 패키지에 전파된다
- 훅 패키지만 단독으로 빌드·테스트·버전 관리할 수 있다
- 나중에 외부 패키지로 배포하기 쉬운 구조가 된다

---

## 핵심 배운 것들

### 1. `packages/tsconfig` — 설정 전용 패키지는 빌드가 필요 없다

```json
// packages/tsconfig/package.json
{
  "name": "@daengglejeju/tsconfig",
  "private": true,
  "files": ["base.json", "nextjs.json", "library.json"]
}
```

tsconfig 전용 패키지는 `main`, `exports` 필드가 필요 없다. `files`에 JSON 파일만 나열하면 충분하다. 소비 측에서는 파일 경로를 직접 참조한다:

```json
// apps/web/tsconfig.json
{ "extends": "@daengglejeju/tsconfig/nextjs.json" }
```

### 2. 계층 구조: base → nextjs / library

```
base.json          ← 모든 패키지 공통 (target, strict, moduleResolution 등)
├── nextjs.json    ← Next.js 앱용 (noEmit, incremental, next 플러그인)
└── library.json   ← UI/훅 패키지용 (incremental: false, dist/stories 제외)
```

`library.json`에서 `incremental: false`를 명시하는 이유: 라이브러리는 tsup이 빌드를 담당하므로 tsc의 증분 빌드 캐시가 불필요하고 오히려 오래된 캐시가 문제를 일으킬 수 있다.

### 3. `packages/daenggle-hooks` — ESM + CJS 이중 빌드

```ts
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,               // .d.ts + .d.mts 자동 생성
  esbuildOptions(options) {
    options.jsx = "automatic"; // React import 자동 주입
  },
});
```

daenggle-ui 빌드 파이프라인(lessons/001)과 동일한 패턴이다. 차이점은 훅 패키지는 `"use client"` 배너가 필요 없다 — 훅은 브라우저/서버 구분 없이 순수 JS 함수다.

### 4. pnpm workspace 참조: `workspace:*`

```json
// apps/web/package.json
{
  "dependencies": {
    "@daengglejeju/hooks": "workspace:*",
    "@daengglejeju/tsconfig": "workspace:*"
  }
}
```

`workspace:*`는 pnpm이 로컬 패키지를 심볼릭 링크로 연결한다. 버전을 고정하지 않고 항상 최신 로컬 소스를 참조한다.

### 5. postinstall로 빌드 자동화

```json
// root package.json
{
  "scripts": {
    "postinstall": "pnpm build:hooks && pnpm build:ui"
  }
}
```

`pnpm install` 직후 자동으로 내부 패키지를 빌드한다. CI와 신규 개발자 세팅에서 "빌드를 안 해서 import가 안 된다"는 문제를 예방한다.

**주의:** `pnpm add <외부패키지>` 시에도 postinstall이 실행된다. 새 내부 패키지를 추가하는 도중에 postinstall이 돌면 아직 설치 안 된 패키지를 참조해 실패할 수 있다. 이때는 `pnpm install --ignore-scripts`로 설치 후 수동으로 빌드하면 된다.

### 6. tsconfig 패키지 추가 시 chicken-and-egg 문제

`pnpm add @daengglejeju/tsconfig --filter web`으로 추가할 때 postinstall이 `pnpm build:ui`를 실행하는데, `daenggle-ui/tsconfig.json`이 이미 `@daengglejeju/tsconfig`를 상속하도록 바뀐 상태라면 tsconfig 패키지가 설치되기 전에 빌드가 실패한다.

**해결:** `pnpm install --ignore-scripts` → 수동 빌드 → 이후부터는 postinstall이 정상 동작.

---

## 체크리스트

- [ ] 각 패키지 `package.json`에 `name` 필드가 정확히 설정됐는가
- [ ] `pnpm-workspace.yaml`에 `packages/` 경로가 포함됐는가
- [ ] 소비 측 `package.json`에 `workspace:*` 의존성이 추가됐는가
- [ ] `pnpm install` 후 내부 패키지 `dist/`가 생성되는가
- [ ] `tsc --noEmit` (typecheck)가 통과하는가
