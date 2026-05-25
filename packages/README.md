# packages/

모노레포 공유 패키지 디렉터리.

| 패키지 | 설명 |
| --- | --- |
| [`daenggle-ui`](./daenggle-ui/README.md) | 범용 React 컴포넌트 라이브러리 |
| [`daenggle-hooks`](./daenggle-hooks/) | 범용 React 훅 (`useModal`, `useWebShare`, `useTypingEffect`) |
| [`tsconfig`](./tsconfig/) | 공유 TypeScript 설정 (`base` / `nextjs` / `library`) |

---

## 모노레포 내 개발

내부 패키지는 모두 `dist/`를 통해 참조한다. `pnpm install` 시 `postinstall`이 자동으로 빌드함.

```sh
pnpm install        # 설치 + postinstall → 내부 패키지 자동 빌드
pnpm build:hooks    # @daengglejeju/hooks 단독 빌드
pnpm build:ui       # daenggle-ui 단독 빌드
pnpm storybook      # Storybook 로컬 실행 (port 6006)
pnpm size:ui        # 번들 크기 분석
pnpm check:ui       # publint로 패키지 유효성 검사
```

앱에서의 import:

```ts
import { Button } from "daenggle-ui";
import { useModal } from "@daengglejeju/hooks";
```

tsconfig 상속:

```json
// apps/web/tsconfig.json
{ "extends": "@daengglejeju/tsconfig/nextjs.json" }

// packages/daenggle-ui/tsconfig.json
{ "extends": "@daengglejeju/tsconfig/library.json" }
```

---

## npm 배포 (daenggle-ui)

```sh
pnpm release:ui
```

`scripts/release-ui.sh`가 순서대로 실행:

1. 버전 타입 선택 (patch / minor / major)
2. `package.json` 버전 자동 증가
3. `CHANGELOG.md` 업데이트 확인
4. `pnpm build` + `publint` 유효성 검사
5. `npm publish`
6. git commit + tag (`daenggle-ui@x.x.x`) + push
