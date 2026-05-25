---
title: Tech Writing Style
impact: MEDIUM
impactDescription: 일관된 문체와 구조로 글의 신뢰도와 가독성 향상
tags: writing, wiki, docs
---

## Tech Writing Style

**Impact: MEDIUM (일관된 문체·구조로 독자 신뢰도와 가독성 향상)**

기술 글은 문체와 구조가 일관돼야 읽는 사람이 내용에 집중할 수 있어요. 합니다체보다 해요체가 부드럽고 친근하며, 트러블슈팅은 반드시 문제 → 원인 → 해결 순서로 서술해야 독자가 자신의 상황과 대조하기 쉬워요.

**Incorrect (합니다체 — 딱딱하고 보고서 느낌):**

```markdown
이 오류는 tsup이 jsx를 변환할 때 발생합니다.
원인은 esbuild의 기본 JSX 변환 방식이 classic이기 때문입니다.
해결하려면 esbuildOptions에서 jsx를 automatic으로 설정해야 합니다.
```

**Correct (해요체 — 친근하고 기술 블로그 느낌):**

```markdown
이 오류는 tsup이 jsx를 변환할 때 생겨요.
esbuild 기본 JSX 변환이 classic이라 `import React`가 없는 파일에서 터지는 거예요.
`esbuildOptions`에서 `jsx: "automatic"`으로 바꾸면 해결돼요.
```

---

## 트러블슈팅 구조 규칙

하나의 문제는 하나의 섹션. 여러 문제를 한 섹션에 묶지 않아요.

**Incorrect (여러 문제를 한 번에 나열):**

```markdown
## 발생한 문제들
- 빌드 실패, 타입 오류, 런타임 에러가 발생했다.
- 원인은 각각 A, B, C다.
- 해결책은 X, Y, Z다.
```

**Correct (문제 하나 → 원인 → 해결, 반복):**

```markdown
## 문제 1. 빌드 실패
**왜 생겼나요?** esbuild가 classic JSX를 기대하는데 소스에 `import React`가 없어요.
**어떻게 해결했나요?** `jsx: "automatic"` 옵션을 추가했어요.

## 문제 2. 타입 오류
...
```

---

## 코드·표 규칙

- 인라인 코드는 `` ` `` 으로 감싸요: `tsup.config.ts`, `"use client"`
- 코드 블록은 언어 명시: ` ```ts `, ` ```json `, ` ```bash `
- 표는 3열 이하로 유지해요 — 열이 많으면 읽기 어려워요
