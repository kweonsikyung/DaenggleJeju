# Git Hooks (Husky)

pnpm 모노레포에 설정된 Git 훅 목록과 동작 방식입니다.

## `pre-commit`

커밋 직전 스테이징된 파일에 대해 실행합니다.

```sh
pnpm lint-staged
pnpm run dedupe:check
```

| 단계           | 대상                                           | 동작                                              |
| -------------- | ---------------------------------------------- | ------------------------------------------------- |
| `lint-staged`  | `packages/daenggle-ui/src/**/*.{ts,tsx}`       | Biome 자동 수정 → 밀도/아토믹 의존/순환 참조 검사 |
| `lint-staged`  | `apps/web/src/**/*.{ts,tsx}`                   | Biome 자동 수정 → 밀도/아토믹 의존/순환 참조 검사 |
| `lint-staged`  | `apps/web/public/**/*.{png,jpeg,jpg,webp,svg}` | 이미지 파일 크기 검사                             |
| `dedupe:check` | 루트                                           | `pnpm-lock.yaml` 중복 패키지 여부 확인            |

**lint-staged 상세 스크립트**

- `check-density.mjs` — 컴포넌트 밀도(복잡도) 기준 초과 여부 (스테이징된 파일만 검사)
- `check-atomic-deps.mjs` — 아토믹 디자인 의존 방향 위반 (`views → atoms` 역참조 등, 스테이징된 파일만 검사)
- `check-circular.mjs` — 순환 참조 감지 (**항상 프로젝트 전체 스캔**; 순환 의존은 그래프 전체를 봐야 감지 가능하므로 의도된 동작. 파일 수가 늘어나면 커밋 속도에 영향을 줄 수 있음)

## `commit-msg`

커밋 메시지 형식을 검증합니다(Conventional Commits).

```sh
pnpm exec commitlint --edit $1
```

**허용 타입** (`commitlint.config.js`)

| 타입       | 용도                    |
| ---------- | ----------------------- |
| `feat`     | 새 기능                 |
| `fix`      | 버그 수정               |
| `chore`    | 빌드·설정 등 기타       |
| `docs`     | 문서                    |
| `style`    | 포맷팅 (코드 변경 없음) |
| `refactor` | 리팩토링                |
| `test`     | 테스트                  |
| `perf`     | 성능 개선               |
| `revert`   | 되돌리기                |
| `release`  | 릴리즈                  |

메시지 형식: `<type>: <subject>` — 한글 커밋 메시지 허용 (`subject-case` 규칙 비활성화).

## `pre-push`

푸시 직전 타입 체크를 실행합니다.

```sh
pnpm typecheck
```

`apps/web` 전체 TypeScript 타입 오류가 없어야 푸시 가능.

## 훅 건너뛰기 (비상 시)

```sh
# pre-commit / commit-msg 건너뛰기
git commit --no-verify -m "..."

# pre-push 건너뛰기
git push --no-verify
```

`--no-verify`는 긴급 상황에만 사용. 이후 반드시 원인 수정 후 정상 커밋.

## 훅 재설치

```sh
pnpm install   # prepare 스크립트로 husky 자동 초기화
```
