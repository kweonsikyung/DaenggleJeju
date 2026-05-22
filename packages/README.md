# packages/

모노레포 공유 패키지 디렉터리.

| 패키지                                   | 설명                                     |
| ---------------------------------------- | ---------------------------------------- |
| [`daenggle-ui`](./daenggle-ui/README.md) | 범용 React 컴포넌트 라이브러리 (v0.0.14) |

---

## 모노레포 내 개발

`apps/web`은 빌드 없이 소스를 직접 참조한다. `package.json`의 `exports`가 `./src/index.ts`를 바라보기 때문에 `pnpm build:ui` 없이 바로 임포트 가능.

```ts
import { Button, EmptyState, Skeleton } from "daenggle-ui";
```

루트에서 실행하는 개발 커맨드:

```sh
pnpm storybook        # Storybook 로컬 실행 (port 6006)
pnpm build:ui         # dist 빌드
pnpm size:ui          # 번들 크기 분석
pnpm check:ui         # publint로 패키지 유효성 검사
```

## npm 배포 (릴리즈)

```sh
pnpm release:ui
```

`scripts/release-ui.sh`가 순서대로 실행:

1. 버전 타입 선택 (patch / minor / major)
2. `package.json` 버전 자동 증가
3. `CHANGELOG.md` 업데이트 확인
4. exports를 `./src` → `./dist`로 전환
5. `pnpm build` + `publint` 유효성 검사
6. `npm publish`
7. exports를 `./dist` → `./src`로 복원
8. git commit + tag (`daenggle-ui@x.x.x`) + push

> exports를 배포 시에만 `dist`로 바꾸고 이후 복원하는 이유: 모노레포 내에서는 빌드 없이 소스를 직접 참조해야 하기 때문.
