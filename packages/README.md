# packages/

모노레포 공유 패키지 디렉터리.

| 패키지 | 설명 |
| --- | --- |
| [`daenggle-ui`](./daenggle-ui/README.md) | 범용 React 컴포넌트 라이브러리 |
| [`daenggle-hooks`](./daenggle-hooks/) | 범용 React 훅 (`useModal`, `useWebShare`, `useTypingEffect`) |
| [`tsconfig`](./tsconfig/) | 공유 TypeScript 설정 (`base` / `nextjs` / `library`) |

---

## 모노레포 내 개발

내부 패키지는 npm에 배포돼 있어도 로컬 소스를 직접 참조한다. npm 버전을 설치해서 쓰면 코드를 고칠 때마다 배포 → 버전 업 → 재설치 사이클이 필요하기 때문.

`workspace:*`로 선언하면 pnpm이 `node_modules/` 안에 로컬 패키지 폴더로 향하는 심볼릭 링크를 만든다. Node.js는 `node_modules/`만 탐색하므로, 이 링크 덕분에 로컬 패키지도 npm 패키지처럼 이름으로 import할 수 있다.

```json
// apps/web/package.json
{ "dependencies": { "@daengglejeju/hooks": "workspace:*" } }
```

```
node_modules/@daengglejeju/hooks  →  packages/daenggle-hooks/
```

내부 패키지는 모두 `dist/`를 내보낸다. `pnpm install` 시 `postinstall`이 자동으로 빌드함.

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
