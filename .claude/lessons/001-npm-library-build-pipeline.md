# 001 — npm 배포 가능한 라이브러리 빌드 파이프라인

**관련 이슈:** #12  
**작업 범위:** `packages/daenggle-ui` tsup 빌드 파이프라인 정상화

---

## 배경

`daenggle-ui`는 모노레포 내에서 `transpilePackages`로 동작하는 설정과 npm 배포를 위한 설정이 혼재된 미완성 상태였다. 세 가지 문제가 있었다.

1. `package.json` exports가 `src/`를 직접 가리킴 → npm publish 시 브로큰
2. `dts: false` → `dist/`에 타입 선언 파일 없음
3. `banner: '"use client"'` + per-file entry → 46개 파일에서 `"use client"` 중복

---

## 발견한 것들

### 1. `transpilePackages` vs 사전 빌드 — 두 전략은 공존할 수 없다

`transpilePackages: ["daenggle-ui"]`가 설정되어 있으면 Next.js가 `src/`를 직접 읽어 트랜스파일한다. 이 경우 `exports`가 `src/`를 가리켜도 모노레포 내에서는 정상 동작한다.

반면 npm 배포 가능한 패키지는 `dist/`를 진입점으로 써야 하고, `transpilePackages`가 불필요해진다. 두 전략을 동시에 쓰면 설정이 충돌한다.

**결론:** 둘 중 하나만 선택해야 한다.
- 모노레포 전용 → `transpilePackages` + `src/` exports, dist 불필요
- npm 배포 목표 → `dist/` exports, `transpilePackages` 제거

### 2. single-file 번들에서 `"use client"` banner는 올바른 패턴이다

per-file entry(`src/**/*.{ts,tsx}`) 방식에서는 각 파일의 소스에 이미 `"use client"`가 있는데 banner가 한 번 더 추가해서 중복이 생겼다.

single entry(`src/index.ts`)로 번들하면 소스의 `"use client"`들은 파일 중간의 문자열이 되어 directive로 인식되지 않는다. 이때 banner로 파일 첫 줄에 `"use client"`를 붙이는 것이 유일하게 올바른 방법이다.

```
// 이전 (per-file, banner 있음) — 잘못됨
"use client"; ← banner
"use client"; ← 소스 원본
import ...

// 이후 (single-file, banner 있음) — 올바름
"use client"; ← banner (유일한 directive)
// 소스의 "use client"들은 중간에 있어 무시됨
```

### 3. `jsx: "preserve"` + esbuild 기본값이 Next.js와 불일치한다

루트 `tsconfig.json`의 `"jsx": "preserve"`는 TypeScript가 JSX를 변환하지 않고 그대로 두라는 설정이다. 이후 esbuild가 JSX를 처리하는데, esbuild 기본값은 classic transform(`React.createElement`)이다.

Next.js는 SWC로 automatic transform(`react/jsx-runtime`)을 사용하기 때문에 `transpilePackages` 환경에서는 문제없었다. 하지만 사전 빌드된 `dist/`를 쓰면 esbuild가 classic으로 변환하고, 소스 파일에 `import React from "react"`가 없으면 런타임에 `React is not defined` 에러가 난다.

**해결:** tsup에서 `esbuildOptions.jsx = "automatic"`으로 명시한다.

```ts
// tsup.config.ts
esbuildOptions(options) {
  options.jsx = "automatic";
},
```

### 4. ESM/CJS 듀얼 패키지의 올바른 exports 구조

`types` 필드를 최상위에 두면 ESM 조건에서 CJS 타입으로 해석되어 타입 ambiguity 경고가 난다. `import`와 `require` 조건 각각에 타입을 명시하고, ESM용은 `.d.mts` 확장자를 써야 한다.

```json
// 잘못됨 — types가 최상위에 있음
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  }
}

// 올바름 — 조건별 타입 분리
"exports": {
  ".": {
    "import": {
      "types": "./dist/index.d.mts",
      "default": "./dist/index.mjs"
    },
    "require": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

tsup은 `dts: true` 시 `.d.ts`와 `.d.mts` 둘 다 생성한다.

### 5. vanilla-extract는 RSC와 호환된다

vanilla-extract는 빌드 타임에 CSS 클래스명을 생성하므로 런타임 브라우저 의존성이 없다. `.css.ts` 파일을 쓴다고 해서 `"use client"`가 필요하지 않다. hooks나 브라우저 API가 없는 컴포넌트(Button, Skeleton 등)는 `"use client"` 없이 RSC로 쓸 수 있다.

---

## 최종 tsup.config.ts

```ts
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],       // 단일 진입점
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,                     // .d.ts + .d.mts 생성
  clean: true,
  bundle: true,
  splitting: true,
  external: ["react", "react-dom", "next", ...],
  tsconfig: "tsconfig.json",
  esbuildPlugins: [vanillaExtractPlugin()],
  esbuildOptions(options) {
    options.jsx = "automatic";   // Next.js와 동일한 JSX transform
  },
  banner: {
    js: '"use client";',         // single-file 번들의 RSC 경계 선언
  },
});
```

---

## 체크리스트 (다음에 라이브러리 빌드 설정할 때)

- [ ] `entry`: glob(`src/**`) 아닌 단일 `src/index.ts`
- [ ] `dts: true` — 타입 선언 필수
- [ ] `esbuildOptions.jsx = "automatic"` — tsconfig `jsx: preserve`와 충돌 방지
- [ ] `banner: { js: '"use client"' }` — RSC 환경에서 쓰는 React 컴포넌트 라이브러리
- [ ] `exports` 조건별 타입 분리 (`.d.mts` for import, `.d.ts` for require)
- [ ] `"sideEffects": false` — 트리쉐이킹 최적화
- [ ] `"type": "commonjs"` — Node.js 모듈 타입 명시
- [ ] `transpilePackages` 제거 — dist 기반 전환 후 불필요
- [ ] `pnpm check:ui` (publint) 경고 0개 확인
