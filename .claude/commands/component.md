# 컴포넌트 생성

다음 절차로 컴포넌트를 생성한다: $ARGUMENTS

---

## Step 1 — 위치 결정

아래 기준으로 위치를 결정하고, 결정 이유를 한 줄로 설명한다.

| 조건 | 위치 |
|---|---|
| 다른 프로젝트에서도 쓸 수 있는 범용 UI | `packages/daenggle-ui/src/` |
| 이 앱 전용이지만 여러 페이지에서 재사용 | `apps/web/src/ui/views/` |
| 특정 페이지에서만 사용 | 해당 페이지 폴더 내 `ui/` (예: `app/curation/ui/`) |

`packages/daenggle-ui/src/` 에 넣는다면 계층도 결정한다:

- **atoms**: 단일 역할, 더 이상 쪼갤 수 없는 UI 단위 (Button, Chip, TextField 등)
- **molecules**: atoms 조합, 특정 기능을 가진 복합 컴포넌트 (SearchHeader, FilterSection 등)
- **views**: 페이지 섹션 단위 또는 복잡한 조합 (Skeleton 그룹, 전체 카드 뷰 등)

의존 방향: atoms → molecules → views (역방향 금지)

---

## Step 2 — 파일 생성

### `packages/daenggle-ui/src/` 에 생성하는 경우

`packages/daenggle-ui/src/{layer}/{GroupName}/{ComponentName}/` 폴더 아래:

**`ComponentName.tsx`**
```tsx
"use client";

import * as s from "./ComponentName.css";

export interface ComponentNameProps {
  // props 정의
}

export function ComponentName({ ... }: ComponentNameProps) {
  return (
    <div className={s.root}>
      {/* JSX */}
    </div>
  );
}
```

**`ComponentName.css.ts`**
```ts
import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  // 스타일
});
```

생성 후 `packages/daenggle-ui/src/index.ts` 에 named export 추가:
```ts
export { ComponentName } from "./{layer}/{GroupName}/{ComponentName}/{ComponentName}";
```

### `apps/web/src/ui/views/` 또는 `_components/` 에 생성하는 경우

동일한 파일 구조로 생성하되, `index.ts` export는 해당 폴더 기준으로 추가한다.

---

## Step 3 — 체크리스트

- [ ] props가 5개 초과 → `interface ComponentNameProps` 분리 완료
- [ ] 인터랙션 있음 → `"use client"` 추가 완료
- [ ] 인터랙션 없음 → `"use client"` 없이 서버 컴포넌트로 생성
- [ ] vanilla-extract 스타일 파일 생성 완료
- [ ] `index.ts` export 추가 완료
- [ ] `any` 타입 없음
